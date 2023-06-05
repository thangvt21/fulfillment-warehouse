import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { Import } from "../../interfaces/import";
import { ImportService } from "../../services/import.service";
@Component({
  selector: "app-create-imports",
  templateUrl: "./create-imports.component.html",
  styleUrls: ["./create-imports.component.css"],
})
export class CreateImportsComponent {
  hide = true;
  constructor(
    private fb: FormBuilder,
    private ImportService: ImportService,
    private router: Router
  ) {}

  createAccountForm = this.fb.group({
    username: [""],
    password: [""],
    role: [""],
  });

  create() {
    this.ImportService.create(this.createAccountForm.value as Import).subscribe(
      () => {
        this.router.navigate(["/import"]);
      }
    );
  }
}
