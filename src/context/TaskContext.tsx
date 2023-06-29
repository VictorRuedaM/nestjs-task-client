import { createContext, useEffect, useState } from "react";
import { createTaskRequest, deleteTaskRequest, getTaskRequest, updateTaskRequest } from '../api/taskApi';
import { CreateTask, Task, UpdateTask } from '../interfaces/task.interface';

interface TaskContextValues {
  tasks: Task[];
  createTask: (task: CreateTask) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  updateTask: (id: string, task: UpdateTask) => Promise<void>;
}
export const taskContext = createContext<TaskContextValues>({
  tasks: [],

  createTask: async () => {},
  updateTask: async () => {},
  deleteTask: async () => {},

});

interface Props {
  children: React.ReactNode;
}

export const TaskProvider: React.FC<Props> = ({children}) => {

  const [tasks, setTasks] = useState<Task[]>([]);

  const getTask = async () => {
    const result = await getTaskRequest();

    setTasks(result);
  }

  useEffect(() => {
    getTask();
  },[]);

  const createTask = async (task: CreateTask) => {
    const taskFound = tasks.filter(t => t.title === task.title)

    if(taskFound.length){
      alert('Task already exists');
    }
    const taskResult = await createTaskRequest(task);


    setTasks([...tasks, taskResult])
  }

  const updateTask = async (id: string, task: UpdateTask) => {
    const res = await updateTaskRequest(id, task);

    const newTasks = tasks.map(task => task._id === id ? {...task, ...res} : task);
    setTasks(newTasks);
  }

  const deleteTask = async (id: string) => {
    const res = await deleteTaskRequest(id);

    if(res.status === 204){
      const newTasks = tasks.filter(task => task._id !== id);
      setTasks(newTasks);
    }
  }
  return(
    <taskContext.Provider
      value={{
        tasks,
        createTask,
        updateTask,
        deleteTask,
      }}>
      {children}
    </taskContext.Provider>
  )
}
