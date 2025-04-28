let dialog = document.querySelector("#contactFormDialog");
let dialogOpenBtn = document.querySelector(".contactBtn");
let dialogCloseBtn = document.querySelector(".dialogCloseBtn");

dialogOpenBtn.onclick = ()=>{
    dialog.showModal();
}

dialogCloseBtn.onclick = ()=>{
    dialog.close();
}
