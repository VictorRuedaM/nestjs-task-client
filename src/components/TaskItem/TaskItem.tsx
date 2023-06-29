import { useTasks } from "../../context/useTasks";
import { Task } from "../../interfaces/task.interface";
import { FaCheck, FaTrashCan } from "react-icons/fa6";

interface Props {
  task: Task
}

function TaskItem({task}: Props) {

  const {deleteTask, updateTask} = useTasks();

  return (
    <div className="bg-gray-900 p-2 my-2 flex justify-between hover:bg-gray-700 hover:cursor-pointer
    rounded-lg">
      <div className={task.done ? 'text-green-500': ''}>
        <h1>{task.title}</h1>
        <p>{task.description}</p>
      </div>
      <div className="flex gap-x-3">
        <button
        onClick={ async () => {

          await updateTask(task._id, {done: !task.done})
        }}
        >{!task.done ? <FaCheck className='text-gray-500  hover:text-orange-500'/> :  <FaCheck className='text-green-500 hover:text-orange-500'/>}</button>

        <button
        onClick={ async () => {
          if(!window.confirm('Are you sure you want to delete this task')) return;
          await deleteTask(task._id)}}
        className='hover:text-red-500'
        ><FaTrashCan/></button>
      </div>
    </div>
  )
}

export default TaskItem
