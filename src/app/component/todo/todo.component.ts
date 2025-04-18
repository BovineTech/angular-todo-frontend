import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { AddTodoComponent } from "../add-todo/add-todo.component";
import { Todo } from "../../model/Todo";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
// import { TodoService } from '../../service/todo.service';
import { Subscription } from "rxjs";
import { CommonModule } from "@angular/common";
import { Store } from "@ngrx/store";
import { deleteTodo, loadTodo } from "../../store/todo/Todo.Action";
import { getTodoList, getTodoLoading } from "../../store/todo/Todo.Selector";
import { FormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";  // Import spinner module

@Component({
  selector: "app-todo",
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,  // Include spinner module
  ],
  templateUrl: "./todo.component.html",
  styleUrl: "./todo.component.scss",
})
export class TodoComponent implements OnInit, OnDestroy {
  todoList: Todo[] = [];
  dataSource!: MatTableDataSource<Todo>;
  displayedColumns: string[] = ["_id", "title", "completed", "action"];
  subscription = new Subscription();
  loading = false;  // Add loading state to manage spinner visibility

  // constructor(private dialog: MatDialog, private service: TodoService) {

  // }
  constructor(
    private dialog: MatDialog,
    private store: Store,
  ) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.store.dispatch(loadTodo());
    this.GetallTodo();
  }

  GetallTodo() {
    this.store.select(getTodoLoading).subscribe((loading) => {
      this.loading = loading;
    });
    this.store.select(getTodoList).subscribe((item) => {
      this.todoList = item;
      this.dataSource = new MatTableDataSource(this.todoList);
    });

    this.store.select(getTodoLoading).subscribe((loading) => {
      this.loading = loading;
    });
  }

  addTodo() {
    this.openpopup("");
  }

  DeleteTodo(todoId: string) {
    if (confirm("Are you sure?")) {
      // let sub = this.service.Delete(todoId).subscribe(item => {
      //   this.GetallTodo();
      // })
      // this.subscription.add(sub)
      this.store.dispatch(deleteTodo({ todoId: todoId }));
    }
  }

  EditTodo(todoId: string) {
    this.openpopup(todoId);
  }

  openpopup(todoId: string) {
    this.dialog
      .open(AddTodoComponent, {
        width: "50%",
        exitAnimationDuration: "10ms",
        enterAnimationDuration: "100ms",
        data: {
          code: todoId,
        },
      })
      .afterClosed()
      .subscribe((o) => {
        this.GetallTodo();
      });
  }
}
