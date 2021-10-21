import { AbstractControl, FormGroup } from "@angular/forms";

export function ConfirmPasswordValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      let control = formGroup.controls[controlName];
      let matchingControl = formGroup.controls[matchingControlName]
      if (matchingControl.errors && !matchingControl.errors.matching) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ matching: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

