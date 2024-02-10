import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
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

onValue(shoppingListDB, (snapshot) => {
  const allObject = snapshot.val();
  console.log(Object.values(allObject));
});

const addnewItem = (inputValue) => {
  const newListEl = document.createElement("li");
  shopListEl.appendChild(newListEl);
  newListEl.innerHTML = inputValue;
};

const refreshInput = () => {
  inputEl.value = "";
};

btnEl.addEventListener("click", () => {
  let inputValue = inputEl.value;
  push(shoppingListDB, inputValue);

  addnewItem(inputValue);

  refreshInput();
});
