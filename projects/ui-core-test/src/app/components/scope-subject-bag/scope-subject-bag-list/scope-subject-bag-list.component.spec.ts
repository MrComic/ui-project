import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScopeSubjectBagListComponent } from './scope-subject-bag-list.component';

describe('ScopeSubjectBagListComponent', () => {
  let component: ScopeSubjectBagListComponent;
  let fixture: ComponentFixture<ScopeSubjectBagListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScopeSubjectBagListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScopeSubjectBagListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
