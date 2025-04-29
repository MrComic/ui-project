import { AttendeeLevel } from '../../../common/atendees-level.enum';

export interface ScopeSubjectModel {
  id: number;
  title: string;
  scopeId: number;
  scopeTitle: string;
  levels: AttendeeLevel[];
}
