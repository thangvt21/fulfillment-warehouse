import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { WarehouseService } from "../../services/warehouse.service";
import { Warehouse } from "../../interfaces/warehouse";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-detail-warehouse",
  templateUrl: "./detail-warehouse.component.html",
  styleUrls: ["./detail-warehouse.component.css"],
})
export class DetailWarehouseComponent {
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
}
