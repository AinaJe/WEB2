let showContentBtns1 = document.querySelectorAll(".showContentBtn");

for (let button of showContentBtns1) {
  button.onclick = (e) => {
    let secId = e.target.dataset.id;
    document.querySelector("#" + secId).classList.toggle("activeSec");
  };
}