import { Component, OnInit } from '@angular/core';
import {
  ADD_BEE_PASTURE_HEADER,
  BEE_PASTURE_FORM,
  EDIT_BEE_PASTURE_HEADER,
  FILTERS_FARM,
} from 'src/app/mock_data/bee-pasture';
import {
  ADD_FARM_FOREST_HEADER,
  EDIT_FARM_FOREST_HEADER,
  FARM_FOREST_FORM,
} from 'src/app/mock_data/farm-forest-tree';
import { AddProductionProcessHeaderService } from 'src/app/shared/components/add-production-process-header/add-production-process-header.service';
import { ProductionProcessHeaderModel } from 'src/app/shared/components/add-production-process-header/production-process-header.model';
import { FilterModel } from 'src/app/shared/components/cards/card-filter/card-filter.model';
import { QuestionGroupModel } from 'src/app/shared/components/form/models/question-group.model';
import { FormService } from 'src/app/shared/components/form/services/form.service';
import { RouterService } from 'src/app/shared/services/route.service';

@Component({
  selector: 'app-add-bee-pasture',
  templateUrl: './add-bee-pasture.component.html',
  styleUrls: ['./add-bee-pasture.component.scss'],
})
export class AddBeePastureComponent implements OnInit {
  public headerItems: ProductionProcessHeaderModel[];
  public isFormOpen: boolean = true;
  public questions!: QuestionGroupModel;
  public filters: FilterModel[];
  public filterValue: string = 'total';

  constructor(
    private productionProcessHeaderService: AddProductionProcessHeaderService,
    private formService: FormService,
    private routerService:RouterService
  ) {}

  ngOnInit(): void {
    this.headerItems = ADD_BEE_PASTURE_HEADER;
    this.productionProcessHeaderService.emitAddSpatialHeaderItems(
      this.headerItems
    );

    this.questions = this.formService.createQuestionGroup({
      key: '',
      questions: BEE_PASTURE_FORM,
      options: { gridProps: { cols: 8 }, hasButton: true },
    });
    this.filters = FILTERS_FARM;
  }

  toggleForm() {
    this.isFormOpen = !this.isFormOpen;
    this.headerItems = EDIT_BEE_PASTURE_HEADER;
    this.productionProcessHeaderService.emitAddSpatialHeaderItems(
      this.headerItems
    );
  }

  downloadExcel() {
    console.log('download');
  }

  public myFormGroup: QuestionGroupModel = {
    questions: BEE_PASTURE_FORM,
    key: 'myForm',
    label: '',
    formGroup: this.formService.setFormGroup(FARM_FOREST_FORM),
  };

  onSubmit(data: any) {
    console.log(data);
  }

  setFilterValue(filter: FilterModel) {
    this.filterValue = filter.filterValue;
  }

  nextPage(): void {
    console.log('nexr');
    this.routerService.navigate('forestry/forest-management/production-process/bee-pasture/results')
  }

  previousPage(): void {
    console.log('previous');
  }
}
