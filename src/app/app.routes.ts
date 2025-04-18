import { Routes } from "@angular/router";
import { EmployeeComponent } from "./component/employee/employee.component";
import { TodoComponent } from "./component/todo/todo.component";
import { DashboardComponent } from "./component/dashboard/dashboard.component";

export const routes: Routes = [
  {
    path: "",
    title: "Dashboard",
    component: DashboardComponent,
  },
  {
    path: "employee",
    title: "Employee",
    component: EmployeeComponent,
  },
  {
    path: "todo",
    title: "Todo",
    component: TodoComponent,
  },
];
