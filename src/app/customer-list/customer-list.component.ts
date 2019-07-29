import { Component, OnInit, PipeTransform } from '@angular/core';
//import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

interface ou {
  OUName: string;
  OUAdmin: string;
  TotalProjects: number;
  Clouds: string;
  TotalResources: string;

}
const OUs: ou[] = [
  {
    OUName: 'John Wick',
    OUAdmin: 'wick@gmail.com',
    TotalProjects: 7708071422,
    Clouds: 'Azure Active Directory',
    TotalResources: '20-7-2018'
  }, {
    OUName: 'John Wick',
    OUAdmin: 'wick@gmail.com',
    TotalProjects: 1234567890,
    Clouds: 'Azure Active Directory',
    TotalResources: '21-7-2018'
  }];

function search(text: string, pipe: PipeTransform): ou[] {
  return OUs.filter(ou => {
    const term = text.toLowerCase();
    return ou.OUName.toLowerCase().includes(term)
      || pipe.transform(ou.OUAdmin).includes(term)
      || pipe.transform(ou.TotalProjects).includes(term);
  });
}

@Component({
  selector: 'customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  providers: [ DecimalPipe]
})
export class CustomerListComponent implements OnInit {
  ous$: Observable<ou[]>;
  filter = new FormControl('');

  // Class variables
  isViewable: boolean;
  iseditViewable: boolean;
  isRowViewable: boolean;
  ngOnInit() {
    this.isViewable = true;
    this.iseditViewable = true;
    this.isRowViewable = true;
  }

  constructor(  pipe: DecimalPipe) {
    this.ous$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(text, pipe))
    );
    // config.backdrop = 'static';
    // config.keyboard = false;

  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 1000) {
      return Math.round(value / 1000) + '%';
    }

    return value;
  }
  addorg(): void {
    this.isViewable = true;
    this.isRowViewable = false;
    this.iseditViewable = false;
  }
  back() {
    this.isViewable = false;
    this.isRowViewable = false;
    this.iseditViewable = false;
  }
  OuView(): void {
    this.isViewable = false;
    this.isRowViewable = true;
    this.iseditViewable = false;
  }
  Ouedit(): void {
    this.isViewable = false;
    this.iseditViewable = true;
    this.isRowViewable = false;
  }


}





