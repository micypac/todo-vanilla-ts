import FullList from "../models/FullList";

interface DOMList {
  ul: HTMLUListElement;
  clear(): void;
  render(fullList: FullList): void;
}

class ListTemplate implements DOMList {
  ul: HTMLUListElement;

  static instance: ListTemplate = new ListTemplate();

  private constructor() {
    this.ul = document.getElementById("listItems") as HTMLUListElement;
  }

  clear(): void {
    this.ul.innerHTML = "";
  }

  render(fullList: FullList): void {
    this.clear();

    fullList.list.forEach((item) => {
      // create li element
      const li = document.createElement("li") as HTMLLIElement;
      li.className = "item";

      // create checkbox
      const check = document.createElement("input") as HTMLInputElement;
      check.type = "checkbox";
      check.id = item.id; // this is the getter of ListItem not the private var which is _id
      check.checked = item.checked; // this is the getter of ListItem not the private var which is _checked
      li.append(check);

      check.addEventListener("change", () => {
        item.checked = !item.checked;
        fullList.save();
      });

      // create label
      const label = document.createElement("label") as HTMLLabelElement;
      label.htmlFor = item.id;
      label.textContent = item.item;
      li.append(label);

      // create button
      const button = document.createElement("button") as HTMLButtonElement;
      button.className = "button";
      button.textContent = "X";
      li.append(button);

      button.addEventListener("click", () => {
        fullList.removeItem(item.id);
        this.render(fullList);
      });

      // add the li as child of ul
      this.ul.append(li);
    });
  }
}

export default ListTemplate;
