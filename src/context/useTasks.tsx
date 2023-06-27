import { useContext } from "react";
import { taskContext } from "./TaskContext";

export const useTasks = () => {
  const context = useContext(taskContext);
  if(!context){
    throw new Error('useTasks must be use within a TasksProvider');
  }
  return context;
}
