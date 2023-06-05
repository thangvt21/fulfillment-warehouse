import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { HttpClientModule } from "@angular/common/http";
import { AccountsComponent } from "./accounts/all-accounts/accounts.component";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { CreateAccountComponent } from "./accounts/add-account/add-account.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { ReactiveFormsModule } from "@angular/forms";
import { EditAccountComponent } from "./accounts/edit-account/edit-account.component";
import { MatChipsModule } from "@angular/material/chips";
import { MatSidenavModule } from "@angular/material/sidenav";
import { DeleteDialogAccountsComponent } from "./accounts/delete-dialog-accounts/delete-dialog-accounts.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { AllProductsComponent } from "./core/product/all-products/all-products.component";
import { CreateProductsComponent } from "./core/product/create-products/create-products.component";
import { EditProductsComponent } from "./core/product/edit-products/edit-products.component";
import { RemoveProductsComponent } from "./core/product/remove-products/remove-products.component";
import { AllWarehouseComponent } from "./core/warehouse/all-warehouse/all-warehouse.component";
import { EditWarehouseComponent } from "./core/warehouse/edit-warehouse/edit-warehouse.component";
import { CreateWarehouseComponent } from "./core/warehouse/create-warehouse/create-warehouse.component";
import { RemoveWarehouseComponent } from "./core/warehouse/remove-warehouse/remove-warehouse.component";
import { MatTableModule } from "@angular/material/table";
@NgModule({
  declarations: [
    AppComponent,
    AccountsComponent,
    CreateAccountComponent,
    EditAccountComponent,
    DeleteDialogAccountsComponent,
    AllProductsComponent,
    CreateProductsComponent,
    EditProductsComponent,
    RemoveProductsComponent,
    AllWarehouseComponent,
    EditWarehouseComponent,
    CreateWarehouseComponent,
    RemoveWarehouseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatSidenavModule,
    MatDialogModule,
    MatDividerModule,
    MatMenuModule,
    MatPaginatorModule,
    MatButtonToggleModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
