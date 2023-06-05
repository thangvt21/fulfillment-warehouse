import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { Warehouse } from "../../interfaces/warehouse";
import { WarehouseService } from "../../services/warehouse.service";
@Component({
  selector: "app-create-warehouse",
  templateUrl: "./create-warehouse.component.html",
  styleUrls: ["./create-warehouse.component.css"],
})
export class CreateWarehouseComponent {
  hide = true;
  constructor(
    private fb: FormBuilder,
    private WarehouseService: WarehouseService,
    private router: Router
  ) {}

  updateWarehouseForm = this.fb.group({
    id: [0],
    address1: [""],
    name: [""],
    address2: [""],
    city: [""],
    state: [""],
    country: [""],
    zip: [0],
    slot: [0],
    status: [""],
    description: [""],
    quantityItems: [0],
  });

  create() {
    this.WarehouseService.create(
      this.updateWarehouseForm.value as Warehouse
    ).subscribe(() => {
      this.router.navigate(["/warehouse"]);
    });
  }
}
