const addTaskForm = document.getElementById("add-task-form");
const input = document.getElementById("task-input");
const taskContainer = document.querySelector('[data-status="todo"]');
const allContainers = document.querySelectorAll('.tasks-container')

addTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskText = input.value;
    if(!taskText) {
        return;
    }
    const taskCard = document.createElement('div');
    taskCard.id = 'task-' + Date.now();
    taskCard.className = 'task-card';
    taskCard.textContent = taskText;

    taskCard.draggable = true;
    taskCard.addEventListener('dragstart', (event) => {
        event.target.classList.add('dragging');
        event.dataTransfer.setData('text/plain', event.target.id);
 
    })
    taskCard.addEventListener('dragend', (event) => {
        event.target.classList.remove('dragging')
    })

    taskContainer.appendChild(taskCard);
    input.value = '';
    

})
allContainers.forEach(container => {
        container.addEventListener('dragover', (event) => {
            event.preventDefault();
        })
        
        container.addEventListener('drop', (event) => {
            event.preventDefault();
            const taskId = event.dataTransfer.getData('text/plain');
            const draggableElement = document.getElementById(taskId);
            container.appendChild(draggableElement);

        })

})

