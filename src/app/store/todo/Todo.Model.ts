import { Todo } from "../../model/Todo";

export interface TodoModel {
    list: Todo[],
    errormessage: string,
    todoobj: Todo
    loading: boolean,
}