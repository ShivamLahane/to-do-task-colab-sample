function TaskElement(id, taskText, show, striked)
{
    this.id =  id;
    this.taskText = taskText;
    this.show = show;
    this.strike = striked;
    this.time = new Date();
}

function printLastUpdate()
{
    document.getElementById("last-update-time").innerHTML = "Last Update : " + new Date();
}

function updateCount()
{
    let countLabel = document.getElementById("count");
    countLabel.innerHTML = "Count : " + count;
}

function printUlElements() 
{
    let list = getTasks();
    let li;
    count = 0;
    for (let i = 0; i < list.length; i++) {
        if (list[i].show == true) {
            li = document.createElement("li");
            li.id = list[i].id;
            let text = list[i].taskText;
            let time = document.createElement("p");
            time.innerHTML = moment(list[i].time).fromNow();
            li.addEventListener('click', function (e) {
                addOrRemoveStrike(e);
            });
            li.appendChild(document.createTextNode(text));
            li.appendChild(time);
            let span = document.createElement("span");
            span.className = "close";
            span.innerHTML = "&times;";
            li.appendChild(span);
            ul.appendChild(li);
            count++;
        }
    }
}


function getTasks() 
{
    if (localStorage.getItem("taskList"))
    {
        return JSON.parse(localStorage.getItem("taskList")) || [];
    }
    let array = [];
    setTasks(array);
}

function setTasks(array) {
    localStorage.setItem("taskList", JSON.stringify(array));
}

function deleteTask(e)
{
    let parent = e.currentTarget.parentElement;
    let id = parent.id;
    console.log(id);
    let array = getTasks();
    let len = array.length - 1;
    array[len - (len - id)].show = false;
    setTasks(array);
    parent.style.display = "none";
    count--;
    updateCount();
    printLastUpdate();
}

function deleteAll()
{
    
}

function createId() 
{
    if (localStorage.getItem("counter")) {
        count = localStorage.getItem("counter");
        localStorage.setItem("counter", ++count);
        return count;
    }
    localStorage.setItem("counter", 0);
    return 0;
}


function addOrRemoveStrike(e) 
{
    printLastUpdate();
    if (e.currentTarget.style.textDecoration == 'line-through') {
        e.currentTarget.style.textDecoration = 'none';
        return
    }
    e.currentTarget.style.textDecoration = 'line-through';
}

function addValueToListOnEnter(e) 
{
    // getting and trimming text-area value from DOM
    let textString = textArea.value;
    let trimmedString = textString.trim();

    if (e.key === 'Enter' && trimmedString != "")
    {
        addToList();
    }
}
function addToList()
{
            // fetching taskList from database
            var array = getTasks();

            // create new task element
            var task = new TaskElement(createId(), textArea.value, true, false);
    
            if (array.length > 0) {
                array.unshift(task);
                setTasks(array);
            }
            else {
                array = [];
                array.push(task);
                setTasks(array);
            }
    
            // create DOM element li to display, append task string to it and assigning same id as task element in databse
            let li = document.createElement("li");
    
            li.appendChild(document.createTextNode(textArea.value));
            li.addEventListener('click', function (e) {
                addOrRemoveStrike(e);
            });
            li.id = task.id;
    
            // creating close button and add event listener to it
            var span = document.createElement("span");
            span.className = "close";
            span.innerHTML = "&times;";
            span.addEventListener("click", function (e) { deleteTask(e) });
    
            // adding span to li element
            li.appendChild(span);
    
            // adding li to ul
            ul.prepend(li);
    
            // making text area value null again
            textArea.value = null;
            count++;
            updateCount();
            printLastUpdate();
}

var count;

// textArea var
var textArea = document.getElementById("txt");

// creating and storing date object
var currentdate = new Date();

// getting and storing ul element in variable
var ul = document.getElementById("list");

document.querySelector('#txt').addEventListener('keypress', function (e) { addValueToListOnEnter(e); });

// printing all elements from task list and update count when page refreshes or loads
printUlElements();
updateCount();

var closebtns = document.getElementsByClassName("close");
document.getElementById("add").addEventListener("click", addToList );
document.getElementById("delete-all").addEventListener("click", deleteAll );

for (let i = 0; i < closebtns.length; i++) 
{
    closebtns[i].addEventListener("click", function (e) { deleteTask(e); });
}
