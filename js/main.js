// Define ui elements
const taskForm = document.querySelector('#add_task_btn');
const newTaskAdd = document.querySelector('#new_task');
const taskFilter = document.querySelector('#filter_task');
const tasklist  = document.querySelector('#add_task_list');
const clearBtn  = document.querySelector('#clear_task_btn');


// Define addeventlistener 
taskForm.addEventListener('click', addTaskList);
tasklist.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearAll);
taskFilter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTask);


//Define add function
function  addTaskList(e){
    if(newTaskAdd.value === ''){
        alert('Add something');
        
    }else{
        const addli = document.createElement('li');
        addli.appendChild(document.createTextNode(newTaskAdd.value));
        tasklist.appendChild(addli);

        const link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = ' &nbsp; &nbsp; X';
        link.style.color = 'red';
        addli.appendChild(link);
        
        dataStorage(newTaskAdd.value);
        newTaskAdd.value = '';
    }
    e.preventDefualt();
}

//Define remove function
function removeItem(e){
    if(e.target.hasAttribute('href')) {
       if(confirm('Do you want to remove this?')){
           let ele = e.target.parentElement;
           ele.remove();

           removeFromls(ele);
       }
       
    }
}

//Define clear function
function clearAll(e){
    // tasklist.innerHTML = '';                     // remove slowly
    while(tasklist.firstChild){                      // for fast remove
        tasklist.removeChild(tasklist.firstChild);
    }
    localStorage.clear();
}

//Define filter function
function filterTask(e){
    const filerVal = e.target.value.toLowerCase();
    document.querySelectorAll('li').forEach( item => {
       const task = item.firstChild.textContent;

       if(task.toLowerCase().indexOf(filerVal) != -1){
           item.style.display = 'block';
       }else{
        item.style.display = 'none';
       }
    });
}

//localstorage function
function dataStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// contentload function
function getTask(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [ ];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(task => {
        const addli = document.createElement('li');
        addli.appendChild(document.createTextNode(task));
        tasklist.appendChild(addli);

        const link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = ' &nbsp; &nbsp; X';
        link.style.color = 'red';
        addli.appendChild(link);

    })
}

// removeFromLocalStroe function
function removeFromls(taskitem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [ ];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    let liTask = taskitem;
    liTask.removeChild(liTask.lastChild);
    
    tasks.forEach((item, index) =>{
        if(liTask.textContent.trim() === item){
            tasks.splice(index, 1);
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
}