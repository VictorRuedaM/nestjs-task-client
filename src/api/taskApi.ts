import axios from "axios";
import { CreateTask } from "../interfaces/task.interface";

const url = import.meta.env.VITE_URL_API;


export const createTaskRequest = async (task: CreateTask) => {

  await axios.post(`${url}`, task);

}

export const getTaskRequest = async () => {

  const request = await axios.get(`${url}`);

  return request.data;

}


