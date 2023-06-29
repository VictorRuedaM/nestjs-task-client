export interface Task {
  _id?: string
  title: string;
  description: string;
  done?: boolean;
  createdAT: Date
  updatedAT?: Date;

}

export type CreateTask = Omit<Task, '_id' | 'createdAT' | 'updatedAT'>;

export type UpdateTask = Partial<CreateTask>;
