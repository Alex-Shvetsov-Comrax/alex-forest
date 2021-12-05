import { Component, Inject, OnInit } from '@angular/core';
import { PREFIX_MODULE } from 'src/app/shared/constants/prefix-module';
import { RouterService } from '../../services/route.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

  constructor(
    @Inject(PREFIX_MODULE) public prefix: string,
    private routerService : RouterService

  ) { }

  ngOnInit(): void {
    this.routerService.emitModulePrefix(this.prefix)
  }
}
