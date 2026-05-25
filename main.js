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
function displayType4(sources) {
    const displayElement = new Image();
    displayElement.src = sources[randint(0,sources.length - 1)];
    displayElement.onload = ()=>{
        displayElement.onload = ()=>{};
        displayElement.classList.add('effects_type_4');
        displayElement.style.setProperty('--top',window.innerHeight * 0.85);
        displayElement.style.setProperty('--additional_top',window.innerHeight * 0.4);
        displayElement.style.setProperty('--left',window.innerWidth * Math.random() / 2 + (window.innerWidth / 4));
        displayElement.style.setProperty('--rotate',Math.random() * 10 - 5);
        displayElement.style.setProperty('--direction',Math.random() >= 0.5 ? 1 : -1);
        effectsDiv.append(displayElement);
        setTimeout(()=>{
            displayElement.remove();
        },1500);
    }
}
function displayType5Base(sources) {
    const baseImg = new Image();
    baseImg.src = sources[randint(0,sources.length - 1)];
    baseImg.onload = ()=>{
        const elements = [];
        const baseLeft = window.innerWidth * Math.random() / 2 + (window.innerWidth / 4);
        const baseTop = window.innerHeight * Math.random() / 2 + (window.innerHeight / 4);
        const elementCount = 6;
        for (let i = 0; i < elementCount; i++) {
            const rotation = 2 * Math.PI * i / elementCount;
            const img = baseImg.cloneNode();
            elements.push({
                left: baseLeft,
                top: baseTop,
                vLeft: 15 * Math.cos(rotation),
                vTop: 15 * Math.sin(rotation),
                opacity: 1,
                img: img
            });
            img.classList.add('effects_type_5');
            img.style.setProperty('--top',baseTop);
            img.style.setProperty('--left',baseLeft);
            img.style.setProperty('opacity',1);
            effectsDiv.append(img);
        }
        function animate() {
            for (let i = elements.length - 1; i >= 0; i--) {
                const element = elements[i];
                element.opacity -= 0.02;
                element.left += element.vLeft;
                element.top += element.vTop;
                element.vleft *= 0.9;
                element.vTop *= 0.95;
                element.vTop += 1.5;
                element.img.style.setProperty('--top',element.top);
                element.img.style.setProperty('--left',element.left);
                element.img.style.setProperty('opacity',element.opacity);
                if (element.opacity <= 0) {
                    element.img.remove();
                    elements.splice(i,1);
                }
            }
            if (elements.length > 0) {
                requestAnimationFrame(animate);
            }
        }
        animate();
    }
}
function displayType5(sources) {
    displayType5Base(sources);
    setTimeout(()=>{displayType5Base(sources)},2000);
    setTimeout(()=>{displayType5Base(sources)},4000);
    setTimeout(()=>{displayType5Base(sources)},6000);
}
function displayType6(sources) {
    const baseImg = new Image();
    baseImg.src = sources[randint(0,sources.length - 1)];
    baseImg.onload = ()=>{
        const elementCount = 10;
        let fromTop = true;
        for (let i = 0; i < elementCount; i++) {
            const img = baseImg.cloneNode();
            img.classList.add('effects_type_6');
            img.style.setProperty('--left',window.innerWidth * i / elementCount);
            if (fromTop) {
                img.style.setProperty('--top',window.innerHeight * -0.2);
                img.style.setProperty('--additional_top',window.innerHeight * 1.4);
            } else {
                img.style.setProperty('--top',window.innerHeight * 1.2);
                img.style.setProperty('--additional_top',window.innerHeight * -1.4);
            }
            effectsDiv.append(img);
            setTimeout(()=>{
                img.remove();
            },8000);
            fromTop = !fromTop;
        }
    }
}
function displayType7(sources) {
    const baseImg = new Image();
    baseImg.src = sources[randint(0,sources.length - 1)];
    baseImg.onload = ()=>{
        const elementCount = 3;
        const elements = [];
        for (let i = 0; i < elementCount; i++) {
            const img = baseImg.cloneNode();
            img.classList.add('effects_type_7');
            elements.push({
                left: window.innerWidth * Math.random() / 2 + (window.innerWidth / 4),
                top: window.innerHeight * Math.random() / 2 + (window.innerHeight / 4),
                img: img,
                direction: Math.random() * Math.PI * 2,
                opacity: 1
            });
            effectsDiv.append(img);
        }
        let time = 0;
        function animate() {
            time ++;
            for (let i = elements.length - 1; i >= 0; i--) {
                const element = elements[i];
                element.left += 10 * Math.cos(element.direction);
                element.top += 10 * Math.sin(element.direction);
                element.img.style.setProperty('--top',element.top);
                element.img.style.setProperty('--left',element.left);
                element.img.style.setProperty('opacity',element.opacity);
                if (element.left < 0) {
                    element.left = 0;
                    element.direction = Math.PI - element.direction;
                } else if (element.left > window.innerWidth) {
                    element.left = window.innerWidth;
                    element.direction = Math.PI - element.direction;
                } else if (element.top < 0) {
                    element.top = 0;
                    element.direction = -element.direction;
                } else if (element.top > window.innerHeight) {
                    element.top = window.innerHeight;
                    element.direction = -element.direction;
                }
                if (time > 400) {
                    element.opacity -= 0.05;
                }
                if (element.opacity <= 0) {
                    element.img.remove();
                    elements.splice(i,1);
                }
            }
            if (elements.length > 0) {
                requestAnimationFrame(animate);
            }
        }
        animate();
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
            } else if (imageDisplayEvent.type === 4) {
                displayType4(imageDisplayEvent.sources);
            } else if (imageDisplayEvent.type === 5) {
                displayType5(imageDisplayEvent.sources);
            } else if (imageDisplayEvent.type === 6) {
                displayType6(imageDisplayEvent.sources);
            } else if (imageDisplayEvent.type === 7) {
                displayType7(imageDisplayEvent.sources);
            }
        }
    });
    chatItemRight.append(chatItemRightContent);
}