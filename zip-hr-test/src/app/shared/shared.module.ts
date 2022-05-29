import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from './material/material.module';
import {HeaderComponent} from './components/header/header.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {RouterModule} from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { TruncateStringPipe } from './pipes/truncate-string.pipe';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    TableComponent,
    TruncateStringPipe,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  exports: [
    MaterialModule,
    HeaderComponent,
    SidebarComponent,
    TableComponent,
    TruncateStringPipe
  ]
})
export class SharedModule {
}
