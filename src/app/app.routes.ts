import { Routes } from "@angular/router";
import { EmployeeComponent } from "./component/employee/employee.component";
import { TodoComponent } from "./component/todo/todo.component";
import { DashboardComponent } from "./component/dashboard/dashboard.component";
import { DirectiveComponent } from "./component/directive/directive.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { authGuard, unAuthGuard } from "./auth/auth.guard";

export const routes: Routes = [
  {
    path: "",
    title: "Dashboard",
    component: DashboardComponent,
    canActivate: [unAuthGuard]
  },
  {
    path: "dashboard",
    title: "Dashboard",
    component: DashboardComponent,
    canActivate: [unAuthGuard]
  },
  {
    path: "login",
    title: "Login",
    component: LoginComponent,
    canActivate: [authGuard]
  },
  {
    path: "register",
    title: "Register",
    component: RegisterComponent,
    canActivate: [authGuard]
  },
  {
    path: "employee",
    title: "Employee",
    component: EmployeeComponent,
    canActivate: [unAuthGuard]
  },
  {
    path: "todo",
    title: "Todo",
    component: TodoComponent,
    canActivate: [unAuthGuard]
  },
  {
    path: "directive",
    title: "Directive",
    component: DirectiveComponent,
    canActivate: [unAuthGuard]
  },
];
