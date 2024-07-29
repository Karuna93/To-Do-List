document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');

    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task));
    };

    const saveTasks = (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const addTask = (taskText) => {
        const task = { text: taskText, completed: false };
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        saveTasks(tasks);
        addTaskToDOM(task);
    };

    const addTaskToDOM = (task) => {
        const li = document.createElement('li');
        li.className = 'task';
        if (task.completed) li.classList.add('completed');

        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = task.text;

        const taskButtons = document.createElement('div');
        taskButtons.className = 'task-buttons';

        const completeButton = document.createElement('button');
        completeButton.className = 'complete-button';
        completeButton.textContent = 'Complete';
        completeButton.addEventListener('click', () => toggleCompleteTask(task, li));

        const editButton = document.createElement('button');
        editButton.className = 'edit-button';
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editTask(task, li));

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(task, li));

        taskButtons.appendChild(completeButton);
        taskButtons.appendChild(editButton);
        taskButtons.appendChild(deleteButton);

        li.appendChild(taskText);
        li.appendChild(taskButtons);

        taskList.appendChild(li);
    };

    const toggleCompleteTask = (task, taskElement) => {
        task.completed = !task.completed;
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = tasks.map(t => t.text === task.text ? task : t);
        saveTasks(updatedTasks);
        taskElement.classList.toggle('completed');
    };

    const editTask = (task, taskElement) => {
        const newTaskText = prompt('Edit task:', task.text);
        if (newTaskText) {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const updatedTasks = tasks.map(t => t.text === task.text ? {...t, text: newTaskText} : t);
            saveTasks(updatedTasks);
            task.text = newTaskText;
            taskElement.querySelector('.task-text').textContent = newTaskText;
        }
    };

    const deleteTask = (task, taskElement) => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = tasks.filter(t => t.text !== task.text);
        saveTasks(updatedTasks);
        taskElement.remove();
    };

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    taskInput.addEventListener('keypress', (e) => {
        if ( e.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText) {
                addTask(taskText);
                taskInput.value = '';
            }
        }
    });

    loadTasks();
});
