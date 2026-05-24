let nowUrl = location.href;
function initializeContextMenu() {
    const url = new URL(location.href);
    if (url.searchParams.get('v')) {
        contextMenuVideoId.value = url.searchParams.get('v');
    }
    if (url.searchParams.get('column')) {
        contextMenuColumn.checked = url.searchParams.get('column') === 'true';
    }
    if (url.searchParams.get('size')) {
        contextMenuSize.value = url.searchParams.get('size');
    }
    if (url.searchParams.get('id_size')) {
        contextMenuIdSize.value = url.searchParams.get('id_size');
    }
    if (url.searchParams.get('icon_size')) {
        contextMenuIconSize.value = url.searchParams.get('icon_size');
    }
    if (url.searchParams.get('drop_shadow')) {
        contextMenuDropShadow.checked = url.searchParams.get('drop_shadow') === 'true';
    }
    if (url.searchParams.get('events')) {
        contextMenuEvents.checked = url.searchParams.get('events') === 'true';
    }
}
function dispatchContextMenu(e) {
    const url = new URL(e);
    if (url.searchParams.get('x')) {
        document.body.style.setProperty('--chats_right',url.searchParams.get('x'));
    }
    if (url.searchParams.get('y')) {
        document.body.style.setProperty('--chats_bottom',url.searchParams.get('y'));
    }
    if (url.searchParams.get('column') === 'true') {
        chats.classList.add('column');
        chats.classList.remove('row');
    } else if (url.searchParams.get('column') === 'false') {
        chats.classList.remove('column');
        chats.classList.add('row');
    }
    if (url.searchParams.get('size')) {
        document.body.style.setProperty('--font_size',url.searchParams.get('size'));
    }
    if (url.searchParams.get('id_size')) {
        document.body.style.setProperty('--chat_item_right_id_size',url.searchParams.get('id_size'));
    }
    if (url.searchParams.get('icon_size')) {
        document.body.style.setProperty('--chat_item_left_width',url.searchParams.get('icon_size'));
    }
    if (url.searchParams.get('drop_shadow') === 'true') {
        chats.classList.add('drop_shadow');
    } else if (url.searchParams.get('drop_shadow') === 'false') {
        chats.classList.remove('drop_shadow');
    }
    if (url.searchParams.get('events') === 'true') {
        enable_events = true;
    } else if (url.searchParams.get('events') === 'false') {
        enable_events = false;
    }
}
initializeContextMenu();
dispatchContextMenu(nowUrl);
let lastContextMenuClientX = 0;
let lastContextMenuClientY = 0;
function setUrl(e) {
    history.pushState({},'',e);
    nowUrl = e;
}
function setParam(key,value) {
    const url = new URL(nowUrl);
    url.searchParams.set(key,value);
    setUrl(url.href);
}
setUrl(nowUrl);
function moveContextMenu(e) {
    const clientRect = contextMenu.getBoundingClientRect();
    if (e.clientX + clientRect.width > window.innerWidth) {
        contextMenu.style.setProperty('--left',e.clientX - clientRect.width);
    } else {
        contextMenu.style.setProperty('--left',e.clientX);
    }
    if (e.clientY + clientRect.height > window.innerHeight) {
        contextMenu.style.setProperty('--top',e.clientY - clientRect.height);
    } else {
        contextMenu.style.setProperty('--top',e.clientY);
    }
}
function viewContextMenu(e) {
    e.preventDefault();
    contextMenu.classList.add('selected');
    moveContextMenu(e);
    lastContextMenuClientX = e.clientX;
    lastContextMenuClientY = e.clientY;
}
function hideContextMenu(e) {
    if (!e.target.closest('#context_menu')) {
        contextMenu.classList.remove('selected');
    }
}
document.addEventListener('dblclick',viewContextMenu);
document.addEventListener('contextmenu',viewContextMenu);
document.addEventListener('click',hideContextMenu);
contextMenuUrlCopy.addEventListener('click',()=>{
    navigator.clipboard.writeText(nowUrl).then(()=>{
        contextMenuUrlCopy.textContent = 'copied';
        setTimeout(()=>{contextMenuUrlCopy.textContent = 'copy'},1000);
    }).catch(()=>{
        contextMenuUrlCopy.textContent = 'failed';
        setTimeout(()=>{contextMenuUrlCopy.textContent = 'copy'},1000);
    });
});
contextMenuVideoId.addEventListener('input',()=>{
    setParam('v',contextMenuVideoId.value);
});
contextMenuVideoId.addEventListener('change',()=>{
    location.href = nowUrl;
});
contextMenuMove.addEventListener('click',()=>{
    contextMenu.classList.remove('selected');
    setParam('x',window.innerWidth - lastContextMenuClientX);
    setParam('y',window.innerHeight - lastContextMenuClientY);
    dispatchContextMenu(nowUrl);
});
contextMenuColumn.addEventListener('change',()=>{
    setParam('column',contextMenuColumn.checked);
    dispatchContextMenu(nowUrl);
});
contextMenuSize.addEventListener('input',()=>{
    setParam('size',contextMenuSize.value);
    dispatchContextMenu(nowUrl);
});
contextMenuIdSize.addEventListener('input',()=>{
    setParam('id_size',contextMenuIdSize.value);
    dispatchContextMenu(nowUrl);
});
contextMenuIconSize.addEventListener('input',()=>{
    setParam('icon_size',contextMenuIconSize.value);
    dispatchContextMenu(nowUrl);
});
contextMenuDropShadow.addEventListener('input',()=>{
    setParam('drop_shadow',contextMenuDropShadow.checked);
    dispatchContextMenu(nowUrl);
});
contextMenuEvents.addEventListener('change',()=>{
    setParam('events',contextMenuEvents.checked);
    dispatchContextMenu(nowUrl);
});