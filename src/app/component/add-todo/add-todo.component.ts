import { Component, Inject, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { Todo } from "../../model/Todo";
import { TodoService } from "../../service/todo.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { Store } from "@ngrx/store";
import { addTodo, getTodo, updateTodo } from "../../store/todo/Todo.Action";
import { selectTodo } from "../../store/todo/Todo.Selector";

@Component({
  selector: "app-add-todo",
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
    MatCheckboxModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: "./add-todo.component.html",
  styleUrl: "./add-todo.component.scss",
})
export class AddTodoComponent implements OnInit {
  title = "Add Todo";
  dialodata: any;
  isEdit = false;

  // constructor(private service: TodoService, private ref: MatDialogRef<AddTodoComponent>,
  //   private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any
  // ) {

  // }

  constructor(
    private store: Store,
    private ref: MatDialogRef<AddTodoComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  ngOnInit(): void {
    console.log("data: ", this.data);
    this.dialodata = this.data;
    if (this.dialodata.code.length > 0) {
      console.log("I am here");
      this.title = "Edit Todo";
      this.isEdit = true;
      this.store.dispatch(getTodo({ todoId: this.dialodata.code }));
      this.store.select(selectTodo).subscribe((item) => {
        console.log("item: ", item);
        let _data = item;
        if (_data != null) {
          this.todoForm.setValue({
            title: _data.title,
            completed: _data.completed,
          });
        }
      });
      // this.service.Get(this.dialodata.code).subscribe(item => {
      //   let _data = item;
      //   if (_data != null) {
      //     this.todoForm.setValue({
      //       id: _data.id,
      //       name: _data.name,
      //       doj: _data.doj,
      //       role: _data.role,
      //       salary: _data.salary
      //     })
      //   }
      // })
    }
  }

  todoForm = new FormGroup({
    title: new FormControl("", Validators.required),
    completed: new FormControl(false, Validators.required),
  });

  SaveTodo() {
    if (this.todoForm.valid) {
      let _data: Todo = {
        _id: this.dialodata.code,
        title: this.todoForm.value.title as string,
        completed: this.todoForm.value.completed as boolean,
      };

      if (!this.isEdit) {
        // this.service.Update(_data).subscribe(item => {
        //   this.toastr.success('Saved successfully', 'Updated');
        //   this.closepopup();
        // });
        this.store.dispatch(addTodo({ data: _data }));
      } else {
        // this.service.Create(_data).subscribe(item => {
        //   this.toastr.success('Saved successfully', 'Created');
        //   this.closepopup();
        // });
        this.store.dispatch(updateTodo({ data: _data }));
      }
      this.closepopup();
    }
  }

  closepopup() {
    this.ref.close();
  }
}
