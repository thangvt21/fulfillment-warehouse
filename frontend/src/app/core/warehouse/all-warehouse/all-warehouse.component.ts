import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Warehouse } from "../../interfaces/warehouse";
import { PageEvent } from "@angular/material/paginator";
import { WarehouseService } from "../../services/warehouse.service";
import { RemoveWarehouseComponent } from "../remove-warehouse/remove-warehouse.component";

import { DetailWarehouseComponent } from "../detail-warehouse/detail-warehouse.component";

@Component({
  selector: "app-all-warehouse",
  templateUrl: "./all-warehouse.component.html",
  styleUrls: ["./all-warehouse.component.css"],
})
export class AllWarehouseComponent {
  Warehouse: Warehouse[] = [];
  sortingControl = new FormControl("");
  searchControl = new FormControl("");
  pageIndex: number = 0;
  pageSize: number = 5;
  totalRecords: number = 0;
  constructor(
    private WarehouseService: WarehouseService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAPI("", "", "");
    this.sortingControl.valueChanges.subscribe((value) => {
      if (value) {
        let sortData = this.doSorting(value);
        this.getAPI(
          sortData.sortColumn,
          sortData.order,
          this.sortingControl.value ?? ""
        );
      }
    });
  }

  textSearch() {
    let sortData = this.doSorting(this.sortingControl.value ?? "");
    this.getAPI(
      sortData.sortColumn,
      sortData.order,
      this.sortingControl.value ?? ""
    );
    this.getAPI(
      sortData.sortColumn,
      sortData.order,
      this.searchControl.value ?? ""
    );
  }

  doSorting(value: string) {
    let sortColumn: string = "";
    let order: string = "";
    if (value === "id-by-desc") {
      sortColumn = "id";
      order = "desc";
    } else if (value === "id-by-asc") {
      sortColumn = "id";
      order = "asc";
    }
    // this.getAPI(sortColumn, order,'');
    return {
      sortColumn,
      order,
    };
  }

  getAPI(sortColumn: string, order: string, searchKey: string) {
    this.WarehouseService.get(
      sortColumn,
      order,
      searchKey,
      this.pageIndex + 1,
      this.pageSize
    ).subscribe((response) => {
      this.Warehouse = response.body as Warehouse[];
      this.totalRecords = response.headers.get("X-Total-Count")
        ? Number(response.headers.get("X-Total-Count"))
        : 0;
    });
  }

  deleteItem(id: number) {
    const dialogRef = this.dialog.open(RemoveWarehouseComponent, {
      width: "250px",
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.Warehouse = this.Warehouse.filter((_) => _.id !== result);
      }
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    let sortData = this.doSorting(this.sortingControl.value ?? "");
    this.getAPI(
      sortData.sortColumn,
      sortData.order,
      this.searchControl.value ?? ""
    );
  }
}
