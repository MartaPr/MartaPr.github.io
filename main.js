
let data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{
    todo: [],
    completed: []
  };
 

//remove and complete icons in svg format

const removeSvg = '<svg version="1.1" x="0px" y="0px" viewBox="0 0 368.028 368.028" > <rect item-width="22" height="22" class="noFill" /> <g> <path class="fill" d="M355.394,54.176h-43.172H247.68V0H120.35v54.176h-60.81H12.633v15h48.599l33.72,298.852H276.81l33.72-298.852h44.865 L355.394,54.176L355.394,54.176z M135.348,15h97.33v39.176h-97.33V15z M263.407,353.027H108.353L76.327,69.176h44.021h127.33 h47.754L263.407,353.027z" /> <rect class="fill" x="130.632" y="111.405" width="15" height="207.811" /> <rect class="fill" x="178.371" y="111.405" width="15" height="207.811" /> <rect class="fill" x="226.111" y="111.405" width="15" height="207.811" /> </g> </svg>';

const completeSvg = '<svg version="1.1" x="0px" y="0px" viewBox="0 0 294.115 294.115"> <rect item-width="22" height="22" class="noFill" /> <g> <polygon class="fill" points="82.863,257.986 0,175.122 10.606,164.516 82.863,236.773 283.509,36.128 294.115,46.734" /> </g> </svg>';

renderTodoList();

document.getElementById('add').addEventListener('click', function(){

    let value = document.getElementById('item').value;
    if (value) {
        addItem(value);
     }
});

document.getElementById('item').addEventListener('keydown', function(e) {
 let value = this.value;
 if (e.code === 'Enter' && value) {
    addItem(value);
 }
});

function addItem(value) {
    addItemToDo(value);
    document.getElementById('item').value = '';
    data.todo.push(value);
    dataObjectUpdated();
}

function renderTodoList() {
    if (!data.todo.length && !data.completed.length) return;

    for (let i = 0; i < data.todo.length; i++) {
            let value = data.todo[i];
            addItemToDo(value);
    }

    for (let j=0; j < data.completed.length; j++) {
        let value = data.completed[j];
        addItemToDo(value, true);
    }
}

function dataObjectUpdated(){
    localStorage.setItem('todoList', JSON.stringify(data));
 }

//adds items

function addItemToDo(text, completed) {
     let list = (completed) ? document.getElementById('completed') : document.getElementById('todo');

     let item = document.createElement('li');
     item.innerText = text;

   
// removes selected item
function removeItem() {
   let item = this.parentNode.parentNode;
   let parent = item.parentNode;
   let id = parent.id;
   let value = item.innerText;

   if(id === 'todo') {
    data.todo.splice(data.todo.indexOf(value), 1);
   } else {
    data.completed.splice(data.todo.indexOf(value), 1);
   }

   dataObjectUpdated(); 

   parent.removeChild(item);


}

//completing items and adding them to another list

function completeItem() {
    let item = this.parentNode.parentNode;
    let parent = item.parentNode;
    let id = parent.id;
    let value = item.innerText;

   if(id === 'todo') {
    data.todo.splice(data.todo.indexOf(value), 1);
    data.completed.push(value);
   } else {
    data.completed.splice(data.todo.indexOf(value), 1);
    data.todo.push(value);
   }

   dataObjectUpdated();

    //check if item should be added to the completed or to the todo list
    let target = (id==='todo')?document.getElementById('completed'):document.getElementById('todo');
    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);
}

     let buttons = document.createElement('div');
     buttons.classList.add('buttons');

     let remove = document.createElement('button');
     remove.classList.add('remove');
     remove.innerHTML = removeSvg;

     let complete = document.createElement('button');
     complete.classList.add('complete');
     complete.innerHTML = completeSvg;

     //click event for removing
     remove.addEventListener('click', removeItem);

    //click event for completing the items
     complete.addEventListener('click', completeItem);

     buttons.appendChild(remove);
     buttons.appendChild(complete);
     item.appendChild(buttons);

     //new item inserted on the top of the list
     list.insertBefore(item, list.childNodes[0]);
     
} 
