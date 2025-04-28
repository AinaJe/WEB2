let chatButton = document.querySelector('.iconChat');
let chatWindow = document.querySelector('.chatWindow');
let closeChatBtn = document.querySelector('.chatWindow .closeButton');

chatButton.onclick = (e)=>{
    e.preventDefault();
    chatButton.classList.add('iconChat__hidden');
    chatWindow.classList.add('chatWindow__show');
}

closeChatBtn.onclick = (e)=>{
    e.preventDefault();
    chatButton.classList.remove('iconChat__hidden');
    chatWindow.classList.remove('chatWindow__show');
}