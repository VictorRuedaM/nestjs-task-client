import axios from "axios";
import { CreateTask } from "../interfaces/task.interface";

const url = import.meta.env.VITE_URL_API;


export const createTaskRequest = async (task: CreateTask) => {

  const res = await axios.post(`${url}`, task);

  return res.data

}

export const getTaskRequest = async () => {

  const request = await axios.get(`${url}`);

  return request.data;

}


