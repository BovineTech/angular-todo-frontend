import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TodoService } from "../../service/todo.service";
import {
  addTodo,
  addTodoSuc,
  deleteTodo,
  deleteTodoSuc,
  emptyAction,
  loadTodo,
  loadTodoFail,
  loadTodoSuc,
  updateTodo,
  updateTodoSuc,
} from "./Todo.Action";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class todoEffects {
  // constructor(private actions$: Actions, private service: TodoService) {

  // }

  actions$ = inject(Actions);
  service = inject(TodoService);
  toastr = inject(ToastrService);

  _loadTodo = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodo),
      exhaustMap(() => {
        return this.service.GetAll().pipe(
          map((data) => {
            return loadTodoSuc({ list: data });
          }),
          catchError((err) => of(loadTodoFail({ errMsg: err.message }))),
        );
      }),
    ),
  );

  _deleteTodo = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTodo),
      switchMap((action) => {
        return this.service.Delete(action.todoId).pipe(
          switchMap((data) => {
            return of(
              deleteTodoSuc({ todoId: action.todoId }),
              this.Showalert("Deleted Successfully.", "pass"),
            );
          }),
          catchError((err) => of(this.Showalert(err.message, "fail"))),
        );
      }),
    ),
  );

  _addTodo = createEffect(() =>
    this.actions$.pipe(
      ofType(addTodo),
      switchMap((action) => {
        return this.service.Create(action.data).pipe(
          switchMap((data) => {
            return of(
              addTodoSuc({ data: action.data }),
              loadTodo(),
              this.Showalert("Created Successfully.", "pass"),
            );
          }),
          catchError((err) => of(this.Showalert(err.message, "fail"))),
        );
      }),
    ),
  );

  _updateTodo = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTodo),
      switchMap((action) => {
        return this.service.Update(action.data).pipe(
          switchMap((data) => {
            return of(
              updateTodoSuc({ data: action.data }),
              this.Showalert("Updated Successfully.", "pass"),
            );
          }),
          catchError((err) => of(this.Showalert(err.message, "fail"))),
        );
      }),
    ),
  );

  Showalert(message: string, response: string) {
    if (response == "pass") {
      this.toastr.success(message);
    } else {
      this.toastr.error(message);
    }
    return emptyAction();
  }
}
