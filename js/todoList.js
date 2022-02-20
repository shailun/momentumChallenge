const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");
let todos = [];

const TODOS_KEY = "todos";


function saveTodos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify( todos) );
}
function deleteTodo(event){
    const li =event.target.parentElement;
    todos = todos.filter((todo) => todo.id !== parseInt(li.id));
    saveTodos();
    li.remove();
}
function paintToDo(newTodoObj){
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.innerText=newTodoObj.text;
    li.id=newTodoObj.id;
    const btn = document.createElement("button");
    btn.innerText="❌";
   
    btn.addEventListener("click", deleteTodo);

    li.appendChild(btn);
    li.appendChild(span);
    toDoList.appendChild(li);
}

function handleToDoSubmit(event){
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value="";

    const newTodoObj = {
        text: newTodo,
        id: Date.now()
    }
    todos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveTodos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);


const savedTodos = localStorage.getItem(TODOS_KEY)
if(savedTodos !== null){
    const parsedTodos = JSON.parse(savedTodos);
    todos = parsedTodos;
    parsedTodos.forEach((item) => paintToDo(item)) 
}




