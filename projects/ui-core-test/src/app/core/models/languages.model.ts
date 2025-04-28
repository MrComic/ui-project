export class LanguageQr {
  title: string;
  isActive: boolean;
  rtl: boolean;
  businessId: string;
  id: number;

  constructor(
    title: string,
    isActive: boolean,
    rtl: boolean,
    businessId: string,
    id: number
  ) {
    this.title = title;
    this.isActive = isActive;
    this.rtl = rtl;
    this.businessId = businessId;
    this.id = id;
  }
}
