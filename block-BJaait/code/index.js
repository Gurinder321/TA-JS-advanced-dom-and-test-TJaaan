let form = document.querySelector("form");
let ul = document.querySelector("ul");

let cardsData = JSON.parse(localStorage.getItem("cards")) || [];

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let addItem = event.target.elements.addItem.value;
  cardsData.push({ addItem });
  localStorage.setItem("cards", JSON.stringify(cardsData));
  createUI(cardsData, ul);
});

function createUI(data, root) {
  root.innerText = "";
  let fragment = new DocumentFragment();
  data.forEach((cardInfo) => {
    let li = document.createElement("li");
    let p = document.createElement("p");
    p.innerText = cardInfo.addItem;
    li.append(p);
    fragment.appendChild(li);
    li.classList.add("box");
    li.setAttribute('draggable', true);
  });
  root.append(fragment);
}
createUI(cardsData, ul);



document.addEventListener("DOMContentLoaded", (event) => {
    function handleDragStart(e) {
      this.style.opacity = "0.4";
  
      dragSrcEl = this;
  
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/html", this.innerHTML);
    }
  
    function handleDragEnd(e) {
      this.style.opacity = "1";
  
      items.forEach(function (item) {
        item.classList.remove("over");
      });
    }
  
    function handleDragOver(e) {
      if (e.preventDefault) {
        e.preventDefault();
      }
  
      return false;
    }
  
    function handleDragEnter(e) {
      this.classList.add("over");
    }
  
    function handleDragLeave(e) {
      this.classList.remove("over");
    }
  
    let items = document.querySelectorAll(".container .box");
    items.forEach(function (item) {
      item.addEventListener("dragstart", handleDragStart);
      item.addEventListener("dragover", handleDragOver);
      item.addEventListener("dragenter", handleDragEnter);
      item.addEventListener("dragleave", handleDragLeave);
      item.addEventListener("dragend", handleDragEnd);
      item.addEventListener("drop", handleDrop);
    });
  });
  
  function handleDrop(e) {
    e.stopPropagation();
  
    if (dragSrcEl !== this) {
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData("text/html");
    }
  
    return false;
  }