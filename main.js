let inputBox = document.querySelector("#task-name");
let addTaskButton = document.querySelector(".add-tasks-part .add-task");
let listOfTasks = document.querySelector(".tasks-part ul");
let clearAllTasks = document.querySelector(".button .clear");
let filterTask = document.querySelector("#filter-tasks");

let newTask = [];
if (localStorage.getItem("tasks")) {
  newTask = JSON.parse(localStorage.getItem("tasks"));
}
getData();
addTaskButton.addEventListener("click", () => {
  if (inputBox.value !== "") {
    addTasksToArray(inputBox.value);
    inputBox.value = "";
  }
});
filterTask.addEventListener("input", () => {
  search(filterTask.value);
});
clearAllTasks.addEventListener("click", () => {
  clearAll();
});
listOfTasks.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
    deleteTasks(e.target.parentElement.getAttribute("data-id"));
  }
  if (e.target.classList.contains("task")) {
    e.target.classList.toggle("done");
    updateTasks(e.target.getAttribute("data-id"));
  }
});
function addTasksToArray(task) {
  const taskData = {
    id: Date.now(),
    tittle: task,
    completed: false,
  };
  newTask.push(taskData);
  addTasksToPage(newTask);
  addTasksToStorage(newTask);
}
function addTasksToPage(newTask) {
  listOfTasks.innerHTML = "";
  newTask.forEach((e) => {
    let list = document.createElement("li");
    list.setAttribute("data-id", e.id);
    list.setAttribute("class", "task");
    if (e.completed) {
      list.classList.add("done");
    }

    list.innerHTML = `<span>${e.tittle}</span>
    <i class="fa-solid fa-circle-xmark delete"></i>`;
    listOfTasks.appendChild(list);
  });
}
function deleteTasks(tasksId) {
  newTask = newTask.filter((e) => e.id != tasksId);
  addTasksToStorage(newTask);
}

function updateTasks(taskId) {
  for (let i = 0; i < newTask.length; i++) {
    if (newTask[i].id == taskId) {
      newTask[i].completed == false
        ? (newTask[i].completed = true)
        : (newTask[i].completed = false);
    }
  }
  addTasksToStorage(newTask);
}
function addTasksToStorage(newTask) {
  localStorage.setItem("tasks", JSON.stringify(newTask));
}
function getData() {
  let data = localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addTasksToPage(tasks);
  }
}
function search(filterValue) {
  let searchNames = newTask.filter((e) => e.tittle.includes(filterValue));
  if (searchNames.length > 0) {
    addTasksToPage(searchNames);
  } else {
    addTasksToPage(newTask);
  }
}

function clearAll() {
  listOfTasks.innerHTML = "";
  localStorage.removeItem("tasks");
  location.reload();
}
const greeting = async () => {
  var y = await "welcome";
  console.log(y);
};

console.log(1);
greeting();
console.log(2);
