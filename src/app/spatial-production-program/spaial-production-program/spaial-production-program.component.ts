import { Component, OnInit } from "@angular/core";
import { ADD_SPATIAL_HEADER, EDIT_SPATIAL_HEADER, FILTERS_SPATIAL, SPATIAL_COMMENT, SPATIAL_HEADER_FORM } from "src/app/mock_data/production-process";
import { AddProductionProcessHeaderService } from "src/app/shared/components/add-production-process-header/add-production-process-header.service";
import { ProductionProcessHeaderModel } from "src/app/shared/components/add-production-process-header/production-process-header.model";
import { FilterModel } from "src/app/shared/components/cards/card-filter/card-filter.model";
import { QuestionGroupModel } from "src/app/shared/components/form/models/question-group.model";
import { FormService } from "src/app/shared/components/form/services/form.service";
import { SpatialTotalTableService } from "../spatial-total-table/spatial-total-table.service";
// import {
//   ADD_SPATIAL_HEADER,
//   SPATIAL_COMMENT,
//   EDIT_SPATIAL_HEADER,
//   SPATIAL_HEADER_FORM,FILTERS_SPATIAL
// } from "../../../mock_data/production-process";
@Component({
  selector: "app-spaial-production-program",
  templateUrl: "./spaial-production-program.component.html",
  styleUrls: ["./spaial-production-program.component.scss"],
})
export class SpaialProductionProgramComponent implements OnInit {
  public headerItems: ProductionProcessHeaderModel[];
  public comment: string;
  public isFormOpen: boolean = true;
  public questions!: QuestionGroupModel;
  public filters:FilterModel[];
public filterValue:string='total'
  constructor(
    private productionProcessHeaderService: AddProductionProcessHeaderService,
    private formService: FormService,
    private spatialTotalTableService:SpatialTotalTableService
  ) {}

  ngOnInit(): void {
    this.headerItems = ADD_SPATIAL_HEADER;
    this.productionProcessHeaderService.emitAddSpatialHeaderItems(
      this.headerItems
    );

    this.comment = SPATIAL_COMMENT;
    this.productionProcessHeaderService.emitComment(this.comment);
    this.questions = this.formService.createQuestionGroup({
      key: '',
      questions: SPATIAL_HEADER_FORM,
      options: { gridProps: { cols: 8 }, hasButton: true },
    });
    this.filters=FILTERS_SPATIAL
  }

  toggleForm() {
    this.isFormOpen = !this.isFormOpen;
    this.headerItems = EDIT_SPATIAL_HEADER;
    this.productionProcessHeaderService.emitAddSpatialHeaderItems(
      this.headerItems
    );
  }

  downloadExcel(){
    console.log('download');
  }
  public myFormGroup: QuestionGroupModel = {
    questions: SPATIAL_HEADER_FORM,
    key: 'myForm',
    label: '',
    formGroup: this.formService.setFormGroup(SPATIAL_HEADER_FORM),
  };

  onSubmit(data: any) {
    console.log(this.myFormGroup.formGroup.value);
  }

  setFilterValue(filter:FilterModel){
    this.filterValue=filter.filterValue;
    this.spatialTotalTableService.emitData()
  }

}
 