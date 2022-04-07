const xhr = new XMLHttpRequest();

window.addEventListener("load", e => {

    const testBtn = document.getElementById('test-btn');

    const container = document.getElementById('container');

    const todoListsWrapper = [
    document.getElementById('todo-list-container1')
    ];

    //여기서는 배열 형태의 json을 선언하였으나
    //실제로는 AJAX로 DB정보를 받는다.

    let todoListsP = [
    {
        titleId: 1,
        title: "test1",
        lists: [{
        listId : 1,
        listName : "this is test list",
        success : "false",
        }, {
        listId: 6,
        listName: "another test list",
        success: "true"
        }],
        success: "false",
    },{
        titleId: 4,
        title: "test4",
        lists: [{
        listId : 5,
        listName : "washwash",
        success : "false",
        }, {
        listId: 8,
        listName: "cleaning the room",
        success: "true"
        }],
        success: "false",
    }
    ]


    //버튼을 누르면 todoLists에 따라 동적으로 DOM을 생성하고
    //todo-list-container를 생성하여 내용을 채운다.
    //나중에는 로드시 자동으로 생성한다.
    testBtn.addEventListener('click', e => {
        todoListsP.forEach( item => {
            
            item.todoContainer = document.createElement('div');
            // const todoContainer = document.createElement('div');
            const todoTitle = document.createElement('h3');
            const todoListContainer = document.createElement('div');
            const todoBottom = document.createElement('div');
            const addListText = document.createElement('input');
            const addListButton = document.createElement('button');
            
            item.todoContainer.className = "todo-container";
            todoTitle.className = "todo-title";
            todoTitle.innerText = item.title;
            todoListContainer.className = "todo-list";
            todoBottom.className = "todo-bottom";
            addListText.className = "add-list-text";
            addListButton.className = "add-list-btn";
            addListButton.innerText = "Add TODO";
            
            item.todoContainer.appendChild(todoTitle);
            item.todoContainer.appendChild(todoListContainer);
            
            item.lists.forEach( listItem => {
            const todoCheck = document.createElement('input');
            const listWrapper = document.createElement('div');
            const todoListLabel = document.createElement('label');

            listWrapper.className = "list-wrapper";
            todoCheck.setAttribute("type", "checkbox");
            todoListLabel.innerText = listItem.listName;

            listWrapper.appendChild(todoCheck);
            listWrapper.appendChild(todoListLabel);

            todoListContainer.appendChild(listWrapper);
            });
            
            item.todoContainer.appendChild(todoListContainer);
            
            todoBottom.appendChild(addListText);
            todoBottom.appendChild(addListButton);
            item.todoContainer.appendChild(todoBottom);
            container.appendChild(item.todoContainer);
        });
    });
});