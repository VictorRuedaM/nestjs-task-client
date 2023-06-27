
import { ChangeEvent, FormEvent, useState } from "react"
import { createTaskRequest } from "../../api/taskApi";
import { useTasks } from "../../context/useTasks";
import { CreateTask } from '../../interfaces/task.interface';

function TaskForm() {

  const [task, setTask] = useState({
    title: '',
    description: '',
    done: false
  })

  const {createTask} = useTasks();



  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    setTask({
      ...task,
      [e.target.name]: e.target.value
    });

  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createTask(task);

  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" className="border-2 border-gray-700 p-2 rounded-lg
        bg-zinc-800 block w-full my-2" placeholder="Write a title" onChange={handleChange}/>

        <textarea name="description" rows={3}
        className="border-2 border-gray-700 p-2 rounded-lg
        bg-zinc-800 block w-full my-2" placeholder="Write a description" onChange={handleChange}></textarea>

        <label htmlFor="" className="inline-flex items-center gap-x-2">
          <input type="checkbox" className="h-5 w-5 text-amber-700"
          onChange={(e) => setTask({...task, done: !task.done})}
          />
          <span>Done</span>
        </label>

        <button className="bg-amber-700 px-3 py-2 block w-full rounded-lg">Save</button>
      </form>
    </div>
  )
}

export default TaskForm
