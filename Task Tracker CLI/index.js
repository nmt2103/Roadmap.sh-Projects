const fs = require('node:fs/promises')

const argv = process.argv.slice(2)

// Open file to get tasks
const openFile = async () => {
  try {
    await fs.open('tasks.json', 'r+')

    // Read file
    // Return file's content to get tasks
    return JSON.parse(await fs.readFile('tasks.json'))
  } catch (err) {
    // Catch err if no file exists

    // Write file
    // File's content is an empty array
    return await fs.writeFile('tasks.json', '[]')
  }
}

// Write task(s) to file
const writeTask = async (tasks) => {
  try {
    return await fs.writeFile('tasks.json', JSON.stringify(tasks, null, 2))
  } catch (err) {
    console.error(err)
  }
}

// Get the current unique Id
const getId = (tasks) => {
  let currId = 0
  const ids = tasks.map((task) => task.id)

  // Sort ids array in ascending order
  ids.sort((a, b) => a - b)

  for (const id of ids) {
    if (currId === id) currId++
  }
  return currId
}

// Check if task is available
const checkTask = (tasks) => {
  return tasks.find((task) => task.id == argv[1])
}

async function app() {
  // Get tasks list
  let tasks = await openFile()
  // If task list is not yet available, revoke openFile()
  if (!tasks) tasks = await openFile()

  switch (argv[0]) {
    // Add task
    case 'add':
      const newTask = {
        id: getId(tasks),
        desc: argv[1],
        status: 'todo',
        createdAt: Date(),
        updatedAt: null,
      }

      // Add new task to task list
      tasks = [...tasks, newTask]

      await writeTask(tasks)
      console.log(tasks)
      break

    // Edit task description
    case 'edit':
      // Check if task available
      if (!checkTask(tasks)) return console.error('No task found!')

      // Edit specific task description
      tasks = tasks.map((task, index) =>
        argv[1] == index ? { ...task, desc: argv[2], updatedAt: Date() } : task
      )

      await writeTask(tasks)
      console.log(tasks)
      break

    // Update task status
    case 'in-progress':
      // Check if task available
      if (!checkTask(tasks)) return console.error('No task found!')

      // Mark task status as in progress
      tasks = tasks.map((task, index) =>
        argv[1] == index
          ? { ...task, status: argv[0], updatedAt: Date() }
          : task
      )

      await writeTask(tasks)
      console.log(tasks)
      break

    case 'done':
      // Check if task available
      if (!checkTask(tasks)) return console.error('No task found!')

      // Mark task status as done
      tasks = tasks.map((task, index) =>
        argv[1] == index
          ? { ...task, status: argv[0], updatedAt: Date() }
          : task
      )

      await writeTask(tasks)
      console.log(tasks)
      break

    // Delete task
    case 'delete':
      // Check if task available
      if (!checkTask(tasks)) return console.error('No task found!')

      // Delete specific task
      tasks = tasks.filter((task) => argv[1] != task.id)

      await writeTask(tasks)
      console.log(tasks)
      break

    // List tasks
    case 'list':
      switch (argv[1]) {
        // List all tasks
        default:
          console.log(tasks)
          break

        // List todo tasks
        case 'todo':
          console.log(tasks.filter((task) => task.status === 'todo'))
          break

        // List in-progress tasks
        case 'in-progress':
          console.log(tasks.filter((task) => task.status === 'in-progress'))
          break

        // List done tasks
        case 'done':
          console.log(tasks.filter((task) => task.status === 'done'))
          break
      }

    // Display usage
    default:
      console.log(`
        Usage:\tnode index.js <command> [arguments]
        \nCommands:
        \nadd <task description         \t\t- Add a new task
        \nedit <id> <new description>   \t\t- Edit a task description by Id
        \nin-progress <id>              \t\t- Mark a task as in-progress by Id
        \ndone <id>                     \t\t- Mark a task as done by Id
        \ndelete <id>                   \t\t- Delete a task by Id
        \nlist [status]                 \t\t- List all tasks or by status (todo, in-progress, done)`)
  }
}
app()
