let showContentBtns = document.querySelectorAll(".showContentBtn");
let sections = document.querySelectorAll("section");
const closeDelay = 300; // Aizkaves laiks milisekundēs (atbilst .inactiveSec pārejas laikam)

for (const button of showContentBtns) {
  button.onclick = (event) => {
    const secId = event.target.dataset.id;
    const targetSection = document.querySelector("#" + secId);
    const wasActive = targetSection.classList.contains("activeSec");

    for (const sec of sections) {
      sec.classList.remove("activeSec");
      sec.classList.add("inactiveSec");
    }

    if (!wasActive) {
      // Pievienojam aizkavi pirms atvēršanas
      setTimeout(() => {
        targetSection.classList.remove("inactiveSec");
        targetSection.classList.add("activeSec");
      }, closeDelay);
    }
  };
}