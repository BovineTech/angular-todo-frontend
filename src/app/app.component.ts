import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { RouterOutlet, RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { Store } from "@ngrx/store";
import { getUser } from "./store/auth/Auth.Selector";

@Component({
  selector: "app-root",
  imports: [
    RouterOutlet,
    RouterLink,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}
  username: string = "";
  copyright: string = `© ${new Date().getFullYear()} Copyright: NewTechGroup`;

  ngOnInit(): void {
    this.GetUser();
  }

  GetUser() {
    // let sub = this.service.GetAll().subscribe(item => {
    //   this.empList = item;
    //   this.dataSource = new MatTableDataSource(this.empList);
    // })
    // this.subscription.add(sub);
    // this.store.dispatch(loadUser())
    this.store.select(getUser).subscribe((item) => {
      console.log("item: ", item);
      this.username = item.username ?? "";
      // this.dataSource = new MatTableDataSource(this.empList);
    });
  }

  isLoggedIn() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem("token");
      return (
        token !== null &&
        token !== undefined &&
        token !== "null" &&
        token !== "undefined"
      );
    }
    return false;
  }
  OnLogout() {
    console.log("Logout clicked");
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem("token");
    }
    // this.router.navigate(["/login"]);
  }
}
