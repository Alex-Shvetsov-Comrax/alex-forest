import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-footer',
  templateUrl: './page-footer.component.html',
  styleUrls: ['./page-footer.component.scss']
})
export class PageFooterComponent implements OnInit {

  @Input() icon:string='tree_top_gradient_mpk';
  @Input() size: number=20;
  @Input() color:string='primary';

  constructor() { }

  ngOnInit(): void {
  }

}
