document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const courseId = document.getElementById('courseId').value;
    const taskName = document.getElementById('taskName').value;
    const dueDate = document.getElementById('dueDate').value;
    const additionalDetails = document.getElementById('additionalDetails').value;

    const taskData = {
        courseId: courseId,
        taskName: taskName,
        dueDate: dueDate,
        additionalDetails: additionalDetails
    };

    fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Task added successfully:', data);
        // You can update UI or show a confirmation message here
    })
    .catch(error => {
        console.error('There was a problem adding the task:', error.message);
        // You can update UI to show error messages here
    });
});
