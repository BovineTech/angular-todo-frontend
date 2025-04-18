import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Todo } from "../model/Todo";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  apiUrl = "http://localhost:5000/api/todos";

  constructor(private http: HttpClient) {}

  GetAll() {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  Get(todoId: number) {
    return this.http.get<Todo>(this.apiUrl + "/" + todoId);
  }

  Create(data: Todo) {
    return this.http.post(this.apiUrl, data);
  }

  Update(data: Todo) {
    return this.http.put(this.apiUrl + "/" + data._id, data);
  }

  Delete(todoId: string) {
    return this.http.delete(this.apiUrl + "/" + todoId);
  }
}
