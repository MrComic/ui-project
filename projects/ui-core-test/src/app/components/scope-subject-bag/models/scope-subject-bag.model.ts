import { AttendeeLevel } from '../../../common/atendees-level.enum';

export default interface ScopeSubjectBagModel {
  id: number;
  title: string;
  levels: AttendeeLevel[];
  scopeSubjectBagItems: number[];
}
