import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent],
      imports: [RouterTestingModule, MatButtonModule, FormsModule, BrowserAnimationsModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatFormFieldModule,
        MatSidenavModule,
        MatIconModule,
        MatMenuModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatGridListModule,
        MatSelectModule,]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.selectOptions = {
      constructData: ['id', 'userId', 'title', 'body'],
      viewData: ['id', 'userId', 'title', 'body'],
    };
    component.tableData = [{body: '', id: 1, title: '', userId: 1}];
    component.columns = ['id', 'userId', 'title', 'body'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component gets data from @Input', () => {
    expect(component.selectOptions.constructData && component.selectOptions.viewData && component.tableData && component.columns).toBeTruthy();
  });
});
