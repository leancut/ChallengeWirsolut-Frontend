import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVehiculoComponent } from './add-vehiculo.component';

describe('AddVehiculoComponent', () => {
  let component: AddVehiculoComponent;
  let fixture: ComponentFixture<AddVehiculoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddVehiculoComponent]
    });
    fixture = TestBed.createComponent(AddVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
