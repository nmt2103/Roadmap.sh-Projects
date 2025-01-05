# Task Tracker CLI

This is a simple command line interface (CLI) application for managing tasks.

Inspired by [Task Tracker CLI](https://roadmap.sh/projects/task-tracker) project from [roadmap.sh](http://roadmap.sh)

## Features

- Add new tasks and store in a JSON file.
- Edit tasks description.
- Update tasks status.
- Delete tasks.
- List all tasks or by its status.

## Installation

#### Clone repository

    git clone https://github.com/nmt2103/Roadmap.sh-Projects

#### Navigate to project directory

    cd Task\ Tracker\ CLI/

## Usage

- ### Add task

      node index.js add 'Trying Task Tracker CLI'

- ### Edit task

      node index.js edit 0 'Trying Task Tracker CLI and happy coding!'

- ### Update task

  1.  In-progress status

          node index.js in-progress 0

  2.  Done status

          node index.js done 0

- ### Delete task

      node index.js delete 0

- ### List task

  1.  All task
      node index.js list

  2.  Todo task

          node index.js list todo

  3.  In-progress task

          node index.js list in-progress

  4.  Done task

          node index.js list done

## Sample JSON structure

    [
    	{
    		"id": 0,
    		"desc": "Trying Task Tracker CLI and happy coding!",
    		"status": "done",
    		"createdAt": "Sun Jan 05 2025 12:25:56 GMT+0700 (Indochina Time)",
    		"updatedAt": "Sun Jan 05 2025 12:26:52 GMT+0700 (Indochina Time)"
    	}
    ]
