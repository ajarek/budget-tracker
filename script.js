import { Tbody } from "./class/tbody.js";
const NEW_ENTRY_BTN = document.querySelector(".btn-entry ");
let arrRecord = [];

const newEntry = () => {
  const tbodyTag = document.querySelector("tbody");
  const tbody = new Tbody(
    new Date().toISOString().split("T")[0],
    "",
    "Expense",
    0
  );
  tbodyTag.appendChild(tbody.render());
  save();
};

const eventNewEntry = () => {
  NEW_ENTRY_BTN.addEventListener("click", newEntry);
};

const load = () => {
  const record = JSON.parse(localStorage.getItem("record"));
  const tbodyTag = document.querySelector("tbody");
  tbodyTag.innerHTML = "";
  if (record) {
    record.map((data) => {
      const tbody = new Tbody(
        data.date,
        data.description,
        data.type,
        data.amount
      );
      tbodyTag.appendChild(tbody.render());
      save();
    });
  }
};

const save = () => {
  const tbodyTag = Array(document.querySelectorAll("td"));

  tbodyTag.map((td) => {
    const date =
      td[0].children[0].value || new Date().toISOString().split("T")[0];
    const description = td[1].children[0].value || "";
    const type = td[2].children[0].value;
    const amount = td[3].children[0].value || 0;
    const data = { date, description, type, amount };
    arrRecord.push(data);
  });
  localStorage.setItem("record", JSON.stringify(arrRecord));
};

const init = () => {
  eventNewEntry();
  load();
};

init();
