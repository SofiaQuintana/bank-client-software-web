import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  /**Controlling form html components on model, 
   * the login form constructs a json type structure 
   * grouping username and password, the value changes 
   * on real time both values are required. */
   loginForm = this.formBuilder.group ({
    username : ['', Validators.required],
    password : ['', Validators.required, Validators.minLength(8)]
  }); 

  constructor(private formBuilder: FormBuilder) { }

  onSubmit() { }
}
