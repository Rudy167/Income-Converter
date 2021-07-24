import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { data } from './countryData.util';
import { Router, NavigationEnd } from '@angular/router';
var gtag: Function;
@Component({
  selector: 'app-mat-card',
  templateUrl: './mat-card.component.html',
  styleUrls: ['./mat-card.component.scss']
})

export class MatCardComponent implements OnInit {
  sourceCountry = new FormControl('', Validators.required);
  destinationCountry = new FormControl('', Validators.required);
  sourceCountryAmount = new FormControl('', { validators: Validators.required });
  visible = true;
  resultValue: number;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['Lemon'];
  allFruits: any = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  successFlag: boolean = false;
  isDisabled: boolean = true;
  screenSize: string;
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  countryData: any;
  breakpoint: number;
  arrow_breakpoint: number;
  breakpoint_rowspan: number;
  amount_colspan : number;
  amount_colspan_currency: number;

  constructor(public router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'UA-176174620-1',
          {
            'page_path': event.urlAfterRedirects
          }
        );
      }
    }
    )
  }
  ngOnInit(): void {
    if (window.innerWidth >= 1024){
      this.screenSize = "md";
      this.breakpoint=20;
      this.amount_colspan=39;
      this.amount_colspan_currency=3;
      this.arrow_breakpoint=2;
      this.breakpoint_rowspan=6;
    }
    if (window.innerWidth < 1024) {

      this.screenSize = "md";
      this.breakpoint=20;
      this.amount_colspan=39;
      this.amount_colspan_currency=3;
      this.arrow_breakpoint=2;
      this.breakpoint_rowspan=11;

    }
    if (window.innerWidth < 768) {
      this.screenSize = "sm";
      this.breakpoint=42;
      this.amount_colspan=36;
      this.amount_colspan_currency=6;
      this.arrow_breakpoint=42;
      this.breakpoint_rowspan=15;
    }
    if (window.innerWidth < 600) {
      this.screenSize = "xs";
      this.breakpoint=42;
      this.amount_colspan=36;
      this.amount_colspan_currency=6;
      this.arrow_breakpoint=42;
      this.breakpoint_rowspan=15;
    }
    this.countryData = data;
    this.destinationCountry.valueChanges.subscribe((data) => {
      this.onSubmit();
      if (data != '' && this.sourceCountryAmount.value && this.sourceCountry.value != '') {
        this.isDisabled = false;
      }
      else {
        this.isDisabled = true;
      };
    });
    this.sourceCountry.valueChanges.subscribe((data) => {
      this.onSubmit();
      if (data != '' && this.sourceCountryAmount.value && this.destinationCountry.value != '' && this.successFlag) {
        this.isDisabled = false;
      }
      else {
        this.isDisabled = true;
      };
    });
    this.sourceCountryAmount.valueChanges.subscribe((data) => {
      this.onSubmit();
      if (data && this.sourceCountry.value && this.destinationCountry.value != '' &&  this.successFlag) {
        this.isDisabled = false;
      }
      else {
        this.isDisabled = true;
      };
    });

    this.destinationCountry.valueChanges.subscribe((data) => { if (data != '' && this.sourceCountryAmount.value && this.sourceCountry.value != '' &&  this.successFlag) { this.isDisabled = false } });


  }


  onSubmit(): void {
    this.successFlag = true;
    this.resultValue = (this.sourceCountryAmount.value * this.destinationCountry.value.mostRecentValue) / this.sourceCountry.value.mostRecentValue;


  }

  onResize(event) {
    if (window.innerWidth >= 1024){
      this.screenSize = "md";
      this.breakpoint=20;
      this.amount_colspan=39;
      this.amount_colspan_currency=3;
      this.arrow_breakpoint=2;
      this.breakpoint_rowspan=6;
    }
    if (window.innerWidth < 1024) {

      this.screenSize = "md";
      this.breakpoint=20;
      this.amount_colspan=39;
      this.amount_colspan_currency=3;
      this.arrow_breakpoint=2;
      this.breakpoint_rowspan=11;

    }
    if (window.innerWidth < 768) {
      this.screenSize = "sm";
      this.breakpoint=42;
      this.amount_colspan=36;
      this.amount_colspan_currency=6;
      this.arrow_breakpoint=42;
      this.breakpoint_rowspan=15;
    }
    if (window.innerWidth < 600) {
      this.screenSize = "xs";
      this.breakpoint=42;
      this.amount_colspan=36;
      this.amount_colspan_currency=6;
      this.arrow_breakpoint=42;
      this.breakpoint_rowspan=15;
    }
  }
}