import "./css/style.css";
import ListItem from "./models/ListItem";
import FullList from "./models/FullList";
import ListTemplate from "./templates/ListTemplates";

const initApp = (): void => {
  const fullList = FullList.instance;
  const template = ListTemplate.instance;

  // grab HTML entry form
  const itemEntryForm = document.getElementById(
    "itemEntryForm"
  ) as HTMLFormElement;

  itemEntryForm.addEventListener("submit", (event: SubmitEvent): void => {
    event.preventDefault();

    const input = document.getElementById("newItem") as HTMLInputElement;
    const newTodoEntry = input.value.trim();
    // if todo entry is space, do nothing
    if (!newTodoEntry.length) return;

    // calculate new todo id
    const itemId: number = fullList.list.length
      ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
      : 1;

    // create new ListItem
    const newItem = new ListItem(itemId.toString(), newTodoEntry);

    input.value = "";
    input.focus();

    // add new ListItem to FullList
    fullList.addItem(newItem);

    // re-render list with the new item
    template.render(fullList);
  });

  // grab HTML clear button
  const clearItems = document.getElementById(
    "clearItemsButton"
  ) as HTMLButtonElement;

  clearItems.addEventListener("click", (): void => {
    fullList.clearList();
    template.clear();
  });

  // load initial data
  fullList.load();

  // initial template render
  template.render(fullList);
};

document.addEventListener("DOMContentLoaded", initApp);
