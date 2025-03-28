"use strict";

console.clear(); // ============== ГЛОБАЛЬНІ ЗМІННІ ==============
// Масиви для зберігання даних завдань

var tasks = []; // Назви завдань

var aboutTasks = []; // Опис завдань

var times = []; // Час виконання

var dates = []; // Дати виконання

var completeTasks = []; // Статус завершення (0/1)

var categories = []; // Категорії завдань

var priorities = []; // Пріоритети завдань
// Лічильники

var createdCounter = 0; // Кількість створених завдань

var completedCounter = 0; // Кількість виконаних завдань

var pendingCounter = 0; // Кількість завдань в очікуванні
// Змінні для роботи з датами

var deadLineTimeDetails = {}; // Деталі дедлайну завдання

var currentTimeDetails = new Date(); // Поточна дата і час

var diff = 0; // Різниця між поточною датою і дедлайном

var iconNumberClicked = 0; // Індекс завдання, яке редагується
// ============== ОТРИМАННЯ ЕЛЕМЕНТІВ DOM ==============
// при натисканні на логотип сторінка перезавантажується

var logoReload = document.querySelector(".left-group").addEventListener("click", function () {
  window.location.reload();
});
var logoReloadFooter = document.querySelector("footer .left-group").addEventListener("click", function () {
  window.location.reload();
});
var sortByCategory = document.querySelector(".sort-category"); // Кнопка сортування по категорії

var sortByPriority = document.querySelector(".sort-priority"); // Кнопка сортування по пріоритету

var aboutTaskInput = document.querySelector(".create-gear .about-task"); // Поле опису завдання

var modalAboutTask = document.querySelector(".modal-content .about-task"); // Поле опису в модальному вікні

var clearlocalBtn = document.querySelector(".local-clear"); // Кнопка очищення localStorage

var pendingTasksSpan = document.querySelector(".pending-tasks span"); // Лічильник завдань в очікуванні

var completedTasksSpan = document.querySelector(".completed-tasks span"); // Лічильник виконаних завдань

var addTaskButton = document.querySelector(".add-tasks"); // Кнопка додавання завдання

var taskInput = document.querySelector(".task"); // Поле назви завдання

var timeInput = document.querySelector(".time"); // Поле часу

var dateInput = document.querySelector(".date"); // Поле дати

var taskList = document.querySelector(".task-list"); // Список завдань

var dayWeek = document.querySelector(".title-day-week"); // Елемент для відображення дня тижня

var monthSpan = document.querySelector(".month"); // Елемент для відображення місяця

var dateCalendar = document.querySelector(".title-date-calendar"); // Елемент для відображення дати

var tasksCreatedSpan = document.querySelector(".created-tasks span"); // Лічильник створених завдань

var searchInput = document.querySelector(".search-input"); // Поле пошуку

var searchBtn = document.querySelector(".searchBtn"); // Кнопка пошуку

var modal = document.querySelector(".modal"); // Модальне вікно редагування

var changeBtn = document.querySelector(".change-btn"); // Кнопка збереження змін

var exitIcon = document.querySelector(".close-icon"); // Іконка закриття модального вікна

var categorySelect = document.getElementById("category"); // Випадаючий список категорій

var prioritySelect = document.getElementById("priority"); // Випадаючий список пріоритетів
// ============== ІНІЦІАЛІЗАЦІЯ ЛІЧИЛЬНИКІВ ==============
// Отримуємо значення лічильників з localStorage або встановлюємо 0

createdCounter = localStorage.getItem("createdTasks") ? Number(localStorage.getItem("createdTasks")) : 0;
completedCounter = localStorage.getItem("completedCounter") ? Number(localStorage.getItem("completedCounter")) : 0;
pendingCounter = localStorage.getItem("pendingCounter") ? Number(localStorage.getItem("pendingCounter")) : 0; // Оновлюємо відображення лічильників

tasksCreatedSpan.textContent = createdCounter;
completedTasksSpan.textContent = completedCounter;
pendingTasksSpan.textContent = pendingCounter; // ============== ВІДОБРАЖЕННЯ ДАТИ І ЧАСУ ==============

var months = ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"];
var currentMonth = months[new Date().getMonth()];
monthSpan.textContent = currentMonth;
var days = ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"];
var currentDay = days[new Date().getDay()];
dayWeek.textContent = currentDay;
var date = new Date();
var currentDataDay = date.getDate();
var monthsEng = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var monthName = monthsEng[date.getMonth()];
var year = date.getFullYear();
dateCalendar.textContent = "".concat(currentDataDay, ", ").concat(monthName, " ").concat(year); // ============== ГЕНЕРАЦІЯ КАЛЕНДАРЯ ==============

/**
 * Генерує календар на поточний місяць
 */

function generateCalendar() {
  var today = new Date();
  var currentDay = today.getDate();
  var firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  var daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  var weeks = 6;
  var table = document.querySelector("table");
  var day = 1;
  var weekNumber = Math.ceil((currentDay + firstDay) / 7);

  for (var i = 0; i < weeks; i++) {
    var row = table.insertRow();
    var weekCell = row.insertCell();
    weekCell.textContent = weekNumber++;
    weekCell.classList.add("week-number");

    for (var j = 0; j < 7; j++) {
      var cell = row.insertCell();

      if (i === 0 && j < firstDay || day > daysInMonth) {
        cell.textContent = "";
      } else {
        cell.textContent = day;

        if (day === currentDay) {
          cell.classList.add("highlight");
          document.querySelectorAll(".day-header")[j].classList.add("highlight");
          weekCell.classList.add("highlight");
        }

        day++;
      }
    }
  }
}

generateCalendar(); // ============== ПОШУК ЗАВДАНЬ ==============

/**
 * Фільтрує завдання за введеним текстом
 */

function searchNames() {
  var filter = searchInput.value.toLowerCase();
  var items = document.querySelectorAll(".task-row");
  items.forEach(function (item) {
    var taskText = item.querySelector(".element-task").textContent.toLowerCase();
    item.style.display = taskText.includes(filter) ? "flex" : "none";
  });
}

searchInput.addEventListener("input", searchNames);
searchBtn.addEventListener("click", searchNames); // ============== РОБОТА З LOCALSTORAGE ==============

/**
 * Відкриває модальне вікно підтвердження очищення localStorage
 */

function openModal() {
  document.getElementById("myModal").style.display = "block";
  document.getElementById("modalOverlay").style.display = "block";
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
  document.getElementById("modalOverlay").style.display = "none";
}
/**
 * Очищає localStorage та оновлює сторінку
 */


function confirmAction() {
  localStorage.clear();
  closeModal();
  alert("localStorage очищений!");
  window.location.reload();
}

function cancelAction() {
  closeModal();
}

clearlocalBtn.addEventListener("click", openModal); // ============== ВІДНОВЛЕННЯ ДАНИХ З LOCALSTORAGE ==============

/**
 * Відновлює завдання з localStorage при завантаженні сторінки
 */

function restoreTasks() {
  var prevTasks = localStorage.getItem("mytasks");
  var prevAboutTasks = localStorage.getItem("aboutTasks");
  var prevTimes = localStorage.getItem("mytimes");
  var prevDates = localStorage.getItem("mydates");
  var prevCompleteTasks = localStorage.getItem("mycompletetasks");
  var prevCategories = localStorage.getItem("categories");
  var prevPriorities = localStorage.getItem("priorities");

  if (prevTasks) {
    tasks = JSON.parse(prevTasks);
    aboutTasks = JSON.parse(prevAboutTasks);
    times = JSON.parse(prevTimes);
    dates = JSON.parse(prevDates);
    completeTasks = JSON.parse(prevCompleteTasks);
    categories = JSON.parse(prevCategories);
    priorities = JSON.parse(prevPriorities); // Створюємо елементи для кожного завдання

    tasks.forEach(function (task, index) {
      createTaskElement(task, aboutTasks[index], times[index], dates[index], completeTasks[index], categories[index], priorities[index], index);
    });
  }
}

restoreTasks(); // ============== РОБОТА З ДАТАМИ ==============

/**
 * Розраховує різницю між датами у днях, годинах та хвилинах
 * @param {number} d - Різниця в мілісекундах
 * @returns {Array} - Масив з хвилинами, годинами та днями
 */

function distanceDates(d) {
  var minutesLeft = Math.trunc(d / (1000 * 60)) % 60;
  var hoursLeft = Math.trunc(d / (1000 * 60 * 60)) % 24;
  var daysLeft = Math.trunc(d / (1000 * 60 * 60 * 24));
  return [minutesLeft, hoursLeft, daysLeft];
} // ============== СТВОРЕННЯ ЕЛЕМЕНТІВ ЗАВДАНЬ ==============

/**
 * Створює HTML-елемент для завдання
 * @param {string} task - Назва завдання
 * @param {string} aboutTask - Опис завдання
 * @param {string} time - Час виконання
 * @param {string} date - Дата виконання
 * @param {number} isComplete - Статус завершення (0/1)
 * @param {string} category - Категорія завдання
 * @param {string} priority - Пріоритет завдання
 * @param {number} index - Індекс завдання
 */


function createTaskElement(task, aboutTask, time, date, isComplete, category, priority, index) {
  // Створення основного контейнера для завдання
  var taskRow = document.createElement("div");
  taskRow.setAttribute("class", "task-row");
  taskRow.setAttribute("data-number", index);
  taskRow.setAttribute("data-category", category);
  taskRow.setAttribute("data-priority", priority); // Створення елементів для відображення інформації

  var elementTask = document.createElement("div");
  var aboutElementTask = document.createElement("div");
  var deadline = document.createElement("div");
  var categoryBadge = document.createElement("div");
  var priorityBadge = document.createElement("div"); // Додавання класів для стилізації

  elementTask.setAttribute("class", "element-task");
  aboutElementTask.setAttribute("class", "about-element-task");
  deadline.setAttribute("class", "deadline");
  categoryBadge.setAttribute("class", "category-badge");
  priorityBadge.setAttribute("class", "priority-badge"); // Створення іконок для керування завданням

  var doneIcon = document.createElement("i");
  var editIcon = document.createElement("i");
  var closeIcon = document.createElement("i"); // Додавання класів для іконок

  doneIcon.classList = "fa-solid fa-check";
  editIcon.classList = "far fa-edit";
  closeIcon.classList = "fas fa-window-close"; // Додавання обробників подій для іконок

  doneIcon.addEventListener("click", isComplete ? backTask : doneTask);
  editIcon.addEventListener("click", showModal);
  closeIcon.addEventListener("click", deleteTask); // Заповнення текстових елементів

  elementTask.textContent = task;
  aboutElementTask.textContent = aboutTask || "";
  categoryBadge.textContent = category;
  priorityBadge.textContent = priority; // Встановлення кольору пріоритету

  switch (priority) {
    case "urgently-important":
      priorityBadge.style.color = "black";
      break;

    case "urgently-notimportant":
      priorityBadge.style.color = "gold";
      break;

    case "noturgently-important":
      priorityBadge.style.color = "#261FB3";
      break;

    case "noturgent-notimportant":
      priorityBadge.style.color = "green";
      break;
  } // Розрахунок часу до дедлайну


  if (!isComplete) {
    var data_y_m_d = date.split("-").map(Number);
    var data_h_m = time.split(":").map(Number);
    var deadlineDate = new Date(data_y_m_d[0], data_y_m_d[1] - 1, data_y_m_d[2], data_h_m[0], data_h_m[1]);
    diff = deadlineDate - currentTimeDetails;
    deadline.textContent = diff < 0 ? "Часу не залишилось" : "\u0417\u0430\u043B\u0438\u0448\u043E\u0441\u044C ".concat(distanceDates(diff)[2], " \u0434\u043D. ").concat(distanceDates(diff)[1], " \u0433\u043E\u0434. ").concat(distanceDates(diff)[0], " \u0445\u0432.");
  } else {
    // Відображення для виконаних завдань
    deadline.textContent = "ВИКОНАНО";
    doneIcon.classList = "fa-solid fa-reply";
    editIcon.style.pointerEvents = "none";
    elementTask.style.textDecoration = "line-through";
    aboutElementTask.style.textDecoration = "line-through";
  } // Створення структури елемента


  var cardContext = document.createElement("div");
  cardContext.classList.add("card-context");
  cardContext.appendChild(elementTask);
  cardContext.appendChild(aboutElementTask);
  cardContext.appendChild(deadline);
  var badges = document.createElement("div");
  badges.classList.add("badges");
  badges.appendChild(categoryBadge);
  badges.appendChild(priorityBadge);
  var icons = document.createElement("div");
  icons.classList.add("icons");
  icons.appendChild(doneIcon);
  icons.appendChild(editIcon);
  icons.appendChild(closeIcon); // Додавання всіх елементів до основного контейнера

  taskRow.appendChild(cardContext);
  taskRow.appendChild(badges);
  taskRow.appendChild(icons);
  taskList.appendChild(taskRow);
} // ============== ДОДАВАННЯ НОВОГО ЗАВДАННЯ ==============


addTaskButton.addEventListener("click", function () {
  // Отримання значень з полів вводу
  var taskValue = taskInput.value.trim();
  var aboutTaskValue = aboutTaskInput.value.trim();
  var timeValue = timeInput.value;
  var dateValue = dateInput.value; // Перевірка на заповненість полів

  if (!taskValue) {
    alert("Будь ласка, введіть назву завдання!");
    taskInput.focus();
    return;
  }

  if (!aboutTaskValue) {
    alert("Будь ласка, введіть опис завдання!");
    aboutTaskInput.focus();
    return;
  }

  if (!timeValue) {
    alert("Будь ласка, виберіть час!");
    timeInput.focus();
    return;
  }

  if (!dateValue) {
    alert("Будь ласка, виберіть дату!");
    dateInput.focus();
    return;
  } // Перевірка, чи дата не в минулому


  var currentDate = new Date();
  var taskDate = new Date(dateValue + "T" + timeValue);

  if (taskDate < currentDate) {
    alert("Дата та час завдання не можуть бути в минулому!");
    return;
  } // Отримання категорії та пріоритету


  var category = categorySelect.value;
  var priority = prioritySelect.value; // Додавання даних до масивів

  tasks.push(taskValue);
  aboutTasks.push(aboutTaskValue);
  times.push(timeValue);
  dates.push(dateValue);
  completeTasks.push(0);
  categories.push(category);
  priorities.push(priority); // Створення елемента завдання

  createTaskElement(taskValue, aboutTaskValue, timeValue, dateValue, 0, category, priority, tasks.length - 1); // Оновлення лічильників

  createdCounter++;
  tasksCreatedSpan.textContent = createdCounter; // Збереження даних у localStorage

  localStorage.setItem("createdTasks", createdCounter);
  localStorage.setItem("mytasks", JSON.stringify(tasks));
  localStorage.setItem("aboutTasks", JSON.stringify(aboutTasks));
  localStorage.setItem("mytimes", JSON.stringify(times));
  localStorage.setItem("mydates", JSON.stringify(dates));
  localStorage.setItem("mycompletetasks", JSON.stringify(completeTasks));
  localStorage.setItem("categories", JSON.stringify(categories));
  localStorage.setItem("priorities", JSON.stringify(priorities)); // Очищення полів вводу

  taskInput.value = "";
  aboutTaskInput.value = "";
  timeInput.value = "";
  dateInput.value = "";
}); // ============== РЕДАГУВАННЯ ЗАВДАННЯ ==============

/**
 * Відкриває модальне вікно для редагування завдання
 */

function showModal() {
  modal.style.display = "flex";
  document.getElementById("modalOverlay").style.display = "block";
  var n = this.closest(".task-row").dataset.number;
  var taskModal = document.querySelector(".task-modal");
  var aboutTaskModal = document.querySelector(".modal-content .about-task");
  var timeModal = document.querySelector(".time-modal");
  var dateModal = document.querySelector(".date-modal"); // Заповнення полів модального вікна даними завдання

  taskModal.value = tasks[n];
  aboutTaskModal.value = aboutTasks[n];
  timeModal.value = times[n];
  dateModal.value = dates[n];
  iconNumberClicked = n;
} // Закриття модального вікна


exitIcon.addEventListener("click", function () {
  modal.style.display = "none";
  document.getElementById("modalOverlay").style.display = "none";
});
/**
 * Зберігає зміни після редагування завдання
 */

changeBtn.addEventListener("click", function () {
  var taskModal = document.querySelector(".task-modal");
  var aboutTaskModal = document.querySelector(".modal-content .about-task");
  var timeModal = document.querySelector(".time-modal");
  var dateModal = document.querySelector(".date-modal");
  var n = iconNumberClicked;
  var taskRow = document.querySelector(".task-row[data-number=\"".concat(n, "\"]"));

  if (taskRow) {
    // Оновлення елементів DOM
    var elementTask = taskRow.querySelector(".element-task");
    var aboutElementTask = taskRow.querySelector(".about-element-task");
    var deadline = taskRow.querySelector(".deadline"); // Оновлення даних у масивах

    tasks[n] = taskModal.value;
    aboutTasks[n] = aboutTaskModal.value;
    times[n] = timeModal.value;
    dates[n] = dateModal.value; // Оновлення відображення

    elementTask.textContent = taskModal.value;
    aboutElementTask.textContent = aboutTaskModal.value; // Перерахунок часу до дедлайну

    var data_y_m_d = dateModal.value.split("-").map(Number);
    var data_h_m = timeModal.value.split(":").map(Number);
    var deadlineDate = new Date(data_y_m_d[0], data_y_m_d[1] - 1, data_y_m_d[2], data_h_m[0], data_h_m[1]);
    diff = deadlineDate - currentTimeDetails;
    deadline.textContent = diff < 0 ? "Часу не залишилось" : "\u0417\u0430\u043B\u0438\u0448\u043E\u0441\u044C ".concat(distanceDates(diff)[2], " \u0434\u043D. ").concat(distanceDates(diff)[1], " \u0433\u043E\u0434. ").concat(distanceDates(diff)[0], " \u0445\u0432."); // Оновлення localStorage

    localStorage.setItem("mytasks", JSON.stringify(tasks));
    localStorage.setItem("aboutTasks", JSON.stringify(aboutTasks));
    localStorage.setItem("mytimes", JSON.stringify(times));
    localStorage.setItem("mydates", JSON.stringify(dates)); // Оновлення лічильника завдань в очікуванні

    pendingCounter++;
    pendingTasksSpan.textContent = pendingCounter;
    localStorage.setItem("pendingCounter", pendingCounter); // Закриття модального вікна

    modal.style.display = "none";
    document.getElementById("modalOverlay").style.display = "none";
  }
}); // ============== ВИКОНАННЯ ЗАВДАННЯ ==============

/**
 * Позначає завдання як виконане
 */

function doneTask() {
  var taskRow = this.closest(".task-row");
  var n = taskRow.dataset.number; // Отримання елементів DOM

  var elementTask = taskRow.querySelector(".element-task");
  var aboutElementTask = taskRow.querySelector(".about-element-task");
  var deadline = taskRow.querySelector(".deadline");
  var doneIcon = taskRow.querySelector(".fa-check");
  var editIcon = taskRow.querySelector(".fa-edit"); // Оновлення відображення

  elementTask.style.textDecoration = "line-through";
  aboutElementTask.style.textDecoration = "line-through";
  deadline.textContent = "ВИКОНАНО";
  doneIcon.classList = "fa-solid fa-reply";
  editIcon.style.pointerEvents = "none"; // Оновлення даних

  completeTasks[n] = 1;
  localStorage.setItem("mycompletetasks", JSON.stringify(completeTasks)); // Оновлення лічильників

  completedCounter++;
  completedTasksSpan.textContent = completedCounter;
  localStorage.setItem("completedCounter", completedCounter); // Зміна обробника подій для іконки

  doneIcon.removeEventListener("click", doneTask);
  doneIcon.addEventListener("click", backTask);
} // ============== ВІДКИНЕННЯ ВИКОНАННЯ ЗАВДАННЯ ==============

/**
 * Повертає завдання до статусу "не виконане"
 */


function backTask() {
  var taskRow = this.closest(".task-row");
  var n = taskRow.dataset.number; // Отримання елементів DOM

  var elementTask = taskRow.querySelector(".element-task");
  var aboutElementTask = taskRow.querySelector(".about-element-task");
  var deadline = taskRow.querySelector(".deadline");
  var doneIcon = taskRow.querySelector(".fa-reply");
  var editIcon = taskRow.querySelector(".fa-edit"); // Оновлення відображення

  elementTask.style.textDecoration = "none";
  aboutElementTask.style.textDecoration = "none";
  editIcon.style.pointerEvents = "auto";
  doneIcon.classList = "fa-solid fa-check"; // Перерахунок часу до дедлайну

  var data_y_m_d = dates[n].split("-").map(Number);
  var data_h_m = times[n].split(":").map(Number);
  var deadlineDate = new Date(data_y_m_d[0], data_y_m_d[1] - 1, data_y_m_d[2], data_h_m[0], data_h_m[1]);
  diff = deadlineDate - currentTimeDetails;
  deadline.textContent = diff < 0 ? "Часу не залишилось" : "\u0417\u0430\u043B\u0438\u0448\u043E\u0441\u044C ".concat(distanceDates(diff)[2], " \u0434\u043D. ").concat(distanceDates(diff)[1], " \u0433\u043E\u0434. ").concat(distanceDates(diff)[0], " \u0445\u0432."); // Оновлення даних

  completeTasks[n] = 0;
  localStorage.setItem("mycompletetasks", JSON.stringify(completeTasks)); // Оновлення лічильників

  completedCounter--;
  completedTasksSpan.textContent = completedCounter;
  localStorage.setItem("completedCounter", completedCounter); // Зміна обробника подій для іконки

  doneIcon.removeEventListener("click", backTask);
  doneIcon.addEventListener("click", doneTask);
} // ============== ВИДАЛЕННЯ ЗАВДАННЯ ==============

/**
 * Видаляє завдання зі списку
 */


function deleteTask() {
  var taskRow = this.closest(".task-row");
  var n = taskRow.dataset.number; // Видалення елемента з DOM

  taskRow.remove(); // Видалення даних з масивів

  tasks.splice(n, 1);
  aboutTasks.splice(n, 1);
  times.splice(n, 1);
  dates.splice(n, 1);
  completeTasks.splice(n, 1);
  categories.splice(n, 1);
  priorities.splice(n, 1); // Оновлення лічильника створених завдань

  if (createdCounter > 0) {
    createdCounter--;
    tasksCreatedSpan.textContent = createdCounter;
    localStorage.setItem("createdTasks", createdCounter);
  } // Оновлення localStorage


  localStorage.setItem("mytasks", JSON.stringify(tasks));
  localStorage.setItem("aboutTasks", JSON.stringify(aboutTasks));
  localStorage.setItem("mytimes", JSON.stringify(times));
  localStorage.setItem("mydates", JSON.stringify(dates));
  localStorage.setItem("mycompletetasks", JSON.stringify(completeTasks));
  localStorage.setItem("categories", JSON.stringify(categories));
  localStorage.setItem("priorities", JSON.stringify(priorities)); // Оновлення індексів завдань

  document.querySelectorAll(".task-row").forEach(function (row, index) {
    row.setAttribute("data-number", index);
  });
} // ============== СОРТУВАННЯ ЗАВДАНЬ ==============
// Сортування за пріоритетом


sortByPriority.addEventListener("click", function () {
  var taskRows = Array.from(document.querySelectorAll(".task-row")); // Функція сортування

  taskRows.sort(function (a, b) {
    var priorityOrder = {
      "urgently-important": 0,
      "urgently-notimportant": 1,
      "noturgently-important": 2,
      "noturgent-notimportant": 3
    };
    var aPriority = a.getAttribute("data-priority");
    var bPriority = b.getAttribute("data-priority");
    return priorityOrder[aPriority] - priorityOrder[bPriority];
  }); // Очищення списку

  taskList.innerHTML = ""; // Додавання відсортованих завдань

  taskRows.forEach(function (row, index) {
    row.setAttribute("data-number", index);
    taskList.appendChild(row);
  });
}); // Сортування за категорією

sortByCategory.addEventListener("click", function () {
  var taskRows = Array.from(document.querySelectorAll(".task-row")); // Функція сортування

  taskRows.sort(function (a, b) {
    var aCategory = a.getAttribute("data-category");
    var bCategory = b.getAttribute("data-category");
    return aCategory.localeCompare(bCategory);
  }); // Очищення списку

  taskList.innerHTML = ""; // Додавання відсортованих завдань

  taskRows.forEach(function (row, index) {
    row.setAttribute("data-number", index);
    taskList.appendChild(row);
  });
});
//# sourceMappingURL=script.dev.js.map
