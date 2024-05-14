let tasks = [];

const addTask = () => {
    const taskInput = document.querySelector('.task-input');
    const taskName = taskInput.value;

    if (taskName.trim() !== '') {
        const task = {
            id: Date.now(),
            name: taskName,
            completed: false
        };

        tasks.push(task);
        renderTasks();
        taskInput.value = '';
    }
};

const taskInput = document.querySelector('.task-input');
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

const addTaskButton = document.querySelector('.add-task-btn');
addTaskButton.addEventListener('click', addTask);

const removeCompletedButton = document.querySelector('.remove-completed-btn');
removeCompletedButton.addEventListener('click', removeCompletedTasks);

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function markCompleted(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });
    renderTasks();
}

function removeCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    renderTasks();
}

const renderTasks = () => {
    const taskList = document.querySelector('.todo-app-list');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.setAttribute('id', task.id);
        listItem.classList.add('task');
        if (task.completed) {
            listItem.classList.add('completed');
        }

        const taskContainer = document.createElement('div');
        taskContainer.classList.add('container');
        taskContainer.addEventListener('click', () => markCompleted(task.id));

        const taskCircle = document.createElement('div');
        taskCircle.classList.add('circle');

        const taskName = document.createElement("span");
        taskName.textContent = task.name;

        const deleteButton = document.createElement('i');
        deleteButton.classList.add('bx', 'bx-x', 'close-icon');
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation(); 
            deleteTask(task.id);
        });

        taskContainer.appendChild(taskCircle);
        taskContainer.appendChild(taskName);
        listItem.appendChild(taskContainer);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
    });
};

renderTasks();

