import { AbstractControl, ValidationErrors } from '@angular/forms';


export function trimRequired(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value.trim()) {
        return {
            trimRequired: true
        }
    }
    return null
}



