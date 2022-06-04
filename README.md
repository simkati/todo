# Todo list

This project is about creating a basic todo list. It was a test work for a job application, built with NodeJS, MongoDB, React, Redux, JavaScript, SCSS.
I was newish with this stack when I was working on this project. I learnt a lot during the development. The main challenge was working with nested documents. I have achieved the main goals, except server side validation

## Main features

+ You can create tasks and group them under collections.
+ You can add tags to tasks, and switch its status to completed or back to uncompleted.
+ Collections and task names must be unique.
+ You can filter by task name or tags.
+ After the task is created, the name, status and tags are editable.

## Installation and Setup Instructions

+ To run locally you need NodeJS. I used v16.14.2
+ For DB I used Atlas MongoDB you can setup your DB in the /server/config.env file. You need A connection string for access, you can get it from here: https://www.mongodb.com/atlas/database
+ The server will be running by default on port 5000, it could be configured in the /server/config.env file too
+ I used NPM as a package manager, you can install all the dependencies with npm install from the package.json
+ To start the server, type `node server.js` in a terminal from the command line.
+ Clients will run at http://localhost:3000, to start type `npm start` from the command line.

## Possible directions for future development

+ Delete a task, and collections
+ Edit collection names
+ Copy or move a task from one collection into another
+ Add more properties for a task, for example a description, assign user, deadline, estimated time
+ Sorting: for example completed/uncompleted
+ To mark task with colors, or with icons
+ More filtering
