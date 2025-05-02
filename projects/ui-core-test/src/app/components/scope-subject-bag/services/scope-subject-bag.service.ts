import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AttendeeLevel } from '../../../common/atendees-level.enum';
import ScopeSubjectBagModel from '../models/scope-subject-bag.model';

@Injectable()
export class ScopeSubjectBagServiceService {
  private fakeData: ScopeSubjectBagModel[] = [
    {
      id: 1,
      levels: [AttendeeLevel.all],
      scopeSubjectBagItems: [],
      title: 'بسته آموزشی 1',
    },
  ];

  private subjectData$: BehaviorSubject<ScopeSubjectBagModel[]> =
    new BehaviorSubject<ScopeSubjectBagModel[]>(this.fakeData);

  constructor() {}

  getAll(): Observable<ScopeSubjectBagModel[]> {
    return this.subjectData$.asObservable();
  }

  get(id: number) {
    return of(this.fakeData.find((p) => p.id == id));
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

  addSubjectBagSubject(
    id: number,
    scopetitle: string,
    scopeId: number,
    subjectTitle: string,
    subjectId: number
  ) {
    let subjectBag = this.fakeData.find((p) => p.id == id);
    if (!subjectBag) return;
    let subjectBagItem = subjectBag.scopeSubjectBagItems.find(
      (p) => p.subjectId == subjectId
    );
    if (subjectBagItem) return;
    subjectBag.scopeSubjectBagItems.push({
      id: id,
      scopeId: scopeId,
      scopetitle: scopetitle,
      subjectId: subjectId,
      subjectTitle: subjectTitle,
    });
  }

  deleteSubject(id: number): void {
    const currentData = this.subjectData$.getValue();
    const updatedData = currentData.filter((subject) => subject.id !== id);
    this.subjectData$.next(updatedData);
  }
}
