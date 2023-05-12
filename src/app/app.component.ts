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

  isCustomTip: boolean = false;
  selectedTip: number = NaN;
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
      people: [1, [Validators.required]]
    });
  }

  get f() { return this.form.controls; }

  // Calculates Tip and total Bill and Per Person Amount
  calculate() {
    let bill = this.f['bill'].value;
    let tip = this.isCustomTip ? this.f['customTip'].value : this.f['tip'].value;
    let people = this.f['people'].value;

    let calcTip = this.isCustomTip ? tip : bill * (tip / 100);
    this.totalBill = bill + calcTip;
    this.tipAmountPerPerson = calcTip / people;
    this.totalPerPerson = this.totalBill / people;
  }

  // Custom Tip Field is changed
  customTipChange() {
    this.isCustomTip = true;
    this.selectedTip = NaN;
    this.calculate();
  }

  // Tip Button Active 
  tipSelected(t: number) {
    this.selectedTip = t;
    this.f['tip'].setValue(t);
    this.calculate();
  }

  // Resets Form
  reset() {
    this.form.reset();
    this.selectedTip = NaN;
    this.isCustomTip = false;
    this.tipAmountPerPerson = 0;
    this.totalPerPerson = 0;
    this.totalBill = 0;
  }
}
