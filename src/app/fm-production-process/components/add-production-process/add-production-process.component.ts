import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-production-process',
  templateUrl: './add-production-process.component.html',
  styleUrls: ['./add-production-process.component.scss']
})
export class AddProductionProcessComponent implements OnInit {
  @ViewChild('createForm') f: NgForm;

  public seasonOptions: { text: string; isShmita: boolean; value: number }[] = [
    { text: 'תש"פ 2020 - 2021', isShmita: true, value: 1 },
    { text: 'תש"פ 2020 - 2021', isShmita: false, value: 2 },
    { text: 'תש"פ 2020 - 2021', isShmita: true, value: 13 },
  ];

  public gardeningOptions: { text: string; value: number }[] = [
    { text: 'גולני', value: 1 },
    { text: 'אשתאשול', value: 2 },
    { text: 'גילת', value: 3 },
  ];

  public planTypeOptions: { text: string; value: number }[] = [
    { text: 'תוכניות ייצור - מרעה דבורים מרחב צפון', value: 1 },
    { text: 'תוכניות ייצור - מרחב מרכז', value: 2 },
    { text: 'תוכניות ייצור - יער מישקי מרחב דרום', value: 3 },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
