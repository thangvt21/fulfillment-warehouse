import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { WarehouseService } from "../../services/warehouse.service";
import { Warehouse } from "../../interfaces/warehouse";
@Component({
  selector: "app-edit-warehouse",
  templateUrl: "./edit-warehouse.component.html",
  styleUrls: ["./edit-warehouse.component.css"],
})
export class EditWarehouseComponent {
  hide = true;
  constructor(
    private fb: FormBuilder,
    private WarehouseService: WarehouseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.route.paramMap.subscribe((param) => {
      let id = Number(param.get("id"));
      this.getbyID(id);
    });
  }

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

  getbyID(id: number) {
    this.WarehouseService.getByID(id).subscribe((response) => {
      this.updateWarehouseForm.setValue(response);
    });
  }

  update() {
    this.WarehouseService.update(
      this.updateWarehouseForm.value as Warehouse
    ).subscribe(() => {
      this.router.navigate(["/warehouse"]);
    });
  }
}
