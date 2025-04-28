import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreCheckboxComponent } from './core-checkbox.component';

describe('CoreCheckboxComponent', () => {
  let component: CoreCheckboxComponent;
  let fixture: ComponentFixture<CoreCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreCheckboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
