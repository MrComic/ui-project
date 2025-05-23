import { v4 as uuidv4 } from 'uuid';

export class Guid {
  private value: string = this.empty;

  constructor(value?: string) {
    if (value) {
      if (Guid.isValid(value)) {
        this.value = value;
      }
    }
  }

  public static newGuid(): Guid {
    return new Guid(uuidv4());
  }

  public static get empty(): string {
    return '00000000-0000-0000-0000-000000000000';
  }

  public get empty(): string {
    return Guid.empty;
  }

  public static isValid(str: string): boolean {
    const validRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return validRegex.test(str);
  }

  public toString() {
    return this.value;
  }

  public toJSON(): string {
    return this.value;
  }
}

export function generateId(): Guid {
  return Guid.newGuid();
}
