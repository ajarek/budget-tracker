import { Tbody } from "./class/tbody.js";
const NEW_ENTRY_BTN = document.querySelector(".btn-entry ");
let arrRecord = [];

const load = () => {
  const tbodyTag = document.querySelector("tbody");
  tbodyTag.innerHTML = "";
  const record = JSON.parse(localStorage.getItem("arrRecord")) || [];
  if (record) {
    record.map((data) => {
      const tbody = new Tbody(
        data.date,
        data.description,
        data.type,
        data.amount,
        data.id
      );
     
      tbodyTag.appendChild(tbody.render());
      arrRecord.push(data);
      change();
      eventDeleteRecord();
      total();
      nameOption()
    });
  }
};

const newEntry = () => {
  const tbodyTag = document.querySelector("tbody");
  const data = {
    date: new Date().toISOString().split("T")[0],
    description: "Zakupy",
    type: "Expense",
    amount: 0,
    id: arrRecord.length,
  };
  const tbody = new Tbody(
    data.date,
    data.description,
    data.type,
    data.amount,
    data.id
  );
  tbodyTag.appendChild(tbody.render());

  arrRecord.push(data);
  change();
  saveLocalStorage(arrRecord);
 eventDeleteRecord();
  total();
};

const eventNewEntry = () => {
  NEW_ENTRY_BTN.addEventListener("click", newEntry);
};

const change = () => {
  const tbodyTag = Array(document.querySelectorAll(".edit"));
  tbodyTag.forEach((tr) => {
    tr.forEach((td) => {
      td.addEventListener("change", (e) => {
        if (td.type === "date") {
          const index = td.parentElement.parentElement.id;
          const date = e.target.value;
          arrRecord[index].date = date;
          saveLocalStorage(arrRecord);
        }
        if (td.type === "text") {
          const index = td.parentElement.parentElement.id;
          const description = e.target.value;
          arrRecord[index].description = description;
          saveLocalStorage(arrRecord);
        }
        if (td.type === "number") {
          const index = td.parentElement.parentElement.id;
          const amount = e.target.value;
          arrRecord[index].amount = amount;
          saveLocalStorage(arrRecord);
          total();
        }
        if (td.id === "type") {
          const index = td.parentElement.parentElement.id;
          const type = e.target.value;
          if(type === "Income"){
            arrRecord[index].amount = Number(arrRecord[index].amount) * -1;
           saveLocalStorage(arrRecord);
           total();
          }
            
          arrRecord[index].type = type;
          saveLocalStorage(arrRecord);
        }
      });
    });
  });
};

const saveLocalStorage = (arr) => {
  localStorage.setItem("arrRecord", JSON.stringify(arr));
};

const deleteRecord = (e, index) => {
  const tr = e.target.parentElement.parentElement;
  tr.remove();
  arrRecord.splice(index, 1);
  localStorage.setItem("arrRecord", JSON.stringify(arrRecord));
  total();
};

const eventDeleteRecord = () => {
  const deleteBtns = document.querySelectorAll(".delete");
  deleteBtns.forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
      deleteRecord(e, index);
    });
  });
};

const total = () => {
  const total = document.querySelector(".total> span");
  const totalAmount = arrRecord.reduce((acc, curr) => {
    return Number(acc) + Number(curr.amount);
  }
  , 0);
  total.innerHTML = totalAmount.toFixed(2);
}
const nameOption = () => {
  document.querySelectorAll('#amount').forEach((option) => {
    if(option.value<0){
      option.parentElement.parentElement.children[2].children[0].children[0].innerHTML="Income";
    }
  })
}
  
const init = () => {
load();
eventNewEntry();
total();
}
init();