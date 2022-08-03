export class Tbody{
    constructor(date,description,type,amount,id){
        this.date=date;
        this.description=description;
        this.type=type;
        this.amount=amount;
        this.id=id;
       
    }
   render(){
    const tr=document.createElement('tr');
    tr.id=this.id;
    tr.innerHTML=` <td><input type="date" id="date" class="edit" value="${this.date}" /></td>
    <td><input type="text" id="description" class="edit" value="${this.description}" /></td>
    <td>
      <select id="type" class="edit">
        <option class="option" value="Expense">Expense</option>
        <option class="option" value="Income">Income</option>
      </select>
    </td>
    <td><input type="number" id="amount" class="edit" value="${this.amount}" /></td>
    <td><button class="delete">❌</button></td>`
    return tr;
}
}