import { Component, OnInit } from "@angular/core";
import { STATUS_COMMENT, STATUS_HEADER } from "src/app/mock_data/production-process-status";
import { AddProductionProcessHeaderService } from "src/app/shared/components/add-production-process-header/add-production-process-header.service";
import { ProductionProcessHeaderModel } from "src/app/shared/components/add-production-process-header/production-process-header.model";
import { FilterModel } from "src/app/shared/components/cards/card-filter/card-filter.model";
import { QuestionGroupModel } from "src/app/shared/components/form/models/question-group.model";
import { FormService } from "src/app/shared/components/form/services/form.service";
import {
  ADD_SPATIAL_HEADER,
  SPATIAL_COMMENT,
  EDIT_SPATIAL_HEADER,
  SPATIAL_HEADER_FORM,FILTERS_SPATIAL
} from "../../../mock_data/production-process";
@Component({
  selector: 'app-production-process-status',
  templateUrl: './production-process-status.component.html',
  styleUrls: ['./production-process-status.component.scss']
})
export class ProductionProcessStatusComponent implements OnInit {
  public headerItems: ProductionProcessHeaderModel[];
  public comment: string;
  public isFormOpen: boolean = true;
  public questions!: QuestionGroupModel;
  public filters:FilterModel[];
public filterValue:string='total'
  constructor(
    private productionProcessHeaderService: AddProductionProcessHeaderService,
    private formService: FormService,
 
  ) {}

  ngOnInit(): void {
    this.headerItems = STATUS_HEADER;
    this.productionProcessHeaderService.emitAddSpatialHeaderItems(
      this.headerItems
    );

    this.comment = STATUS_COMMENT;
    this.productionProcessHeaderService.emitComment(this.comment);
  }


  downloadExcel(){
    console.log('download');
  }
 

  // onSubmit(data: any) {
  //   console.log(this.myFormGroup.formGroup.value);
  // }



}
 