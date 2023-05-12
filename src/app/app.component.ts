import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TIPS } from './tips';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TipCalculatorApp';
  _tips = TIPS;
  selectedTip: number = NaN;
  isFormSubmit: boolean = false;
  form!: FormGroup;

  tipAmountPerPerson: number = 0;
  totalPerPerson: number = 0;
  totalBill: number = 0;

  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.create();
  }

  create() {
    this.form = this.formBuilder.group({
      bill: [null, [Validators.required]],
      tip: [0],
      customTip: [null, [Validators.required]],
      people: [null, [Validators.required]]
    });
  }

  calculate() {
    let bill = this.f['bill'].value;
    let tip = this.f['tip'].value;
    let people = this.f['people'].value;
    let calcTip = bill * (tip / 100);
    this.totalBill = bill + calcTip;
    this.tipAmountPerPerson = calcTip / people;
    this.totalPerPerson = this.totalBill / people;

  }

  get f() { return this.form.controls; }

  tipSelected(t: number) {
    this.selectedTip = t;
    this.f['tip'].setValue(t);
    this.calculate();
  }

  reset() {
    this.form.reset();
    this.selectedTip = NaN;
    this.tipAmountPerPerson = 0;
    this.totalPerPerson = 0;
    this.totalBill = 0;
  }
}
