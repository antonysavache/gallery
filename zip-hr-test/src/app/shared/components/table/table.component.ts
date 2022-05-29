import { AfterViewInit, ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectDataInterface } from '../../interfaces/select-data.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})

export class TableComponent implements AfterViewInit {
  @Input() tableData!: any;
  @Input() columns!: string[];
  @Input() selectOptions: SelectDataInterface;
  selectedValue: string;
  sortedValue: string;
  matRippleRadius = 100;
  renderData: any;

  displayedColumns!: string[];
  dataSource = new MatTableDataSource(this.tableData);
  isClicked = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private cdr: ChangeDetectorRef,
              private router: Router,
              private route: ActivatedRoute) {
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;

    if (filterValue) {

      switch (this.selectedValue) {
        case this.selectOptions.viewData[0]:
          this.renderData = this.tableData.filter(
            (x: any) => x[this.selectOptions.constructData[0]] === Number(filterValue)
          );
          break;
        case this.selectOptions.viewData[1]:
          this.renderData = this.tableData.filter(
            (x: any) => x[this.selectOptions.constructData[1]] === Number(filterValue)
          );
          break;
        case this.selectOptions.viewData[2]:
          this.renderData = this.tableData.filter(
            (x: any) => x[this.selectOptions.constructData[2]].includes(filterValue)
          );
          break;
        case this.selectOptions.viewData[3]:
          this.renderData = this.tableData.filter(
            (x: any) => x[this.selectOptions.constructData[3]].includes(filterValue)
          );
          break;
      }

    } else {
      this.renderData = this.tableData.slice(0, this.tableData.length - 1);
    }

    this.changeQueryParamFiltering(filterValue, this.selectOptions.constructData[this.selectOptions.viewData.indexOf(this.selectedValue)]);
    this.changeQueryParamPaging(this.renderData.length)


    this.dataSource.data = this.renderData;
  }


  changeQueryParamPaging(lastElement?: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        'last-page-element': lastElement,
      },
      queryParamsHandling: 'merge',
    });
  }

  changeQueryParamFiltering(filteredValue?: string, selectedOption?: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        'filtered-value': filteredValue,
        'selected-option': selectedOption
      },
      queryParamsHandling: 'merge',
    });
  }

  handlePageEvent(e: PageEvent) {
    this.changeQueryParamPaging((e.pageIndex + 1) * e.pageSize);
  }

  ngAfterViewInit() {
    this.renderData = this.tableData;
    this.dataSource.data = this.renderData;
    this.dataSource.paginator = this!.paginator;
    this.dataSource.sort = this.sort;
    this.displayedColumns = this.columns;
    this.selectedValue = this.selectOptions.viewData[0];
    this.cdr.detectChanges();
  }
}
