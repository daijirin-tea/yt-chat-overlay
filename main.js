let enable_events = true;
function randint(a,b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}
function displayType0(sources) {
    const displayElement = new Image();
    displayElement.src = sources[randint(0,sources.length - 1)];
    displayElement.onload = ()=>{
        displayElement.onload = ()=>{};
        displayElement.classList.add('effects_type_0');
        displayElement.style.setProperty('--top',window.innerHeight * Math.random() / 2 + (window.innerHeight / 4));
        displayElement.style.setProperty('--left',window.innerWidth * Math.random() / 2 + (window.innerWidth / 4));
        displayElement.style.setProperty('--rotate',Math.random() * 120 - 60);
        effectsDiv.append(displayElement);
        setTimeout(()=>{
            displayElement.remove();
        },1500);
    }
}
function displayType1(sources) {
    const displayElement = new Image();
    displayElement.src = sources[randint(0,sources.length - 1)];
    displayElement.onload = ()=>{
        displayElement.classList.add('effects_type_1');
        let top = -0.1 * window.innerHeight;
        let left = 0.5 * window.innerWidth;
        let rotate = Math.random() * 360;
        let vTop = -10;
        let vLeft = Math.random() * (0.1 * window.innerWidth) - (0.05 * window.innerWidth);
        let vRotate = Math.random() * -10 + 5;
        let bounceCount = 0;
        function applyProperties() {
            displayElement.style.setProperty('--top',top);
            displayElement.style.setProperty('--left',left);
            displayElement.style.setProperty('--rotate',rotate);
        }
        function animate() {
            vTop += 2;
            vTop *= 0.95;
            vLeft *= 0.9;
            vRotate *= 0.9;
            top += vTop;
            left += vLeft;
            rotate += vRotate;
            applyProperties();
            if (top > 1 * window.innerHeight) {
                if (bounceCount > 5) {
                    displayElement.remove();
                } else if (bounceCount === 0) {
                    bounceCount ++;
                    top = 1 * window.innerHeight;
                    vTop *= -1.5;
                    requestAnimationFrame(animate);
                } else {
                    bounceCount ++;
                    top = 1 * window.innerHeight;
                    vTop *= -1;
                    requestAnimationFrame(animate);
                }
            } else {
                requestAnimationFrame(animate);
            }
        }
        applyProperties();
        effectsDiv.append(displayElement);
        animate();
    }
}
function displayType2(sources) {
    const displayElement = new Image();
    displayElement.src = sources[randint(0,sources.length - 1)];
    displayElement.onload = ()=>{
        displayElement.classList.add('effects_type_2');
        effectsDiv.append(displayElement);
        let top = window.innerHeight - displayElement.height / 2;
        let left = 1.2 * window.innerWidth;
        let rotate = Math.random() * 360;
        function applyProperties() {
            displayElement.style.setProperty('--top',top);
            displayElement.style.setProperty('--left',left);
            displayElement.style.setProperty('--rotate',rotate);
        }
        function animate() {
            rotate -= 8;
            left -= 0.01 * window.innerWidth;
            applyProperties();
            if (left < -0.2 * window.innerWidth) {
                displayElement.remove();
            } else {
                requestAnimationFrame(animate);
            }
        }
        applyProperties();
        animate();
    }
}
function displayType3(sources) {
    const displayElement = new Image();
    displayElement.src = sources[randint(0,sources.length - 1)];
    displayElement.onload = ()=>{
        displayElement.onload = ()=>{};
        displayElement.classList.add('effects_type_3');
        displayElement.style.setProperty('--top',window.innerHeight * Math.random() / 2 + (window.innerHeight / 4));
        displayElement.style.setProperty('--left',window.innerWidth * Math.random() / 2 + (window.innerWidth / 4));
        displayElement.style.setProperty('--rotate',0);
        effectsDiv.append(displayElement);
        setTimeout(()=>{
            displayElement.remove();
        },1500);
    }
}
function addChatItem(msgData) {
    const chatItem = document.createElement('div');
    chatItem.classList.add('chat_item');
    chats.append(chatItem);

    const chatItemLeft = document.createElement('div');
    chatItemLeft.classList.add('chat_item_left');
    chatItem.append(chatItemLeft);

    const chatItemLeftIcon = document.createElement('img');
    chatItemLeftIcon.classList.add('chat_item_left_icon');
    chatItemLeftIcon.src = msgData.profile;
    chatItemLeft.append(chatItemLeftIcon);

    const chatItemRight = document.createElement('div');
    chatItemRight.classList.add('chat_item_right');
    chatItem.append(chatItemRight);

    const chatItemRightId = document.createElement('p');
    chatItemRightId.classList.add('chat_item_right_id');
    chatItemRightId.textContent = msgData.author;
    chatItemRight.append(chatItemRightId);

    if (msgData.isMod) {
        chatItemRightId.classList.add('chat_item_right_id_mod');
    }
    if (msgData.isMember) {
        chatItemRightId.classList.add('chat_item_right_id_member');
    }
    if (msgData.isOwner) {
        chatItemRightId.classList.add('chat_item_right_id_owner');
    }

    const chatItemRightContent = document.createElement('p');
    chatItemRightContent.classList.add('chat_item_right_content');
    messageToDom(msgData.message).forEach((e)=>{
        chatItemRightContent.append(e);
    });
    imageDisplayEvents.forEach((imageDisplayEvent)=>{
        let didMatch = false;
        imageDisplayEvent.matches.forEach((match)=>{
            if (typeof match === 'string') {
                if (msgData.message.includes(match)) {
                    didMatch = true;
                }
            } else if (typeof match === 'object' && match instanceof RegExp) {
                if (match.test(msgData.message)) {
                    didMatch = true;
                }
            }
        });
        if (didMatch && enable_events) {
            if (imageDisplayEvent.type === 0) {
                displayType0(imageDisplayEvent.sources);
            } else if (imageDisplayEvent.type === 1) {
                displayType1(imageDisplayEvent.sources);
            } else if (imageDisplayEvent.type === 2) {
                displayType2(imageDisplayEvent.sources);
            } else if (imageDisplayEvent.type === 3) {
                displayType3(imageDisplayEvent.sources);
            }
        }
    });
    chatItemRight.append(chatItemRightContent);
}