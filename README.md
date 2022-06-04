# Todo list

This project about creating a basic todo list. It was a test work for apply a job, built with NodeJS, MongoDB, React, Redux, JavaScript, SCSS

## Main features

###I have achieved the main goals, except server side validation

You can create tasks and group them under collections.
You can add tags to task, and switch it's status completed or back to uncompleted.
Collections and task names must be uniq.
You can filter by task name or tags.
After the task is created the name, status and tags editable.

# Installation and Setup Instructions

To running locally you need NodeJS I used v16.14.2
For DB I used Atlas MongoDB you can setup your DB in the /server/config.env file. You need connection string to access, you can get it from here: https://www.mongodb.com/atlas/database
Server will running default on port 5000, it could be config in the /server/config.env file too
To start the server type node server.js in a terminal from command line.
Cliens will run at http://localhost:3000 to start type npm start from command line.

# Possible directions for future development

Delete task, and collections.
Edit collection's name
Copy or move task from one collection into another
Add more property for task, for example description, assign user, deadline, estimated time
Sorting for example completed/uncompleted
To mark task with colors, or with icons
More filtering
