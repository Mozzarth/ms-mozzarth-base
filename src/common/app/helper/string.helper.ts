import { v4 as uuidv4 } from 'uuid';

export class StringHelper {
  public static generateUUID(): string {
    return uuidv4();
  }

  public static trimString(input: string): string {
    return input.trim();
  }

  public static replaceEanMasterDun(value: string): string {
    if (value.length > 1) value = 'X' + value.slice(1);

    if (value.length > 6) {
      const midIndex = Math.floor(value.length / 2);
      value = value.slice(0, midIndex) + 'X' + value.slice(midIndex + 1);
    }
    return value;
  }
}
