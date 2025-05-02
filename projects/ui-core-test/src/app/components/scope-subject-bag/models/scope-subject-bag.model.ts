import { AttendeeLevel } from '../../../common/atendees-level.enum';

export default interface ScopeSubjectBagModel {
  id: number;
  title: string;
  levels: AttendeeLevel[];
  scopeSubjectBagItems: scopeSubjectBagItem[];
}

export interface scopeSubjectBagItem {
  id: number;
  scopetitle: string;
  scopeId: number;
  subjectTitle: string;
  subjectId: number;
}
