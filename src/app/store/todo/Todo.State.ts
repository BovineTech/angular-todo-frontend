import { TodoModel } from "./Todo.Model";

export const todoState: TodoModel = {
  list: [],
  errormessage: "",
  todoobj: {
    _id: "",
    title: "",
    completed: false,
  },
  loading: false,
};
