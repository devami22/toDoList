const todoInput = document.querySelector("#todo-text");
// create variable for the text field element
const todoForm = document.querySelector("#todo-form");
// create a variable for the parent element which is the form itself
const todoList = document.querySelector("#todo-list");
// create a variable for the to-do list that will be generated once the user puts in to-do items via the form
const todoCountSpan = document.querySelector("#todo-count");
// create a variable to contain the total number of to-do items after users have input their to-dos

let todos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : ["Learn HTML", "Learn CSS", "Learn JavaScript"];
// create a variable with ternary shorthand to use local storage for saved to-dos, otherwise load static to-dos from the starting array
// Changed the above variable to LET instead of CONST as it clashed with the deleteTodos variable below.

todoForm.addEventListener("submit", (event) => {
    // call todoFrom function and add eventlistener to trigger the below function upon 'submit'.
    event.preventDefault();
    // This prevents the form from being submitted if the field is empty - hence preventDefault function is used.
    const todoText = todoInput.value.trim();
    todoInput.value = "";
    // This creates a variable with the function to remove excess spaces in the to-do entry field
    if (todoText === "") {
        alert("The todo can not be empty");
        return;
        // This is a simple IF statement to notify the user that the field cannot be empty. The console.log can also be an alert.
    }
    todos.push(todoText);
    // This will insert the new to-do into the existing array containing the to-dos - namely todoText as defined above.
    localStorage.setItem("todos", JSON.stringify(todos));
    //QUESTION

    console.log(JSON.stringify(todos))

    loadTodos();
    //QUESTION
});

// const loadTodos = () => { 
//     for (let i = 0; i < todos.length; i++) { 
//         const li = document.createElement("li");
//         li.textContent = todos[i];
//         todoList.appendChild(li);
//     }
// }
const deleteTodo = (e) => { 
    const li = e.target.parentElement;
    //go through todos and compare
    todos = todos.filter(
        (todo) => {
            return todo !== li.innerText.split("\n")[0]
        }
    )
    loadTodos();
} 

const loadTodos = () => {
    todoList.innerHTML = "";

    todos.forEach((todo) => {
        const li = document.createElement("li");
        const btnDlt = document.createElement("button");
        const btnDone = document.createElement("button");
        btnDone.className = "comp-btn";
        btnDlt.textContent = "Delete 🚫";
        btnDlt.addEventListener("click", deleteTodo);
        btnDone.textContent = "Done! ✅";
        btnDone.addEventListener("click", () => {
            li.classList.toggle('task-comp');
        });
        //li.addEventListener("click", deleteTodo);
        li.textContent = todo;
        li.appendChild(btnDlt);
        li.appendChild(btnDone);
        todoList.appendChild(li);
        todoInput.addEventListener('submit', () => {
            todoInput.textContent = "";
        });
});
    todoCountSpan.textContent = todos.length;
} 
loadTodos();
