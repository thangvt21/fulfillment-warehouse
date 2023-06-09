import { Component } from "@angular/core";
import { Product } from "../../interfaces/product";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ProductService } from "../../services/product.service";
import { PageEvent } from "@angular/material/paginator";
import { RemoveProductsComponent } from "../remove-products/remove-products.component";
import { read, utils, writeFile } from "xlsx";
@Component({
  selector: "app-all-products",
  templateUrl: "./all-products.component.html",
  styleUrls: ["./all-products.component.css"],
})
export class AllProductsComponent {
  Product: Product[] = [];
  data: any[] = [];
  sortingControl = new FormControl("");
  searchControl = new FormControl("");
  pageIndex: number = 0;
  pageSize: number = 5;
  totalRecords: number = 0;
  constructor(
    private ProductService: ProductService,
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
    this.ProductService.get(
      sortColumn,
      order,
      searchKey,
      this.pageIndex + 1,
      this.pageSize
    ).subscribe((response) => {
      this.Product = response.body as Product[];
      this.totalRecords = response.headers.get("X-Total-Count")
        ? Number(response.headers.get("X-Total-Count"))
        : 0;
    });
  }

  deleteItem(id: number) {
    const dialogRef = this.dialog.open(RemoveProductsComponent, {
      width: "250px",
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.Product = this.Product.filter((_) => _.id !== result);
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

  handleImport($event: any) {
    const files = $event.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;
        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          this.data = rows;
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }

  handleExport() {
    const headings = [
      [
        "id",
        "name",
        "code",
        "weightUnit",
        "weight",
        "Lenght",
        "Width",
        "Height",
        "description",
        "imgUrl",
      ],
    ];
    const wb = utils.book_new();
    const ws: any = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, this.data, { origin: "A2", skipHeader: true });
    utils.book_append_sheet(wb, ws, "Template");
    writeFile(wb, "Product_template.csv");
  }
}
