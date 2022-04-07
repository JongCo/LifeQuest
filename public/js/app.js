let todoList = [];

//Late init
let addTodo, 
    addTodoButton, 
    todoListContainer,
    listWrapper, 
    todoCheck, 
    todoListLabel 

const crudTodoXhr = new XMLHttpRequest();
crudTodoXhr.addEventListener("load", e => {
    try{
        todoList = JSON.parse(crudTodoXhr.response);
        render();
    } catch (err) {
        console.log(err)
        console.log("response : \n" + crudTodoXhr.response);
    }
})

const initTodoXhr = new XMLHttpRequest();
initTodoXhr.addEventListener("load", e => {
    todoList = JSON.parse(initTodoXhr.response);
    render();
});

function render(){
    while( todoListContainer.hasChildNodes() ){
        todoListContainer.removeChild( todoListContainer.firstChild );
    }
    todoList.todoList.forEach( listItem => {
        const listWrapper = document.createElement('div');
        const todoCheck = document.createElement('input');
        const todoListLabel = document.createElement('label');
        const todoDeleteButton = document.createElement('button');
    
        listWrapper.className = "list-wrapper";
        todoCheck.setAttribute("type", "checkbox");
        if( listItem.success == "true"){
            todoCheck.checked = true;
        } else {
            todoCheck.checked = false;
        }
        todoCheck.addEventListener("click", e => {
            console.log("asdf");
            crudTodoXhr.open('put', './app/todo/' + listItem.titleId);
            crudTodoXhr.setRequestHeader("Content-Type", "application/json");
            crudTodoXhr.send(JSON.stringify({success: todoCheck.checked}));
        })
        todoListLabel.innerText = listItem.title;
        todoDeleteButton.className = "delete-btn";
        todoDeleteButton.innerText = "X";
        todoDeleteButton.addEventListener("click", e => {
            console.log("a");
            crudTodoXhr.open('delete', './app/todo/'+listItem.titleId);
            crudTodoXhr.send();
        })
    
        listWrapper.appendChild(todoCheck);
        listWrapper.appendChild(todoListLabel);
        listWrapper.appendChild(todoDeleteButton);
    
        todoListContainer.appendChild(listWrapper);
    });
}

window.addEventListener("load", e => {

    initTodoXhr.open('get', './app/todo');
    initTodoXhr.send();

    testBtn = document.getElementById('test-btn');
    container = document.getElementById('container');
    
    addTitle = document.getElementById('add-title');
    addTitleButton = document.getElementById('add-title-btn');
    
    todoListContainer = document.getElementById('todo-list-container');
    
    addTitleButton.addEventListener("click", e => {
        crudTodoXhr.open('post', './app/todo');
        crudTodoXhr.setRequestHeader("Content-Type", "application/json");
        crudTodoXhr.send(JSON.stringify({
            title: addTitle.value
        }))
    });

    
    
    //버튼을 누르면 todoLists에 따라 동적으로 DOM을 생성하고
    //todo-list-container를 생성하여 내용을 채운다.
    //나중에는 로드시 자동으로 생성한다.
    testBtn.addEventListener('click', e => {
            
 
    });
});