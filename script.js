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
  eventDeleteRecord();
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
        data.amount,
        data.id
      );
      tbodyTag.appendChild(tbody.render());
      save();
      eventDeleteRecord();
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
    const id = arrRecord.length;
    const data = {date, description, type, amount, id};
    arrRecord.push(data);
  });
  localStorage.setItem("record", JSON.stringify(arrRecord));
};

const deleteRecord = (e,index) => {
  const tr = e.target.parentElement.parentElement;
  tr.remove();
  arrRecord.splice(index,1);
  localStorage.setItem("record", JSON.stringify(arrRecord));
}

const eventDeleteRecord = () => {
  const deleteBtns = document.querySelectorAll(".delete");
  deleteBtns.forEach((btn,index) => {
    btn.addEventListener("click", (e)=>{
      deleteRecord(e,index);
    }) 
  })   
}

const editRecord = () => {
  const tbodyTag =[... document.querySelectorAll("tbody >tr")]
  
  tbodyTag.forEach((el) => {
    el.children[0].children[0].addEventListener("input", (e) => {
      const index = el.id
      console.log(index)
      const date = e.target.value
      arrRecord[index].date = date
      localStorage.setItem("record", JSON.stringify(arrRecord))
     })   
    
    el.children[1].children[0].addEventListener("input", (e) => {
      const index = el.id
      const description = e.target.value
      arrRecord[index].description = description
      localStorage.setItem("record", JSON.stringify(arrRecord))
     })
      el.children[2].children[0].addEventListener("change", (e) => {
      const index = el.id
      const type = e.target.value
      console.log(type)
      arrRecord[index].type = type
      localStorage.setItem("record", JSON.stringify(arrRecord))
     })
      el.children[3].children[0].addEventListener("input", (e) => {
      const index = el.id
      const amount = e.target.value
      arrRecord[index].amount = amount
      localStorage.setItem("record", JSON.stringify(arrRecord))
     })

    
    })
}

const init = () => {
  eventNewEntry();
  load();
  editRecord()
};

init();

