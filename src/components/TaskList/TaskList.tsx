import { useEffect, useState } from "react";
import { getTaskRequest } from "../../api/taskApi"
import { Task } from "../../interfaces/task.interface";
import TaskItem from "../TaskItem/TaskItem";

function TaskList() {

  const [tasks, setTasks] = useState<Task[]>([]);
  const getTask = async () => {
    const result = await getTaskRequest();
    setTasks(result);

  }

  useEffect(() => {
    getTask();
  },[])
  return (
    <div>
      {
        tasks.map(task => (
          <TaskItem task={task} key={task._id}/>
        ))
      }
    </div>
  )
}

export default TaskList
