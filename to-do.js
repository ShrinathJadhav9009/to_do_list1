document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const dateTimeInput = document.getElementById('dateTimeInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const pendingTasks = document.getElementById('pendingTasks');
    const completedTasks = document.getElementById('completedTasks');

    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        const taskDateTime = dateTimeInput.value;

        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        const taskItem = createTaskItem(taskText, taskDateTime);
        pendingTasks.appendChild(taskItem);

        taskInput.value = '';
        dateTimeInput.value = '';
    });

    function createTaskItem(text, dateTime) {
        const li = document.createElement('li');

        const taskDetails = document.createElement('div');
        taskDetails.className = 'task-details';

        const taskText = document.createElement('span');
        taskText.textContent = text;
        taskDetails.appendChild(taskText);

        if (dateTime) {
            const taskDateTime = document.createElement('small');
            taskDateTime.textContent = `Due: ${new Date(dateTime).toLocaleString()}`;
            taskDetails.appendChild(taskDateTime);
        }

        li.appendChild(taskDetails);

        const taskActions = document.createElement('div');
        taskActions.className = 'task-actions';

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'edit-btn';
        editBtn.addEventListener('click', () => editTask(li, taskText, dateTime));
        taskActions.appendChild(editBtn);

        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Complete';
        completeBtn.className = 'complete-btn';
        completeBtn.addEventListener('click', () => completeTask(li));
        taskActions.appendChild(completeBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => deleteTask(li));
        taskActions.appendChild(deleteBtn);

        li.appendChild(taskActions);

        return li;
    }

    function editTask(taskItem, taskTextElement, originalDateTime) {
        const newText = prompt('Edit your task:', taskTextElement.textContent);
        if (newText !== null && newText.trim() !== '') {
            taskTextElement.textContent = newText.trim();
        }

        const newDateTime = prompt('Edit date and time (YYYY-MM-DDTHH:MM):', originalDateTime);
        if (newDateTime !== null && newDateTime.trim() !== '') {
            const taskDateTimeElement = taskItem.querySelector('small');
            if (taskDateTimeElement) {
                taskDateTimeElement.textContent = `Due: ${new Date(newDateTime).toLocaleString()}`;
            } else {
                const newDateTimeElement = document.createElement('small');
                newDateTimeElement.textContent = `Due: ${new Date(newDateTime).toLocaleString()}`;
                taskItem.querySelector('.task-details').appendChild(newDateTimeElement);
            }
        }
    }

    function completeTask(taskItem) {
        taskItem.classList.add('completed');
        completedTasks.appendChild(taskItem);
        const completeBtn = taskItem.querySelector('.complete-btn');
        if (completeBtn) {
            completeBtn.remove();
        }
    }

    function deleteTask(taskItem) {
        taskItem.remove();
    }
});

