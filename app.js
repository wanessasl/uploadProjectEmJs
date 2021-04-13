let todoItems = [];

window.addEventListener('load', () => {
    const data = localStorage.getItem('todoItemsRef');

    if(data){
        todoItems - JSON.parse(data);

        todoItems.forEach( t => renderTodo(t));
    }
})

function renderTodo(todo){

    const list = document.querySelector('.js-todo-list');

    const item = document.querySelector(`[data-key='${todo.id}']`);

    if(todo.deleted){
        item.remove();
        return;
    }
    const isChecked = todo.checked ? 'done': '';

    const node = document.createElement("li");

    node.setAttribute('class', `todo-item ${isChecked}`);

    node.setAttribute('data-key', todo.id); 

    node.innerHTML = `
    <input id="${todo.id}" type="checkbox"/>
    <label for="${todo.id}" class="tick js-tick"></label>
    <span>${todo.text}</span>
    <button class="delete-todo js-delete-todo">
    <svg><use href="#delete-icon"></use></svg>
    </button>

    `;

    if(item){
        list.replaceChild(node, item);
    }else{
        list.append(node);
    }

    localStorage.setItem('todoItemsRef', JSON.stringify(todoItems));
    
}

function addTodo(text){

    const todo = {
        text,
        checked: false,
        id: Date.now()
    }

    todoItems.push(todo);
    renderTodo(todo);
    

}

const form = document.querySelector(".js-form");

form.addEventListener('submit',  event => {
    event.preventDefault(); //evita que o navegador pare a renderização de submissão.
    
    const input = document.querySelector('.js-todo-input');

    const text = input.value.trim(); //(impede de salvar espaços)

    if(text !== ''){
        addTodo(text);
        input.value = '';
        input.focus();
    }
}); 

const list = document.querySelector('.js-todo-list');

list.addEventListener('click', event => {

   if(event.target.classList.contains('js-tick')){
       const key = event.target.parentElement.dataset.key;
       toggleDone(key);   
   }

   if(event.target.classList.contains('js-delete-todo')){
       const key = event.target.parentElement.dataset.key;
       deleteTodo(key);
   }
});

function toggleDone(key){
    const index = todoItems.findIndex(item => item.id === Number(key));

    todoItems[index].checked = !todoItems[index].checked; 

    renderTodo(todoItems[index]);
}

function deleteTodo(key){
    const index = todoItems.findIndex(item => item.id === Number(key));

    const todo = {
        deleted: true,
        ...todoItems[index]
    }

    todoItems = todoItems.filter(item => item.id !== todo.id)
    localStorage.setItem('todoItemsRef', JSON.stringify(todoItems));

    renderTodo(todo);

}  

document.addEventListener('DOMContentLoaded', () => {
    const ref = localStorage.getItem('todoItemsRef');
    if (ref) {
      todoItems = JSON.parse(ref);
      todoItems.forEach(t => {
        renderTodo(t);
      });
    }
  });

