import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreLoginComponent } from './core-login.component';

describe('CoreLoginComponent', () => {
  let component: CoreLoginComponent;
  let fixture: ComponentFixture<CoreLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
