import { AddBeePastureTableModel } from "../bee-pasture/components/add-bee-pasture/components/add-bee-pasture-table/add-bee-pasture-table.model";
import { FarmForestTreeTypeSingalTableModel } from "../farm-forest-tree-type/components/farm-forest-tree-type/components/farm-forest-tree-type-singal-table/farm-forest-tree-type-singal-table.model";
import { FarmForestTotalTableModel } from "../fm-pp-farm-forest-program/components/farm-forest-results/components/farm-forest-total-table/farm-forest-total-table.model";
import { FarmForestTreeTableModel } from "../fm-pp-farm-forest-program/components/farm-forest-results/components/farm-forest-tree-table/farm-forest-tree-table.model";
import { FarmForestTableModel } from "../fm-pp-farm-forest-program/components/farm-forest/components/farm-forest-table/farm-forest-table.model";
import { ProductionProcessHeaderModel } from "../shared/components/add-production-process-header/production-process-header.model";
import { FilterModel } from "../shared/components/cards/card-filter/card-filter.model";
import { QuestionSelectModel } from "../shared/components/form/models/question-select.model";
import { QuestionTextModel } from "../shared/components/form/models/question-text.model";
import { Question } from "../shared/components/form/services/form.service";

export const ADD_BEE_PASTURE_HEADER: ProductionProcessHeaderModel[] = [
    {
      text: 'הוספת תכנית ייצור מרעה דבורים',
      size: '2.6',
      color: 'text',
    },
    {
      text: 'תשפ"ט 2021- 2022',
      size: '2.3',
      color: 'text',
    },
    {
      text: 'בטיפול',
      size: '1.6',
      color: 'accent',
    },
  ];

  export const RESULT_BEE_PASTURE_HEADER: ProductionProcessHeaderModel[] = [
    {
      text: 'תכנית ייצור מרעה דבורים',
      size: '2.6',
      color: 'text',
    },
    {
      text: 'תשפ"ט 2021- 2022',
      size: '2.3',
      color: 'text',
    },
    {
      text: 'בטיפול',
      size: '1.6',
      color: 'accent',
    },
  ];
  export const EDIT_BEE_PASTURE_HEADER: ProductionProcessHeaderModel[] = [
    {
        text: 'עריכת תוכנית ייצור מרכה דבורים ',
        size: '2.6',
        color: 'text',
      },
    {
      text: 'גילת',
      size: '2.3',
      color: 'text',
    },
    {
      text: 'תשפ"ט 2021- 2022',
      size: '2.3',
      color: 'text',
    },
    {
      text: 'בטיפול',
      size: '1.6',
      color: 'accent',
    },
  ];
  
  export const BEE_PASTURE_FORM: Question[] = [
    new QuestionSelectModel({
      key: 'plantSeason',
      label: 'עונת נטיעה',
      gridProps: {
        cols: 2,
      },
      options: [
        { label: 'A ', value: 'A ' },
        { label: 'B', value: 'B' },
        { label: 'C', value: 'C' },
      ],
    }),
    new QuestionSelectModel({
      key: 'status',
      label: 'סטטוס',
      gridProps: {
        cols: 2,
      },
      options: [
        { label: 'A ', value: 'A ' },
        { label: 'B', value: 'B' },
        { label: 'C', value: 'C' },
      ],
    }),

  ];
  
  export const FILTERS_FARM: FilterModel[] = [
    new FilterModel({
        label: 'אשתאול',
        value: 5015,
        filterValue: 'ashtaol',
        // svgUrl: 'assets/images/spatial-christmass-tree.svg',
        svgUrl: 'edit',
      }),
      new FilterModel({
        label: 'גולני',
        value: 5135,
        filterValue: 'golani',
        // svgUrl: 'assets/images/spatial-tree.svg',
        svgUrl: 'edit',
      }),
      new FilterModel({
        label: 'גילת',
        value: 2505,
        filterValue: 'gilat',
        // svgUrl: 'assets/images/spatial-eucalyptus.svg',
        svgUrl: 'edit',
      }),
      new FilterModel({
        label: 'סה"כ',
        value: 9419,
        filterValue: 'total',
        // svgUrl: 'assets/images/spatial-shape.svg',
        svgUrl: 'edit',
      }),
  ];
  
  export const  ADD_BEE_PASTURE_TABLE_DATA:AddBeePastureTableModel[]=[
    { 
      id:1,
      plantType:'אקליפטוס טהור',
      total:'15000',
      ashtaol:'10000',
      golani:'5000',
      gilat:'',
  },
  {
    id:2,
    plantType:'אקליפטוס טהור',
    total:'5000',
    ashtaol:'3000',
    golani:'',
    gilat:'2000',
},
{ 
  id:1,
  plantType:'אקליפטוס טהור',
  total:'15000',
  ashtaol:'10000',
  golani:'5000',
  gilat:'',
},
{
id:2,
plantType:'אקליפטוס טהור',
total:'5000',
ashtaol:'3000',
golani:'',
gilat:'2000',
},
{ 
  id:1,
  plantType:'אקליפטוס טהור',
  total:'15000',
  ashtaol:'10000',
  golani:'5000',
  gilat:'',
},
{
id:2,
plantType:'אקליפטוס טהור',
total:'5000',
ashtaol:'3000',
golani:'',
gilat:'2000',
},
{ 
  id:1,
  plantType:'אקליפטוס טהור',
  total:'15000',
  ashtaol:'10000',
  golani:'5000',
  gilat:'',
},
{
id:2,
plantType:'אקליפטוס טהור',
total:'5000',
ashtaol:'3000',
golani:'',
gilat:'2000',
},
{ 
  id:1,
  plantType:'אקליפטוס טהור',
  total:'15000',
  ashtaol:'10000',
  golani:'5000',
  gilat:'',
},
{
id:2,
plantType:'אקליפטוס טהור',
total:'5000',
ashtaol:'3000',
golani:'',
gilat:'2000',
},
{ 
  id:1,
  plantType:'אקליפטוס טהור',
  total:'15000',
  ashtaol:'10000',
  golani:'5000',
  gilat:'',
},
{
id:2,
plantType:'אקליפטוס טהור',
total:'5000',
ashtaol:'3000',
golani:'',
gilat:'2000',
},

  ]

  export const  RESULTS_BEE_PASTURE_TOTAL_TABLE_DATA:AddBeePastureTableModel[]=[
    { 
      id:1,
      
      plantType:'אקליפטוס טהור',
      total:'15000',
      ashtaol:'10000',
      golani:'5000',
      gilat:'',
  },
  {
    id:2,
    
    plantType:'אקליפטוס טהור',
    total:'5000',
    ashtaol:'3000',
    golani:'',
    gilat:'2000',
},
  ]

  
  



  export const RESULTS_BEE_PASTURE_SINGAL_TABLE_DATA: FarmForestTreeTypeSingalTableModel[] =
  [
    {
      id: 1,
      plantType: 'אקליפטוס טהור',
      total: '5000',
    },
    {
      id: 11,
      plantType: 'אקליפטוס טהור',
      total: '5000',
    },
    {
      id: 13,
      plantType: 'אקליפטוס טהור',
      total: '5000',
    },
  ];