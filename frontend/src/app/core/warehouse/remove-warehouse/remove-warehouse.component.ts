import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { WarehouseService } from "../../services/warehouse.service";

@Component({
  selector: "app-remove-warehouse",
  templateUrl: "./remove-warehouse.component.html",
  styleUrls: ["./remove-warehouse.component.css"],
})
export class RemoveWarehouseComponent {
  constructor(
    public dialogRef: MatDialogRef<RemoveWarehouseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private WarehouseService: WarehouseService
  ) {}

  confirmDel() {
    this.WarehouseService.delete(this.data.id).subscribe(() => {
      this.dialogRef.close(this.data.id);
    });
  }
}
