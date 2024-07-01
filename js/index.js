(async function () {
    const resp = await API.profile();
    const user = resp.data;
    if (!user) {
        alert(resp.msg);
        location.href = './login.html';
        return;
    }
    $('#nickname').innerText = user.nickname;
    $('#loginId').innerText = user.loginId;

    $('.close').onclick = function () {
        API.loginOut();
        location.href = './login.html';
    }
    await loadHistory();
    async function loadHistory() {
        const resp = await API.getHistory();
        for (const item of resp.data) {
            addChat(item)
        }
        $('.chat-container').scrollTop = $('.chat-container').scrollHeight;
    }

    function addChat(chatInfo) {
        const div = $$$('div');
        div.classList.add('chat-item');
        if (chatInfo.from) {
            div.classList.add('me')
        }

        const img = $$$('img');
        img.classList.add('chat-avatar');
        img.src = chatInfo.from ? "./asset/avatar.png" : "./asset/robot-avatar.jpg";

        const chatContent = $$$('div');
        chatContent.classList.add('chat-content');
        chatContent.innerText = chatInfo.content;

        const chatDate = $$$('div');
        chatDate.classList.add('chat-date');
        chatDate.innerText = formatDate(chatInfo.createdAt);

        div.appendChild(img);
        div.appendChild(chatContent);
        div.appendChild(chatDate);

        $('.chat-container').appendChild(div);
    }

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const y = date.getFullYear();
        const m = (date.getMonth() + 1).toString().padStart(2, '0');
        const d = date.getDate().toString().padStart(2, '0');
        const h = date.getHours().toString().padStart(2, '0');
        const mm = date.getMinutes().toString().padStart(2, '0');
        const s = date.getSeconds().toString().padStart(2, '0');

        return `${y}-${m}-${d} ${h}:${mm}:${s}`;
    }

    async function sendChat() {
        const content = $('#txtMsg').value.trim();
        if (!content) {
            return;
        }
        addChat({
            content,
            createdAt: Date.now(),
            from: user.loginId,
            to: null
        });
        $('#txtMsg').value = '';
        $('.chat-container').scrollTop = $('.chat-container').scrollHeight;
        const resp = await API.sendChat(content);
        addChat({
            from: null,
            to: user.loginId,
            ...resp.data,
        })
        $('.chat-container').scrollTop = $('.chat-container').scrollHeight;
    }

    $('.msg-container').onsubmit = function (e) {
        e.preventDefault();
        sendChat();
    }
})()

