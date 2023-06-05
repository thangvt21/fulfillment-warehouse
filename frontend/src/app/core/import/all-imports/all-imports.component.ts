import { Component } from "@angular/core";
import { Import } from "../../interfaces/import";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ImportService } from "../../services/import.service";
import { PageEvent } from "@angular/material/paginator";
@Component({
  selector: "app-all-imports",
  templateUrl: "./all-imports.component.html",
  styleUrls: ["./all-imports.component.css"],
})
export class AllImportsComponent {
  Import: Import[] = [];
  sortingControl = new FormControl("");
  searchControl = new FormControl("");
  pageIndex: number = 0;
  pageSize: number = 5;
  totalRecords: number = 0;
  step = 0;

  constructor(
    private ImportService: ImportService,
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
    this.ImportService.get(
      sortColumn,
      order,
      searchKey,
      this.pageIndex + 1,
      this.pageSize
    ).subscribe((response) => {
      this.Import = response.body as Import[];
      this.totalRecords = response.headers.get("X-Total-Count")
        ? Number(response.headers.get("X-Total-Count"))
        : 0;
    });
  }

  // deleteItem(id:number){
  //   const dialogRef = this.dialog.open(DeleteDialogAccountsComponent,{
  //     width: '250px',
  //     data: {id},
  //   });

  //   dialogRef.afterClosed().subscribe((result) =>{
  //     if(result){
  //       this.Accounts = this.Accounts.filter(_=>_.id !== result);
  //     }
  //   });
  // }
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
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
