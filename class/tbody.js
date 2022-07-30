export class Tbody{
    constructor(date,description,type,amount){
        this.date=date;
        this.description=description;
        this.type=type;
        this.amount=amount;
    
       
    }
   render(){
    const tr=document.createElement('tr');
    tr.innerHTML=` <td><input type="date" name="" id="" value="${this.date}" /></td>
    <td><input type="text" name="" id="" value="${this.description}" /></td>
    <td>
      <select name="" id="">
        <option value="${this.type}">Expense</option>
        <option value="${this.type}">Income</option>
      </select>
    </td>
    <td><input type="number" name="" id="" value="${this.amount}" /></td>
    <td><button>❌</button></td>`
    return tr;
}
}