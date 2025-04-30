import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AttendeeLevel } from '../../../common/atendees-level.enum';
import ScopeSubjectBagModel from '../models/scope-subject-bag.model';

@Injectable()
export class ScopeSubjectBagServiceService {
  private fakeData: ScopeSubjectBagModel[] = [];

  private subjectData$: BehaviorSubject<ScopeSubjectBagModel[]> =
    new BehaviorSubject<ScopeSubjectBagModel[]>(this.fakeData);

  constructor() {}

  getAll(): Observable<ScopeSubjectBagModel[]> {
    return this.subjectData$.asObservable();
  }

  get(subjectId: number) {
    return of(this.subjectData$.getValue().find((p) => p.id == subjectId));
  }

  addSubject(newSubject: ScopeSubjectBagModel): void {
    const currentData = this.subjectData$.getValue();
    this.subjectData$.next([...currentData, newSubject]);
  }

  updateSubject(
    id: number,
    updatedSubject: Partial<ScopeSubjectBagModel>
  ): void {
    const currentData = this.subjectData$.getValue();
    const updatedData = currentData.map((subject) =>
      subject.id === id ? { ...subject, ...updatedSubject } : subject
    );
    this.subjectData$.next(updatedData);
  }

  deleteSubject(id: number): void {
    const currentData = this.subjectData$.getValue();
    const updatedData = currentData.filter((subject) => subject.id !== id);
    this.subjectData$.next(updatedData);
  }
}
