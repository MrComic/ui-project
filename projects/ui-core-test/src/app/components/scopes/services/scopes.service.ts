import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScopesService {
  private data: any[] = [
    { id: 1, label: 'Web Development | توسعه وب', parentId: null },
    { id: 11, label: 'Frontend | فرانت‌اند', parentId: 1 },
    { id: 12, label: 'Backend | بک‌اند', parentId: 1 },
    { id: 13, label: 'Fullstack | فول‌استک', parentId: 1 },

    { id: 2, label: 'Mobile Development | توسعه موبایل', parentId: null },
    { id: 21, label: 'Android | اندروید', parentId: 2 },
    { id: 22, label: 'iOS | آی‌او‌اس', parentId: 2 },
    { id: 23, label: 'Cross-platform | کراس پلتفرم', parentId: 2 },

    { id: 3, label: 'Data Science | علم داده', parentId: null },
    { id: 31, label: 'Machine Learning | یادگیری ماشین', parentId: 3 },
    { id: 32, label: 'Deep Learning | یادگیری عمیق', parentId: 3 },
    { id: 33, label: 'Data Analysis | تحلیل داده', parentId: 3 },

    { id: 4, label: 'Game Development | توسعه بازی', parentId: null },
    { id: 41, label: '2D Games | بازی‌های دوبعدی', parentId: 4 },
    { id: 42, label: '3D Games | بازی‌های سه‌بعدی', parentId: 4 },
    { id: 43, label: 'AR/VR | واقعیت افزوده / واقعیت مجازی', parentId: 4 },

    { id: 5, label: 'Software Engineering | مهندسی نرم‌افزار', parentId: null },
    { id: 51, label: 'Design Patterns | الگوهای طراحی', parentId: 5 },
    { id: 52, label: 'Software Architecture | معماری نرم‌افزار', parentId: 5 },
    { id: 53, label: 'Testing | تست نرم‌افزار', parentId: 5 },

    { id: 6, label: 'Cybersecurity | امنیت سایبری', parentId: null },
    { id: 61, label: 'Ethical Hacking | هک اخلاقی', parentId: 6 },
    { id: 62, label: 'Network Security | امنیت شبکه', parentId: 6 },
    { id: 63, label: 'Cryptography | رمزنگاری', parentId: 6 },

    { id: 7, label: 'Artificial Intelligence | هوش مصنوعی', parentId: null },
    {
      id: 71,
      label: 'Natural Language Processing | پردازش زبان طبیعی',
      parentId: 7,
    },
    { id: 72, label: 'Computer Vision | بینایی ماشین', parentId: 7 },
    { id: 73, label: 'Robotics | رباتیک', parentId: 7 },
  ];

  constructor() {}

  getData(): any[] {
    return this.data;
  }

  addData(item: any): void {
    this.data.push(item);
  }

  clearData(): void {
    this.data = [];
  }
}
