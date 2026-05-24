const VIDEO_ID = new URL(decodeURIComponent(location.href)).searchParams.get('v');
async function getLiveChatId() {
    const url = new URL('https://www.googleapis.com/youtube/v3/videos');
    url.searchParams.set('part','liveStreamingDetails');
    url.searchParams.set('id',VIDEO_ID);
    url.searchParams.set('key',API_KEY);
    const res = await fetch(url.href);
    const data = await res.json();
    return data.items[0].liveStreamingDetails.activeLiveChatId;
}
async function getChatMessages(liveChatId,pageToken = '') {
    const url = new URL('https://www.googleapis.com/youtube/v3/liveChat/messages');
    url.searchParams.set('liveChatId',liveChatId);
    url.searchParams.set('part','snippet,authorDetails');
    url.searchParams.set('key',API_KEY);
    url.searchParams.set('pageToken',pageToken);
    const res = await fetch(url);
    return await res.json();
}
function addChat(chat) {
    console.log(chat);
    chat.items.forEach((item)=>{
        const snippet = item.snippet;
        const author = item.authorDetails;
        let msgData = {
            id: item.id,
            type: snippet.type,
            author: author.displayName,
            profile: author.profileImageUrl,
            isMod: author.isChatModerator,
            isOwner: author.isChatOwner,
            isMember: author.isChatSponsor,
            timestamp: snippet.publishedAt,
            amount: null,
            tier: 0
        };
        let details = snippet.textMessageDetails || snippet.superChatDetails || snippet.memberMilestoneChatDetails;
        if (snippet.type === 'superChatEvent') {
            msgData.amount = snippet.superChatDetails.amountDisplayString;
            msgData.tier = snippet.superChatDetails.tier;
        }
        msgData.message = snippet.displayMessage;
        addChatItem(msgData);
    });
}

function addTestChat() {
    for (let i = 0; i < 10; i ++) {
        addChatItem({
            "id": "",
            "type": "textMessageEvent",
            "author": "@テスト",
            "profile": "",
            "isMod": false,
            "isOwner": false,
            "isMember": false,
            "timestamp": "2026-04-20T10:16:53.457526+00:00",
            "amount": null,
            "tier": 0,
            "message": "TEST" + (i + 1)
        });
    }
}

(async ()=>{
    if (!VIDEO_ID) {
        alert('クエリパラメータのvに動画のIDを設定してください');
        addTestChat();
        return;
    }
    const liveChatId = await getLiveChatId();
    if (!liveChatId) {
        alert('Live Chat IDの取得に失敗しました');
        addTestChat();
        return;
    }
    const firstChat = await getChatMessages(liveChatId);
    addChat(firstChat);
    let lastChat = firstChat;        

    setInterval(async ()=>{
        const chat = await getChatMessages(liveChatId,lastChat.nextPageToken);
        lastChat = chat;
        addChat(chat);
    },10000);
})();