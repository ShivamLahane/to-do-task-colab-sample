function TaskElement(id, taskText, show)
{
    this.id =  id;
    this.taskText = taskText;
    this.show = show;
}

function printUlElements()
{
    let list = getTasks();
    let li;
    for (let i = 0; i < list.length; i++)
    {
        if (list[i].show == true)
        {
            li = document.createElement("li");
            li.id = list[i].id;
            let text = list[i].taskText;
            li.appendChild(document.createTextNode(text));
            let span = document.createElement("span");
            span.className = "close";
            span.innerHTML = "&times;";
            li.appendChild(span);
            ul.appendChild(li);
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

function setTasks(array)
{
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
}

function createId()
{
    if (localStorage.getItem("counter"))
    {
        count = localStorage.getItem("counter");
        localStorage.setItem("counter", ++count);
        return count;
    }
    localStorage.setItem("counter", 0);
    return 0;
}

function addValueToListOnEnter(e)
{
    // getting and trimming text-area value from DOM
    let textArea = document.getElementById("txt");
    let textString = textArea.value;
    let trimmedString = textString.trim();

    if (e.key === 'Enter' && trimmedString != "") 
    {
        // fetching taskList from database
        var array = getTasks();

        // create new task element
        var task = new TaskElement(createId(), trimmedString, true);

        if (array.length > 0)
        {
            array.unshift(task);
            setTasks(array);
        }
        else
        {
            array = [];
            array.push(task);
            setTasks(array);
        }

        // create DOM element li to display, append task string to it and assigning same id as task element in databse
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(textArea.value));
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
    }
}

// creating and storing date object
var currentdate = new Date();

// getting and storing ul element in variable
var ul = document.getElementById("list");

document.querySelector('#txt').addEventListener('keypress', function (e) { addValueToListOnEnter(e); });

// printing all elements from task list when page refreshes or loads
printUlElements();

var closebtns = document.getElementsByClassName("close");
for (let i = 0; i < closebtns.length; i++) 
{
    closebtns[i].addEventListener("click", function(e) { deleteTask(e); });
}

