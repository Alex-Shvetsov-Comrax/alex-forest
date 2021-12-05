import { Component, OnInit } from "@angular/core";
import { ADD_FARM_FOREST_HEADER, EDIT_FARM_FOREST_HEADER, FARM_FOREST_FORM, FILTERS_FARM } from "src/app/mock_data/farm-forest-results";
import { AddProductionProcessHeaderService } from "src/app/shared/components/add-production-process-header/add-production-process-header.service";
import { ProductionProcessHeaderModel } from "src/app/shared/components/add-production-process-header/production-process-header.model";
import { FilterModel } from "src/app/shared/components/cards/card-filter/card-filter.model";
import { QuestionGroupModel } from "src/app/shared/components/form/models/question-group.model";
import { FormService } from "src/app/shared/components/form/services/form.service";


@Component({
  selector: 'app-farm-forest-results',
  templateUrl: './farm-forest-results.component.html',
  styleUrls: ['./farm-forest-results.component.scss']
})
export class FarmForestResultsComponent implements OnInit {


  public headerItems: ProductionProcessHeaderModel[];
  public isFormOpen: boolean = true;
  public questions!: QuestionGroupModel;
  public filters:FilterModel[];
public filterValue:string='total'


  constructor(   private productionProcessHeaderService: AddProductionProcessHeaderService,
    private formService: FormService,) { }

  ngOnInit(): void {
    this.headerItems = ADD_FARM_FOREST_HEADER;
    this.productionProcessHeaderService.emitAddSpatialHeaderItems(
      this.headerItems
    );

    this.questions = this.formService.createQuestionGroup({
      key: '',
      questions: FARM_FOREST_FORM,
      options: { gridProps: { cols: 8 }, hasButton: true },
    });
    this.filters=FILTERS_FARM
  }


  
  toggleForm() {
    this.isFormOpen = !this.isFormOpen;
    this.headerItems = EDIT_FARM_FOREST_HEADER;
    this.productionProcessHeaderService.emitAddSpatialHeaderItems(
      this.headerItems
    );
  }

  downloadExcel(){
    console.log('download');
  }

  public myFormGroup: QuestionGroupModel = {
    questions: FARM_FOREST_FORM,
    key: 'myForm',
    label: '',
    formGroup: this.formService.setFormGroup(FARM_FOREST_FORM),
  };

  onSubmit(data: any) {
    console.log(data);
  }

  setFilterValue(filter:FilterModel){
    this.filterValue=filter.filterValue;
  }
}
