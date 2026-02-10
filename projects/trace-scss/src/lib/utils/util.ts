import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class Utils {

  public static aggridHeaderHeight() {
    return {
      rowHeight: 30,
      headerHeight: 30,
    }
  }

  public static getBaseThemeAgGridCol() {
    return {
      sortable: true,
      resizable: true,
      filter: true,
      editable: false,
      // enableCellTextSelection: true,
      cellStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
      }
    }
  }
  public static customValidator(type: string): ValidatorFn {
    const patterns: { [key: string]: RegExp } = {
      PAN: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, // Format: ABCDE1234F
      PHONE: /^[1-9]\d{11}$/, // 12-digit phone number
      AADHAR: /^[0-9]{12}$/, // 12-digit Aadhar number
      UAN: /^[0-9]{12}$/, // 12-digit UAN number
      PASSPORT: /^[A-Z][1-9]{2}[0-9]{2}[A-Za-z0-9]{3}$/, // Format: A12B34C56
      LICENSE: /^[a-zA-Z]{0,2}[\d]+$/, // Format: AB12CD3456
      NAME: /^(?! )[A-Za-z]+(?: [A-Za-z]+)*\s*$/, // Name with max 75 characters, only letters and spaces
      PINCODE: /^[1-9][0-9]{5}$/, // 6-digit PIN code
      PASSPORT_FILE_NUMBER: /^[0-9]{16}$/, // 16-digit passport file number
      EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Email format
    };

    return (control: AbstractControl): ValidationErrors | null => {
      const pattern = patterns[type];
      if (!control.value || !pattern) {
        return null; // Allow empty value or invalid type
      }
      return !pattern.test(control.value) ? { invalidFormat: true } : null;
    };
  }

  public static preventKeyPress(event: KeyboardEvent, type: string): void {
    const patterns: { [key: string]: RegExp } = {
      PAN: /^[A-Z0-9]$/, // Allow uppercase letters and digits
      PHONE: /^[0-9]$/, // Allow digits only
      AADHAR: /^[0-9]$/, // Allow digits only
      UAN: /^[0-9]$/, // Allow digits only
      PASSPORT: /^[A-Za-z0-9]$/, // Allow alphanumeric characters
      LICENSE: /^[A-Za-z0-9]$/, // Allow alphanumeric characters
      NAME: /^[A-Za-z\s]$/, // Allow letters and spaces
      PINCODE: /^[0-9]$/, // Allow digits only
      PASSPORT_FILE_NUMBER: /^[0-9]$/, // Allow digits only
      EMAIL: /^[a-zA-Z0-9._%+-@]$/, // Allow email characters
    };

    if (event.key === 'Backspace') {
      return; // Allow backspace
    }

    const pattern = patterns[type];
    if (pattern && !pattern.test(event.key)) {
      event.preventDefault(); // Prevent invalid key press
    }
  }

  public static filterInput(input: HTMLInputElement, type: string): void {
    const patterns: { [key: string]: RegExp } = {
      PAN: /[^A-Z0-9]/g,
      PHONE: /[^0-9]/g,
      AADHAR: /[^0-9]/g,
      UAN: /[^0-9]/g,
      PASSPORT: /[^A-Za-z0-9]/g,
      LICENSE: /[^A-Za-z0-9]/g,
      NAME: /[^A-Za-z\s]/g,
      PINCODE: /[^0-9]/g,
      PASSPORT_FILE_NUMBER: /[^0-9]/g,
      EMAIL: /[^a-zA-Z0-9._%+-@]/g,
    };

    input.value = input.value.replace(patterns[type], '');
  }

  public static formatInput(input: HTMLInputElement, type: string): void {
    const patterns: { [key: string]: RegExp } = {
      PAN: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, // Format: ABCDE1234F
      PHONE: /^[0-9]\d{11}$/, // 12-digit phone number
      AADHAR: /^[0-9]{12}$/, // 12-digit Aadhar number
      UAN: /^[0-9]{12}$/, // 12-digit UAN number
      PASSPORT: /^[A-Z][0-9]{2}[0-9]{2}[A-Za-z0-9]{3}$/, // Format: A12B34C56
      LICENSE: /^[a-zA-Z]{0,2}[\d]+$/, // Format: AB12CD3456
      NAME: /^[A-Za-z\s]{1,75}$/, // Name with max 75 characters, only letters and spaces
      PINCODE: /^[0-9][0-9]{5}$/, // 6-digit PIN code
      PASSPORT_FILE_NUMBER: /^[0-9]{16}$/, // 16-digit passport file number
      EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Email format
    };

    const pattern = patterns[type];
    if (pattern && !pattern.test(input.value)) {
      input.value = ''; // Reset the input value if it doesn't match the pattern
    }
  }

  public static isValidInput(input: string, type: string): boolean {
    const patterns: { [key: string]: RegExp } = {
      PAN: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, // Format: ABCDE1234F
      PHONE: /^[0-9]\d{11}$/, // 12-digit phone number
      AADHAR: /^[0-9]{12}$/, // 12-digit Aadhar number
      UAN: /^[0-9]{12}$/, // 12-digit UAN number
      PASSPORT: /^[A-Z][0-9]{2}[0-9]{2}[A-Za-z0-9]{3}$/, // Format: A12B34C56
      LICENSE: /^[a-zA-Z]{0,2}[\d]+$/, // Format: AB12CD3456
      NAME: /^[A-Za-z\s]{1,75}$/, // Name with max 75 characters, only letters and spaces
      PINCODE: /^[0-9][0-9]{5}$/, // 6-digit PIN code
      PASSPORT_FILE_NUMBER: /^[0-9]{16}$/, // 16-digit passport file number
      EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Email format
    };

    const pattern = patterns[type];
    return pattern ? pattern.test(input) : false;
  }

  public static formatDate(date: Date): string {
    const newDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    };
    return newDate.toLocaleDateString('en-IN', options).replace(/\s/g, '-');
  }

  public static calculateAge(dobString: Date) {
    const dob = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    const dayDiff = today.getDate() - dob.getDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }
    return age;
  }
  public static formatCurrencyIndian(value: number | string): string {
    const num = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(num)) {
      return '';
    }
    return num.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0, // Ensure two decimal places for currency
      maximumFractionDigits: 2,
    });
  }
}
