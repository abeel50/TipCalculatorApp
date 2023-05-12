import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TipCalculatorApp';
  isFormSubmit: boolean = false;
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.create();
  }

  create() {
    this.form = this.formBuilder.group({
      bill: [null, [Validators.required]],
      totalPrice: [null, [Validators.required]],
      products: []
    });
  }

  get f() { return this.form.controls; }
}
