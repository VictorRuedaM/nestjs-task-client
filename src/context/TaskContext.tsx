import { createContext, useEffect, useState } from "react";
import { createTaskRequest, getTaskRequest } from "../api/taskApi";
import { CreateTask, Task } from '../interfaces/task.interface';

interface TaskContextValues {
  tasks: Task[];
  createTask: (task: CreateTask) => void;
}
export const taskContext = createContext<TaskContextValues>({
  tasks: [],
  createTask: () => {},
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

    const taskResult = await createTaskRequest(task);

    setTasks([...tasks, taskResult])
  }
  return(
    <taskContext.Provider
      value={{
        tasks,
        createTask,
      }}>
      {children}
    </taskContext.Provider>
  )
}
