import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://dontforget-8ec48-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListDB = ref(database, "shoppingList");

const btnEl = document.getElementById("add-button");
const inputEl = document.getElementById("input-field");
const shopListEl = document.getElementById("shopping-list");

const clearShoppingListEl = () => {
  shopListEl.innerHTML = "";
};

onValue(shoppingListDB, (snapshot) => {
  if (snapshot.exists()) {
    const allObject = snapshot.val();
    const objects = Object.entries(allObject);
    clearShoppingListEl();
    objects.map((object) => {
      const [currentItemId, currentItemValue] = object;
      addnewItem(currentItemId, currentItemValue);
    });
  } else shopListEl.innerHTML = "There is no item to show";
});

const addnewItem = (itemiId, itemValue) => {
  const newListEl = document.createElement("li");
  shopListEl.appendChild(newListEl);
  newListEl.innerHTML = itemValue;
  newListEl.addEventListener("click", () => {
    let exactLocationOfItemInDb = ref(database, `shoppingList/${itemiId}`);
    remove(exactLocationOfItemInDb);
  });
};

const refreshInput = () => {
  inputEl.value = "";
};

btnEl.addEventListener("click", () => {
  let inputValue = inputEl.value;
  push(shoppingListDB, inputValue);
  refreshInput();
});
