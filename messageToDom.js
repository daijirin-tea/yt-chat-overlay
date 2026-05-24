function messageToDom(message) {
    let domList = [];
    let includesEmoji = false;
    for (const imagePair of emojiList) {
        if (message.includes(imagePair[0])) {
            includesEmoji = true;
            const emojiIndex = message.indexOf(imagePair[0]);
            const img = new Image();
            img.src = imagePair[1];
            img.classList.add('chat_item_emoji');
            domList.push(...messageToDom(message.substring(0,emojiIndex)),img,...messageToDom(message.substring(emojiIndex + imagePair[0].length)));
            break;
        }
    }
    if (!includesEmoji) {
        domList.push(message);
    }
    return domList;
}