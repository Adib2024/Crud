//validate form inputs before submit
function validateForm(){
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var age = document.getElementById("age").value;

    if(name == ""){
        alert("Name is required");
        return false;
    }

    if(email ==""){
        alert("Email is required");
        return false;
    }
    else if (!email.includes("@")){
        alert("Invalid email address");
        return false;
    }

    if(age ==""){
        alert("Age is required");
        return false;
    }
    else if(age < 1){
        alert("Age must be positive");
        return false;
    }

    return true;
}

//to show data
function showData(){
    var peopleList;
    if(localStorage.getItem("peopleList") ==null){
        peopleList=[];
    }
    else{
        peopleList=JSON.parse(localStorage.getItem("peopleList"));
    }

    var html = "";

    peopleList.forEach(function (element, index) {
        var date = new Date(element.timestamp);
        var formattedDate = date.toLocaleString();

        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.email + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + formattedDate + "</td>";
        html += '<td><button onclick="deleteData(' + index +')" class="btn btn-danger">Delete</button><button onclick="updateData(' + index +')" class="btn btn-warning m-2">Edit</button></td>';
        html += "</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

// Load all data when document or page loaded
window.onload = showData;

//function to add data
function AddData(){
    //if form is available
    if(validateForm()){
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var age = document.getElementById("age").value;

        var timestamp = new Date().getTime(); // Adding timestamp

        var peopleList;
        if(localStorage.getItem("peopleList") == null){
            peopleList=[];
        }
        else{
            peopleList=JSON.parse(localStorage.getItem("peopleList"));
        }

        peopleList.push({
            name : name,
            email : email,
            age : age,
            timestamp: timestamp // Adding timestamp
        });

        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData();
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("age").value = "";
    }
}

//to delete
function deleteData(index){
    var peopleList;
    if(localStorage.getItem("peopleList") ==null){
        peopleList=[];
    }
    else{
        peopleList=JSON.parse(localStorage.getItem("peopleList"));
    }
    
    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
}

//to update
function updateData(index){
    document.getElementById("Submit").style.display= "none";
    document.getElementById("Update").style.display= "block";

    var peopleList;
    if(localStorage.getItem("peopleList") ==null){
        peopleList=[];
    }
    else{
        peopleList=JSON.parse(localStorage.getItem("peopleList"));
    }
    
    document.getElementById("name").value = peopleList[index].name;
    document.getElementById("email").value = peopleList[index].email;
    document.getElementById("age").value = peopleList[index].age;

    document.querySelector('#Update').onclick = function(){
        if(validateForm() ==true){
            peopleList[index].name = document.getElementById("name").value;
            peopleList[index].email = document.getElementById("email").value;
            peopleList[index].age = document.getElementById("age").value;

            localStorage.setItem("peopleList", JSON.stringify(peopleList));

            showData();

            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("age").value = "";
    
            //Update button will hide and Submit button will show for update the data
            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";
        }

    }
}

//to filter data by date
function filterByDate() {
    var selectedDate = document.getElementById("dateFilter").value;
    var filteredPeopleList = JSON.parse(localStorage.getItem("peopleList")).filter(function(person) {
        return person.date === selectedDate;
    });
    
    var html = "";

    filteredPeopleList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.email + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.date + "</td>";
        html += '<td><button onclick="deleteData(' + index +')" class="btn btn-danger">Delete</button><button onclick="updateData(' + index +')" class="btn btn-warning m-2">Edit</button></td>';
        html += "</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}





function filterByAge() {
    var selectedAgeRange = document.getElementById("ageFilter").value;
    var peopleList = JSON.parse(localStorage.getItem("peopleList"));
    var filteredPeopleList;

    switch (selectedAgeRange) {
        case "0-20":
            filteredPeopleList = peopleList.filter(function(person) {
                return person.age >= 0 && person.age <= 20;
            });
            break;
        case "21-40":
            filteredPeopleList = peopleList.filter(function(person) {
                return person.age >= 21 && person.age <= 40;
            });
            break;
        case "41-60":
            filteredPeopleList = peopleList.filter(function(person) {
                return person.age >= 41 && person.age <= 60;
            });
            break;
        case "61+":
            filteredPeopleList = peopleList.filter(function(person) {
                return person.age >= 61;
            });
            break;
        case "all":
        default:
            filteredPeopleList = peopleList;
            break;
    }

    displayFilteredData(filteredPeopleList);
}

function displayFilteredData(data) {
    var html = "";

    data.forEach(function (element, index) {
        var date = new Date(element.timestamp);
        var formattedDate = date.toLocaleString();

        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.email + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + formattedDate + "</td>";
        html += '<td><button onclick="deleteData(' + index +')" class="btn btn-danger">Delete</button><button onclick="updateData(' + index +')" class="btn btn-warning m-2">Edit</button></td>';
        html += "</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}
