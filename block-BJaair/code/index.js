let form = document.querySelector("form");
let ul = document.querySelector("ul");

let cardsData = JSON.parse(localStorage.getItem("cards")) || [];

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let title = event.target.elements.title.value;
  let category = event.target.elements.category.value;
  cardsData.push({ title, category });
  localStorage.setItem("cards", JSON.stringify(cardsData));
  createUI(cardsData, ul);
});

function handleEdit(event, info, id, label) {
  let elm = event.target;
  let input = document.createElement("input");
  input.value = info;
  input.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
      let updatedValue = e.target.value;
      cardsData[id][label] = updatedValue;
      createUI();
      localStorage.setItem("cards", JSON.stringify(cardsData));
    }
  });

  input.addEventListener("blur", (e) => {
    let updatedValue = e.target.value;
    cardsData[id][label] = updatedValue;
    createUI();
    localStorage.setItem("cards", JSON.stringify(cardsData));
  });

  let parent = event.target.parentElement;
  parent.replaceChild(input, elm);
}

function createUI(data = cardsData, root = ul) {
  root.innerText = "";
  let fragment = new DocumentFragment();
  data.forEach((cardInfo, index) => {
    let li = document.createElement("li");
    let p = document.createElement("p");
    p.addEventListener("dblclick", (event) =>
      handleEdit(event, cardInfo.category, index, "category")
    );
    p.innerText = cardInfo.category;
    let h2 = document.createElement("h2");
    h2.innerText = cardInfo.title;
    h2.addEventListener("dblclick", (event) => handleEdit(event, cardInfo.title, index, "title"));
    li.append(p, h2);
    fragment.appendChild(li);
  });
  root.append(fragment);
}

createUI(cardsData, ul);
