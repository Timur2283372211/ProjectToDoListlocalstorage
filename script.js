console.clear();
//localStorage.clear()

//змінні
let tasks = [];
let times = [];
let dates = [];
let addTaskButton = document.querySelector("button");
let input = document.querySelector(".task");
let inputTime = document.querySelector(".time");
let inputDate = document.querySelector(".date");
let taskList = document.querySelector(".task-list");

//відновлення списку
let prevTasks = localStorage.getItem("mytasks");
let prevTimes = localStorage.getItem("mytimes");
let prevDates = localStorage.getItem("mydates");
console.log("GET! ", prevTasks, prevTimes, prevDates);
if (prevTasks == null) {
  prevTasks = [];
} else {
  tasks = prevTasks.split(",");
  times = prevTimes.split(",");
  dates = prevDates.split(",");
  tasks.forEach((item, index) => {
    let taskRow = document.createElement("div");
    taskRow.setAttribute("class", "task-row");
    let elementTask = document.createElement("div");
    let elementTime = document.createElement("div");
    let elementDate = document.createElement("div");
    elementTask.textContent = tasks[index];
    elementTime.textContent = times[index];
    elementDate.textContent = dates[index];
    taskList.appendChild(taskRow);
    taskRow.appendChild(elementTask);
    taskRow.appendChild(elementTime);
    taskRow.appendChild(elementDate);
  });
}
//натиснення на +
addTaskButton.addEventListener("click", () => {
  let taskRow = document.createElement("div");
  taskRow.setAttribute("class", "task-row");
  let elementTask = document.createElement("div");
  let elementTime = document.createElement("div");
  let elementDate = document.createElement("div");
  elementTask.textContent = input.value;
  elementTime.textContent = inputTime.value;
  elementDate.textContent = inputDate.value;
  tasks.push(elementTask.textContent);
  times.push(elementTime.textContent);
  dates.push(elementDate.textContent);
  taskList.appendChild(taskRow);
  taskRow.appendChild(elementTask);
  taskRow.appendChild(elementTime);
  taskRow.appendChild(elementDate);
  localStorage.setItem("mytasks", tasks);
  localStorage.setItem("mytimes", times);
  localStorage.setItem("mydates", dates);
});

let date = new Date();
console.log(date.getMinutes());
console.log(date.getHours());
console.log(date.getDate());
console.log(date.getMonth() + 1);
console.log(date.getFullYear());