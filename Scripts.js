function addName() { 
    var name = document.getElementById('Name').value; 
    var age = document.getElementById('Age').value;
    var counter = document.getElementById('counter').value;
    
    var table = document.getElementById("namesTable"); 
    var row = table.insertRow(); 
    var splitName = name.split(" ");
    var countRows = counter;

    var cell1 = row.insertCell(0); var cell2 = row.insertCell(1); var cell3 = row.insertCell(2);

    cell1.innerHTML = splitName[0]; 
    cell2.innerHTML = splitName[1]; 
    cell3.innerHTML = age;

    countRows++; 
    document.getElementById("counter").value = countRows; 
}
var addButton = document.getElementById("myButton");
addButton.onclick = addName;


function createTable() { 
    let newJson = window.localStorage.getItem("taskStore");
    var newTaskArray = JSON.parse(newJson)

    newTaskArray.map(eachTask => {

        const date1 = new Date(eachTask.startDate);
        const date2 = new Date(eachTask.endDate);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

        var table = document.getElementById("namesTable"); 
        var row = table.insertRow(); 

        var cell1 = row.insertCell(0); var cell2 = row.insertCell(1); var cell3 = row.insertCell(2);

        cell1.innerHTML = eachTask.taskName; 
        cell2.innerHTML = diffDays; 
        // cell3.innerHTML = ;


    })
    
    
    countRows++; 
    document.getElementById("counter").value = countRows; 
}
var addButton = document.getElementById("myButton");
addButton.onclick = addName;



function showAddSection() { 

    const changeText = document.querySelector("#showAddButton");

    var x = document.getElementById("addNew");
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

    // const date1 = new Date(StartDate);
    // const date2 = new Date(EndDate);

    // console.log(EndDate)
    // const diffTime = Math.abs(date2 - date1);
    // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    // console.log(diffDays)

    let newJson = window.localStorage.getItem("taskStore");
    var newTaskArray = JSON.parse(newJson) || []
    // alert(newObject.count)
    


    const newTask = {
        taskName : TaskName,
        priority : Priority,
        progress : Progress,
        startDate : StartDate,
        endDate : EndDate,
    }

    newTaskArray.push(newTask)
      
    window.localStorage.setItem("taskStore", JSON.stringify(newTaskArray));
    showAddSection() 
    createTable()

}
var testButton = document.getElementById("testButton");
testButton.onclick = dataStore;


createTable()