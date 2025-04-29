import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ScopeSubjectModel } from '../models/scope-subject.model';
import { AttendeeLevel } from '../../../common/atendees-level.enum';

@Injectable({
  providedIn: 'root',
})
export class ScopeSubjectService {
  private fakeData: ScopeSubjectModel[] = [
    {
      id: 1,
      title: 'Entity framework',
      scopeId: 1,
      scopeTitle: 'dotnet',
      levels: [AttendeeLevel.junior, AttendeeLevel.midLevel],
    },
    {
      id: 2,
      title: 'asp.net',
      scopeId: 1,
      scopeTitle: 'dotnet',
      levels: [AttendeeLevel.junior, AttendeeLevel.midLevel],
    },
    {
      id: 3,
      title: 'C#',
      scopeId: 1,
      scopeTitle: 'dotnet',
      levels: [AttendeeLevel.all],
    },
  ];

  private subjectData$: BehaviorSubject<ScopeSubjectModel[]> =
    new BehaviorSubject<ScopeSubjectModel[]>(this.fakeData);

  constructor() {}

  getAll(): Observable<ScopeSubjectModel[]> {
    return this.subjectData$.asObservable();
  }

  getWithSubjectId(subjectId: number) {
    return of(
      this.subjectData$.getValue().filter((p) => p.scopeId == subjectId)
    );
  }

  get(subjectId: number) {
    return of(this.subjectData$.getValue().find((p) => p.id == subjectId));
  }

  addSubject(newSubject: ScopeSubjectModel): void {
    const currentData = this.subjectData$.getValue();
    this.subjectData$.next([...currentData, newSubject]);
  }

  updateSubject(id: number, updatedSubject: Partial<ScopeSubjectModel>): void {
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
