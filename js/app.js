const clear = document.querySelector('.clear');
const date = document.getElementById('date');
const options = {weekday: "long", month: "short", day: "numeric"};
var dateTime = new Date().toLocaleDateString("en-US", options);
date.innerHTML = dateTime;

const list = document.getElementById('list');
const input = document.getElementById('input');


const CHECK = 'fa-check-circle';
const UN_CHECK = 'fa-circle-thin';
const LINK_THROUGH = 'lineThrough';

let LIST;
let Id ; 
let data = localStorage.getItem('ToDo');
if(data){
    LIST = JSON.parse(data);
    loadToDo(LIST);
    Id = LIST.length;
}else{
   
    LIST = [];
    Id = 0
}

function loadToDo( array ){

    array.forEach(function(item) {
        addToDo(item.name,item.id,item.done,item.trash);
    });
}

function addToDo(toDo,id,done,trash){

    if(trash){ return; }
    let DONE = done ? CHECK : UN_CHECK; 
    let LINK = done ? LINK_THROUGH : '';

    let text = `<li class="item">
                    <i class="fa ${DONE} co" id=${id} job="complete" aria-hidden="true"></i>
                    <p class="text ${LINK}">${toDo}</p>
                    <i class="fa fa-trash-o delete" id=${id} job="delete" aria-hidden="true"></i>
                </li>`;
    const position = "beforeend"
    list.insertAdjacentHTML(position,text);
}

input.addEventListener('keyup',function(event){
    let newToDo = input.value;
    if(event.keyCode == 13){
        if(input.value.length > 0){
           addToDo(newToDo,Id,false,false);
            LIST.push({
               name: newToDo,
               id: Id,
               done:false,
               trash: false
            })
            localStorage.setItem('ToDo',JSON.stringify(LIST));
            Id++;
            input.value = '';
        }
        else{
            console.log(input.value.length)
            alert('this is empty!')
        }
    } 
});

function completeToDo(element){

    element.classList.toggle(CHECK);
    element.classList.toggle(UN_CHECK);
    element.parentNode.querySelector('.text').classList.toggle(LINK_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;
    localStorage.setItem('ToDo',JSON.stringify(LIST));
}

function removeToDO(element){

    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
    localStorage.setItem('ToDo',JSON.stringify(LIST));
}

list.addEventListener('click', function(event){

    let element = event.target;
    let completeJob = event.target.attributes.job.value;

    if(completeJob == "complete"){
        completeToDo(element);
    }else{
        removeToDO(element);
    }
})

clear.addEventListener('click', function (){
    localStorage.clear();
    location.reload();
})

