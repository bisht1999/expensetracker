
window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/6c1068aecfd64d0ea6dbc28dfa045fa8/product")
        .then((response) => {
            for (var i = 0; i < response.data.length; i++) {
                addExpense(response.data[i])
            }
        })
})


function saveToLocalStorage(event) {
   event.preventDefault();
    const amount = event.target.amount.value;
    const discription = event.target.discription.value;
    const catagory = event.target.catagory.value;
    let obj = {
        amount,
        discription,
        catagory,
    }
    axios.post("https://crudcrud.com/api/6c1068aecfd64d0ea6dbc28dfa045fa8/product", obj)
        .then((response) => {
            addExpense(response.data)
        })
        .catch((err) => {
            const er = document.getElementById('error');
           
            console.log(err);
        })
}


function addExpense(expense) {
    document.getElementById('amount').value = '';
    document.getElementById('discription').value = '';
    document.getElementById('catagory').value ='';

    if(localStorage.getItem(expense._id)!== null){
        removeExpense(expense._id);
    }


    const parentNode = document.getElementById('listOfExpense');
    const childHTML = `<li id=${expense._id}> ${expense.amount} - ${expense.discription} - ${expense.catagory}
                            <button class="editbtn" onCLick=editExpense('${expense.amount}','${expense.discription}','${expense.catagory}','${expense._id}')>Edit expense</button>
                            <button class="deletebtn" onCLick=deleteExpense('${expense._id}')>Delete expense</button>
                        </li>`;
    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}



function deleteExpense(trackerId) {
    axios.delete(`https://crudcrud.com/api/6c1068aecfd64d0ea6dbc28dfa045fa8/product/${trackerId}`)
        .then((response) => {
            removeExpense(trackerId)
        })
        .catch((err) => {
            const er = document.getElementById('error');
           
            console.log(err);
        })
}

function removeExpense(trackerId) {
    const parentNode = document.getElementById('listOfExpense');
    const deletingChildNode = document.getElementById(trackerId);
    if (deletingChildNode) {
        parentNode.removeChild(deletingChildNode);
    }
}


function editExpense(amount, discription, catagory,trackerId) {
    document.getElementById('amount').value = amount;
    document.getElementById('discription').value = discription;
    document.getElementById('catagory').value = catagory;
    deleteExpense(trackerId);
}