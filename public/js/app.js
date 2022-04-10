let todoList = [];

//Late init
let addTodo, 
    addTodoButton, 
    todoListContainer,
    listWrapper, 
    todoCheck, 
    todoListLabel 

const cudTodoXhr = new XMLHttpRequest();
cudTodoXhr.addEventListener("load", e => {
    try{
        if(cudTodoXhr.status == 200){
            readTodoXhr.open('get', './app/todo');
            readTodoXhr.send();        
        } else {
            alert("해당 요청을 진행하지 못하였습니다.");
        }
    } catch (err) {
        console.log(err)
        console.log("response : \n" + cudTodoXhr.response);
    }
})

const readTodoXhr = new XMLHttpRequest();
readTodoXhr.addEventListener("load", e => {
    if(readTodoXhr.status == 200){
        todoList = JSON.parse(readTodoXhr.response);
        render();
    } else {
        alert("TODO 목록을 불러오지 못하였습니다.");
    }
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
            cudTodoXhr.open('put', './app/todo/' + listItem.titleId);
            cudTodoXhr.setRequestHeader("Content-Type", "application/json");
            cudTodoXhr.send(JSON.stringify({success: todoCheck.checked}));
        })
        todoListLabel.innerText = listItem.title;
        todoDeleteButton.className = "delete-btn";
        todoDeleteButton.innerText = "X";
        todoDeleteButton.addEventListener("click", e => {
            console.log("a");
            cudTodoXhr.open('delete', './app/todo/'+listItem.titleId);
            cudTodoXhr.send();
        })
    
        listWrapper.appendChild(todoCheck);
        listWrapper.appendChild(todoListLabel);
        listWrapper.appendChild(todoDeleteButton);
    
        todoListContainer.appendChild(listWrapper);
    });
}

window.addEventListener("load", e => {

    readTodoXhr.open('get', './app/todo');
    readTodoXhr.send();

    testBtn = document.getElementById('test-btn');
    container = document.getElementById('container');
    
    addTitle = document.getElementById('add-title');
    addTitleButton = document.getElementById('add-title-btn');
    
    todoListContainer = document.getElementById('todo-list-container');
    
    addTitleButton.addEventListener("click", e => {
        cudTodoXhr.open('post', './app/todo');
        cudTodoXhr.setRequestHeader("Content-Type", "application/json");
        cudTodoXhr.send(JSON.stringify({
            title: addTitle.value
        }))
    });

});