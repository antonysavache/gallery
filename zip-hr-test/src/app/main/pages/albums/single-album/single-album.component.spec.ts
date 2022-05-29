import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleAlbumComponent } from './single-album.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialModule } from '../../../../shared/material/material.module';

describe('SingleAlbumComponent', () => {
  let component: SingleAlbumComponent;
  let fixture: ComponentFixture<SingleAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleAlbumComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, MaterialModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
