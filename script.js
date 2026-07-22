const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo() {
    const task = taskInput.value.trim();

    if (task === "") {
        alert("Please enter a task.");
        return;
    }

    const todo = {
        text: task,
        completed: false
    };

    todos.push(todo);
    saveTodos();
    renderTodo();

    taskInput.value = "";
}

function renderTodo() {

    todoList.innerHTML = "";

    todos.forEach((todo, index) => {
        createTodoItem(todo, index);
    });

}

function createTodoItem(todo, index) {

    const li = document.createElement("li");

    const taskDiv = document.createElement("div");
    taskDiv.className = "task";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    checkbox.addEventListener("change", () => {
        todos[index].completed = checkbox.checked;
        saveTodos();
        renderTodo();
    });

    const span = document.createElement("span");
    span.textContent = todo.text;

    if (todo.completed) {
        span.classList.add("completed");
    }

    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(span);

    const buttonDiv = document.createElement("div");
    buttonDiv.className = "buttons";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit";

    editBtn.addEventListener("click", () => {

        const updatedTask = prompt("Edit Task", todo.text);

        if (updatedTask !== null && updatedTask.trim() !== "") {
            todos[index].text = updatedTask.trim();
            saveTodos();
            renderTodo();
        }

    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete";

    deleteBtn.addEventListener("click", () => {

        todos.splice(index, 1);
        saveTodos();
        renderTodo();

    });

    buttonDiv.appendChild(editBtn);
    buttonDiv.appendChild(deleteBtn);

    li.appendChild(taskDiv);
    li.appendChild(buttonDiv);

    todoList.appendChild(li);
}

addBtn.addEventListener("click", addTodo);

taskInput.addEventListener("keypress", function(e){
    if(e.key==="Enter"){
        addTodo();
    }
});

renderTodo();