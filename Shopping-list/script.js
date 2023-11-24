const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");
const itemClear = document.querySelector("#clear");
const itemFilter = document.querySelector(".form-input-filter");
const formBtn = itemForm.querySelector("button");
let isEditMode = false;

displayItems = () => {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));
  checkUi();
};

onAddItemSubmit = (e) => {
  e.preventDefault();

  //Validate input
  const newItem = itemInput.value;
  if (newItem === "") {
    alert("Please add an item");
    return;
  }

  //Check for edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector(".edit-mode");

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove("edit-mode");
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (checkIfItemExists(newItem)) {
      alert("That item already exists!");
      return;
    }
  }

  addItemToDOM(newItem);
  addItemToStorage(newItem);
  checkUi();

  itemInput.value = "";
};

addItemToDOM = (item) => {
  //Create list item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  //Add li to the DOM
  itemList.appendChild(li);
};

createButton = (classes) => {
  const button = document.createElement("button");
  button.className = classes;

  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
};

createIcon = (classes) => {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
};

addItemToStorage = (item) => {
  let itemsFromStorage = getItemsFromStorage();

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  itemsFromStorage.push(item);

  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
};

getItemsFromStorage = () => {
  let itemsFromStorage;
  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemsFromStorage;
};

onClickItem = (e) => {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
};

checkIfItemExists = (item) => {
  const itemsFromStorage = getItemsFromStorage();
  return itemsFromStorage.includes(item);
};

setItemToEdit = (item) => {
  isEditMode = true;

  itemList
    .querySelectorAll("li")
    .forEach((i) => i.classList.remove("edit-mode"));

  item.classList.add("edit-mode");
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i>   Update Item';
  formBtn.style.backgroundColor = "#228B22";
  itemInput.value = item.textContent;
};

removeItem = (item) => {
  if (confirm("Are you sure?")) {
    item.remove();
    removeItemFromStorage(item.textContent);
    checkUi();
  }
};

removeItemFromStorage = (item) => {
  let itemsFromStorage = getItemsFromStorage();

  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
};

clearItems = () => {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  localStorage.removeItem("items");

  checkUi();
};

filterItems = (e) => {
  const items = itemList.querySelectorAll("li");
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
};

checkUi = () => {
  itemInput.value = "";

  const items = itemList.querySelectorAll("li");

  if (items.length === 0) {
    itemClear.style.display = "none";
    filter.style.display = "none";
  } else {
    itemClear.style.display = "block";
    filter.style.display = "block";
  }

  formBtn.innerHTML = "<i class='fa-solid fa-plus'></i> Add item";
  formBtn.style.backgroundColor = "#333";

  isEditMode = false;
};

itemForm.addEventListener("submit", onAddItemSubmit);
itemList.addEventListener("click", onClickItem);
itemClear.addEventListener("click", clearItems);
itemFilter.addEventListener("input", filterItems);
document.addEventListener("DOMContentLoaded", displayItems);

checkUi();
