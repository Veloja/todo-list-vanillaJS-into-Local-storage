const addToDo = document.querySelector('.add-todo')
const form = document.querySelector('.form')
let todoInput = document.querySelector('.todo-input')
let ulList = document.querySelector('.list')
let todoList = []

let todoID = ''


function addToList() {
    event.preventDefault()

    let inputValue = todoInput.value
    const todoObj = {
        name: inputValue,
        id: Date.now()
    }
    todoList.push(todoObj)
    form.reset()

    ulList.innerHTML = todoList.map(todo => {
        return `
                <li class="todo-item" data-id=${todo.id}>${todo.name} 
                    <button class="delete">delete</button>
                    <button class="done">done</button>
                </li>
            `
    }).join('')

    const btnsNode = document.querySelectorAll('.delete')
    const btns = [...btnsNode]
    btns.map(btn => {
        btn.addEventListener('click', handleDelete)
    })

    const btnsNodeDone = document.querySelectorAll('.done')
    const btnsDone = [...btnsNodeDone]
    btnsDone.map(btnDone => {
        btnDone.addEventListener('click', handleDone)
    })

}

function handleDone() {
    const exactTodoID = +this.parentNode.getAttribute('data-id')
    const todo = this.parentNode
    
    for(let i = 0; i < todoList.length; i++) {
        if(exactTodoID === todoList[i].id) {
            todoList[i].done = true
            todo.classList.add('solved')
        }
    } 
}

function handleDelete() {
    const exactTodoID = +this.parentNode.getAttribute('data-id')
    const todo = this.parentNode
    
    for(let i = 0; i < todoList.length; i++) {
        if(exactTodoID === todoList[i].id) {
            let idx = todoList.indexOf(todoList[i])
            todoList.splice(idx, 1)
            todo.remove()
        }
    }    
}


addToDo.addEventListener('click', addToList)
