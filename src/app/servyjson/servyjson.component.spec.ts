import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServyjsonComponent } from './servyjson.component';

describe('ServyjsonComponent', () => {
  let component: ServyjsonComponent;
  let fixture: ComponentFixture<ServyjsonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServyjsonComponent]
    });
    fixture = TestBed.createComponent(ServyjsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
