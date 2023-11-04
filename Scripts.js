
var selectedTask = null
var x = document.getElementById("addNew");
var detailsArea = document.getElementById("showExisting");

function onDelete(buttonId) {
    let newJson = window.localStorage.getItem("taskStore");
    var taskArray = JSON.parse(newJson) || []
    var newTaskArray = taskArray.filter(eachTask => eachTask.id != buttonId)
    window.localStorage.setItem("taskStore", JSON.stringify(newTaskArray));
    createTable()
}

function onEdit(buttonId) {

    let newJson = window.localStorage.getItem("taskStore");
    var taskArray = JSON.parse(newJson) || []
    
    taskArray.map(eachTask => {
        if (eachTask.id == buttonId){
            console.log(eachTask)
            document.getElementById('TaskName').value = eachTask.taskName; 
            document.getElementById('Priority').value = eachTask.priority;
            document.getElementById('Progress').value = eachTask.progress;
            document.getElementById('StartDate').value = eachTask.startDate; 
            document.getElementById('EndDate').value = eachTask.endDate;
            document.getElementById('AssignedBy').value = eachTask.assignedBy;
            document.getElementById('Note').value = eachTask.note;

            selectedTask= eachTask.id;
        }
    })

    x.style.display = "block";
    

}


function onDetailsShow(buttonId) {

    let newJson = window.localStorage.getItem("taskStore");
    var taskArray = JSON.parse(newJson) || []
    
    taskArray.map(eachTask => {
        if (eachTask.id == buttonId){
            console.log(eachTask)
            document.getElementById('showTaskName').textContent = eachTask.taskName; 
            document.getElementById('showPriority').textContent = eachTask.priority;
            document.getElementById('showProgress').textContent = eachTask.progress;
            document.getElementById('showStartDate').textContent = eachTask.startDate; 
            document.getElementById('showEndDate').textContent = eachTask.endDate;
            document.getElementById('showAssignedBy').textContent = eachTask.assignedBy;
            document.getElementById('showNote').textContent = eachTask.note;

            selectedTask= eachTask.id;
        }
    })

    detailsArea.style.display = "flex"

}

function onDetailsHide(){
    detailsArea.style.display = "none"
}

var hideDetails = document.getElementById("hideDetails");
hideDetails.onclick = onDetailsHide;



function createTable() { 
    let newJson = window.localStorage.getItem("taskStore");
    var newTaskArray = JSON.parse(newJson)
    var countRows = 0;


    var table = document.getElementById("namesTable"); 
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    newTaskArray.sort(function (a, b) {
        return a.priority - b.priority || new Date(a.endDate) - new Date(b.endDate);
    });

    newTaskArray.map(eachTask => {
        const date1 = new Date();
        const date2 = new Date(eachTask.endDate);
        const diffTime = date2 - date1;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        var row = table.insertRow(); 

        var cell1 = row.insertCell(0); var cell2 = row.insertCell(1); var cell3 = row.insertCell(2);

        var editButton = document.createElement("button");
        editButton.innerHTML = '<img src="./Images/edit.png" width="10" height="10" alt="Edit"/>';
        editButton.id = eachTask.id;
        editButton.onclick = function() {
            onEdit(eachTask.id);
        };

        var detailsButton = document.createElement("button");
        detailsButton.innerHTML = '<img src="./Images/details2.png" width="10" height="10" alt="Details"/>';
        detailsButton.id = eachTask.id;
        detailsButton.onclick = function() {
            onDetailsShow(eachTask.id);
        };

        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<img src="./Images/cross.jpg" width="10" height="10" alt="Delete"/>';
        deleteButton.id = eachTask.id;
        deleteButton.onclick = function() {
            onDelete(eachTask.id);
        };

        cell1.innerHTML = eachTask.taskName; 
        cell2.innerHTML = diffDays; 
        cell3.appendChild(editButton);
        cell3.appendChild(detailsButton);

        cell3.appendChild(deleteButton);

        countRows++; 


    })
    
    
    document.getElementById("counter").value = countRows; 
}



function showAddSection() { 

    const changeText = document.querySelector("#showAddButton");

    
    if (x.style.display === "none") {
        x.style.display = "block";
        changeText.textContent = "Hide";
    } else {
        x.style.display = "none";
        changeText.textContent = "Add New";
    }
}
var showButton = document.getElementById("showAddButton");
showButton.onclick = showAddSection;




function dataStore() { 
    
    var TaskName = document.getElementById('TaskName').value; 
    var Priority = document.getElementById('Priority').value;
    var Progress = document.getElementById('Progress').value;
    var StartDate = document.getElementById('StartDate').value; 
    var EndDate = document.getElementById('EndDate').value;
    var AssignedBy = document.getElementById('AssignedBy').value;
    var Note = document.getElementById('Note').value;
    

    let newJson = window.localStorage.getItem("taskStore");
    var newTaskArray = JSON.parse(newJson) || []

    if (selectedTask){
        objIndex = newTaskArray.findIndex((obj => obj.id == selectedTask));

        newTaskArray[objIndex].taskName = TaskName;
        newTaskArray[objIndex].priority = Priority;
        newTaskArray[objIndex].progress = Progress;
        newTaskArray[objIndex].startDate = StartDate;
        newTaskArray[objIndex].endDate = EndDate;
        newTaskArray[objIndex].assignedBy = AssignedBy;
        newTaskArray[objIndex].note = Note;

        
    } else {
        const newTask = {
            taskName : TaskName,
            priority : Priority,
            progress : Progress,
            startDate : StartDate,
            endDate : EndDate,
            id: Math.random().toString(16).slice(2),
            assignedBy: AssignedBy,
            note: Note
        }

        newTaskArray.push(newTask)
    }
      
    window.localStorage.setItem("taskStore", JSON.stringify(newTaskArray));
    showAddSection() 
    createTable()
    onCancel()

}
var testButton = document.getElementById("testButton");
testButton.onclick = dataStore;


function onCancel() {

    document.getElementById('TaskName').value = ""; 
    document.getElementById('Priority').value = 1;
    document.getElementById('Progress').value = 0;
    document.getElementById('StartDate').value = '2023-01-01'; 
    document.getElementById('EndDate').value = '2024-01-01';
    document.getElementById('AssignedBy').value = "";
    document.getElementById('Note').value = "";

    selectedTask= null;
    x.style.display = "none";

}

var cancelButton = document.getElementById("cancelButton");
cancelButton.onclick = onCancel;




createTable()