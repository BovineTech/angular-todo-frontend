import { Routes } from "@angular/router";
import { EmployeeComponent } from "./component/employee/employee.component";
import { TodoComponent } from "./component/todo/todo.component";
import { DashboardComponent } from "./component/dashboard/dashboard.component";
import { DirectiveComponent } from "./component/directive/directive.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";

export const routes: Routes = [
  {
    path: "",
    title: "Dashboard",
    component: DashboardComponent,
  },
  {
    path: "login",
    title: "Login",
    component: LoginComponent,
  },
  {
    path: "register",
    title: "Register",
    component: RegisterComponent,
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
  {
    path: "directive",
    title: "Directive",
    component: DirectiveComponent,
  },
];
