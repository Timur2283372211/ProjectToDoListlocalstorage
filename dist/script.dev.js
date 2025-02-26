"use strict";

console.clear(); //localStorage.clear()
//змінні

var tasks = [];
var times = [];
var dates = [];
var addTaskButton = document.querySelector("button");
var input = document.querySelector(".task");
var inputTime = document.querySelector(".time");
var inputDate = document.querySelector(".date");
var taskList = document.querySelector(".task-list"); //відновлення списку

var prevTasks = localStorage.getItem("mytasks");
var prevTimes = localStorage.getItem("mytimes");
var prevDates = localStorage.getItem("mydates");
console.log("GET! ", prevTasks, prevTimes, prevDates);

if (prevTasks == null) {
  prevTasks = [];
} else {
  tasks = prevTasks.split(",");
  times = prevTimes.split(",");
  dates = prevDates.split(",");
  tasks.forEach(function (item, index) {
    var taskRow = document.createElement("div");
    taskRow.setAttribute("class", "task-row");
    var elementTask = document.createElement("div");
    var elementTime = document.createElement("div");
    var elementDate = document.createElement("div");
    elementTask.textContent = tasks[index];
    elementTime.textContent = times[index];
    elementDate.textContent = dates[index];
    taskList.appendChild(taskRow);
    taskRow.appendChild(elementTask);
    taskRow.appendChild(elementTime);
    taskRow.appendChild(elementDate);
  });
} //натиснення на +


addTaskButton.addEventListener("click", function () {
  var taskRow = document.createElement("div");
  taskRow.setAttribute("class", "task-row");
  var elementTask = document.createElement("div");
  var elementTime = document.createElement("div");
  var elementDate = document.createElement("div");
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
var date = new Date();
console.log(date.getMinutes());
console.log(date.getHours());
console.log(date.getDate());
console.log(date.getMonth() + 1);
console.log(date.getFullYear());
//# sourceMappingURL=script.dev.js.map
