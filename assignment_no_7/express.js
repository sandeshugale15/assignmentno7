const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
const url = 'mongodb://localhost:27017';
const dbName = 'student_tasks';

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err);
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const tasksCollection = db.collection('tasks');

    // Route to retrieve tasks for a specific course
    app.get('/courses/:courseId/tasks', (req, res) => {
        const courseId = req.params.courseId;
        
        tasksCollection.find({ courseId: courseId }).toArray((err, tasks) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            if (tasks.length === 0) {
                res.status(404).json({ error: 'Tasks not found for the specified course ID' });
                return;
            }

            res.json(tasks);
        });
    });

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
});
