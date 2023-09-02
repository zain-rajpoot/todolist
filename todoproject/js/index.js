showtask();
let addtaskinput = document.getElementById("addtaskinput");
let addtaskbtn = document.getElementById("addtaskbtn");
let resetBtn = document.getElementById("resetBtn");

addtaskbtn.addEventListener("click", function () {
  addtaskinputval = addtaskinput.value;
  if (addtaskinputval.trim() != 0) {
    let myTasks = localStorage.getItem("localtask");
    if (myTasks == null) {
      taskObj = [];
    } else {
      taskObj = JSON.parse(myTasks);
    }
    taskObj.unshift({ task_name: addtaskinputval, completeStatus: false });
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    addtaskinput.value = "";
    addtaskinput.focus();
  } else {
    alert("Please Add some text in an input");
    addtaskinput.focus();
  }
  showtask();
});

function addTaskOnEnterBtn(event) {
  if (event.key === "Enter") {
    if (addtaskbtn.style.display != "none") {
      addtaskinputval = addtaskinput.value;
      if (addtaskinputval.trim() != 0) {
        let myTasks = localStorage.getItem("localtask");
        if (myTasks == null) {
          taskObj = [];
        } else {
          taskObj = JSON.parse(myTasks);
        }
        taskObj.unshift({ task_name: addtaskinputval, completeStatus: false });
        localStorage.setItem("localtask", JSON.stringify(taskObj));
        addtaskinput.value = "";
        addtaskinput.focus();
      } else {
        alert("Please Add some text in an input");
        addtaskinput.focus();
      }
      showtask();
    }
  }
}
// showtask
function showtask() {
  let myTasks = localStorage.getItem("localtask");
  if (myTasks == null) {
    taskObj = [];
  } else {
    taskObj = JSON.parse(myTasks);
  }
  let html = "";
  let icon_color = "currentColor";
  let addedtasklist = document.getElementById("addedtasklist");
  taskObj.forEach((item, index) => {
    const completedClass = item.completeStatus ? "completed" : "";

    html += `<li id="ZIANRANA" class="${completedClass}">
    <div class="dflex">
    <label class="checkbox-container">
    <input type="checkbox" class="checkbox-input" onclick="toggleTaskStatus(${index})" ${
      item.completeStatus ? "checked" : ""
    }>
    <span class="custom-checkbox"></span>
    </label>
    <span>${item.task_name}</span>
    </div>
    <div>
    <button class="transparent_btn" onclick="edittask(${index})"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="${icon_color}" class="bi bi-pencil-square" viewBox="0 0 16 16">
    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
    </svg></button>
    <button class="transparent_btn" onclick="deleteitem(${index})"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="${icon_color}" class="bi bi-trash3" viewBox="0 0 16 16">
    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
    </svg></button>
    </div>
    </li><hr/>`;
  });
  addedtasklist.innerHTML = html;

  const divElement = document.getElementById("addedtasklist");
  const subChildren = divElement.children; // Use children to get the child elements
  const showResult = subChildren.length; // No need to slice or parse

  if (isNaN(showResult) || showResult === 0) {
    document.getElementById("my_tasks_count").innerText = 0;
    document.getElementById("task_label").style.display = "block";
    document.getElementById("task_label").style.padding = "50px 0px";
    document.getElementById("addedTaskMain").style.display = "none";
    document.getElementById("resetBtn").style.display = "none";
  } else {
    document.getElementById("resetBtn").style.display = "block";
    document.getElementById("addedTaskMain").style.display = "block";
    document.getElementById("task_label").style.display = "none";
    document.getElementById("my_tasks_count").innerText = showResult / 2;
  }
}
// COMPLETED STATUS TASK
function toggleTaskStatus(index) {
  let myTasks = localStorage.getItem("localtask");
  let taskObj = JSON.parse(myTasks);
  taskObj[index].completeStatus = !taskObj[index].completeStatus;
  localStorage.setItem("localtask", JSON.stringify(taskObj));
  showtask();
}

// edit task
function edittask(index) {
  let saveindex = document.getElementById("saveindex");
  let addtaskbtn = document.getElementById("addtaskbtn");
  let addtaskinput = document.getElementById("addtaskinput");
  let savetaskbtn = document.getElementById("savetaskbtn");
  saveindex.value = index;
  addtaskinput.focus();
  let myTasks = localStorage.getItem("localtask");
  let taskObj = JSON.parse(myTasks);
  addtaskinput.value = taskObj[index]["task_name"];
  addtaskbtn.style.display = "none";
  savetaskbtn.style.display = "block";
}

function editOnEnterBtn(event) {
  if (event.key === "Enter") {
    if (addtaskinput.value.trim() != "") {
      addtaskinput.focus();
      let addtaskbtn = document.getElementById("addtaskbtn");
      let myTasks = localStorage.getItem("localtask");
      let taskObj = JSON.parse(myTasks);
      let saveindex = document.getElementById("saveindex").value;

      for (keys in taskObj[saveindex]) {
        if (keys == "task_name") {
          taskObj[saveindex].task_name = addtaskinput.value;
        }
      }
      savetaskbtn.style.display = "none";
      addtaskbtn.style.display = "block";
      localStorage.setItem("localtask", JSON.stringify(taskObj));
      addtaskinput.value = "";
      showtask();
    }
  }
}
// save task
let savetaskbtn = document.getElementById("savetaskbtn");
savetaskbtn.addEventListener("click", function () {
  let addtaskbtn = document.getElementById("addtaskbtn");
  let myTasks = localStorage.getItem("localtask");
  let taskObj = JSON.parse(myTasks);
  let saveindex = document.getElementById("saveindex").value;

  for (keys in taskObj[saveindex]) {
    if (keys == "task_name") {
      taskObj[saveindex].task_name = addtaskinput.value;
    }
  }
  savetaskbtn.style.display = "none";
  addtaskbtn.style.display = "block";
  localStorage.setItem("localtask", JSON.stringify(taskObj));
  addtaskinput.value = "";
  showtask();
});
// delete item
function deleteitem(index) {
  let myTasks = localStorage.getItem("localtask");
  let taskObj = JSON.parse(myTasks);
  taskObj.splice(index, 1);
  localStorage.setItem("localtask", JSON.stringify(taskObj));
  showtask();
}

// RESET TASK DATA
resetBtn.addEventListener("click", () => {
  if (confirm("Are you sure\n you want to delete all tasks")) {
    localStorage.clear();
    showtask();
  }
});

// DARK MOODE
const toggleDarkMode = document.getElementById("toggleDarkMode");
toggleDarkMode.addEventListener("click", DarkMode);
function DarkMode() {
  const body = document.body;
  body.classList.toggle("nightMood");
  const isDarkMode = body.classList.contains("nightMood");
  localStorage.setItem("darkMode", isDarkMode);
}
const storedDarkMode = localStorage.getItem("darkMode");
if (storedDarkMode === "true") {
  document.body.classList.add("nightMood");
}

// let toggleDarkMode = document.getElementById("toggleDarkMode");
// toggleDarkMode.addEventListener("click", () => {
//   document.body.classList.toggle("nightMood");
// });
