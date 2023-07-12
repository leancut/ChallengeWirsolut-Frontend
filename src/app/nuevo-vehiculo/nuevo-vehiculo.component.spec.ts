import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoVehiculoComponent } from './nuevo-vehiculo.component';

describe('NuevoVehiculoComponent', () => {
  let component: NuevoVehiculoComponent;
  let fixture: ComponentFixture<NuevoVehiculoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoVehiculoComponent]
    });
    fixture = TestBed.createComponent(NuevoVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
