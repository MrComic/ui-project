import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScopeSubjectComponent } from './scope-subject.component';

describe('ScopeSubjectComponent', () => {
  let component: ScopeSubjectComponent;
  let fixture: ComponentFixture<ScopeSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScopeSubjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScopeSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
