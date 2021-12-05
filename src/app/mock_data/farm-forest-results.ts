import { FarmForestTotalTableModel } from "../fm-pp-farm-forest-program/components/farm-forest-results/components/farm-forest-total-table/farm-forest-total-table.model";
import { FarmForestTreeTableModel } from "../fm-pp-farm-forest-program/components/farm-forest-results/components/farm-forest-tree-table/farm-forest-tree-table.model";
import { FarmForestTableModel } from "../fm-pp-farm-forest-program/components/farm-forest/components/farm-forest-table/farm-forest-table.model";
import { SpatialTotalTableModel } from "../fm-pp-spatial-production-program/components/spaial-production-program/components/spatial-total-table/spatial-total-table.model";
import { ProductionProcessHeaderModel } from "../shared/components/add-production-process-header/production-process-header.model";
import { FilterModel } from "../shared/components/cards/card-filter/card-filter.model";
import { QuestionSelectModel } from "../shared/components/form/models/question-select.model";
import { QuestionTextModel } from "../shared/components/form/models/question-text.model";
import { Question } from "../shared/components/form/services/form.service";

export const ADD_FARM_FOREST_HEADER: ProductionProcessHeaderModel[] = [
    {
      text: 'תוכנית ייצור יער משקי',
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
  export const EDIT_FARM_FOREST_HEADER: ProductionProcessHeaderModel[] = [
    {
        text: 'עריכת תוכנית ייצור יער משקי',
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
  
  export const FARM_FOREST_FORM: Question[] = [
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
      label: 'מחטניים',
      value: 1000,
      filterValue: 'coniferous',
      // svgUrl: 'assets/images/spatial-christmass-tree.svg',
      svgUrl: 'edit',
    }),
    new FilterModel({
      label: 'חורש טבעי',
      value: 1000,
      filterValue: 'grove',
      // svgUrl: 'assets/images/spatial-tree.svg',
      svgUrl: 'edit',
    }),
    new FilterModel({
      label: 'אקליפטוס',
      value: 1000,
      filterValue: 'eucalyptus',
      // svgUrl: 'assets/images/spatial-eucalyptus.svg',
      svgUrl: 'edit', 
  
    }),
    new FilterModel({
      label: 'שיטים',
      filterValue: 'acacia',
      value: 1000,
      // svgUrl: 'assets/images/spatial-tree-black-silhouette-shape.svg',
      svgUrl: 'edit',
  
    }),
    new FilterModel({
      label: 'עצי ושיחי נוי',
      value: 1000,
      filterValue: 'ornamentalTree',
      // svgUrl: 'assets/images/spatial-shape.svg',
      svgUrl: 'edit',
  
    }),
    new FilterModel({
      label: 'סה"כ',
      value: 7000,
      filterValue: 'total',
      // svgUrl: 'assets/images/spatial-shape.svg',
      svgUrl: 'edit',
  
    }),
  ];
  
  export const  FARM_TABLE_TOTAL_RESULTS_DATA:FarmForestTotalTableModel[]=[
    { 
      id:1,
      client:'בלום אורנה',
      phone:'044-80245355',
      adress:'יסוד המעלה 78 דטנם',
      email:'yoni12@gmail.com',
      plantType:'אקליפטוס טהור',
      total:'15000',
      ashtaol:'10000',
      golani:'5000',
      gilat:'',
  },
  {
    id:2,
    client:'בלום אורנה',
    phone:'044-80245355',
    adress:'יסוד המעלה 78 דטנם',
    email:'yoni12@gmail.com',
    plantType:'אקליפטוס טהור',
    total:'5000',
    ashtaol:'3000',
    golani:'',
    gilat:'2000',
},
  ]

  export const  FARM_TABLE_TOTAL_TREE_RESULTS_DATA:FarmForestTotalTableModel[]=[
    {
      id:1,
      client:'בלום אורנה',
      phone:'044-80245355',
      adress:'יסוד המעלה 78 דטנם',
      email:'yoni12@gmail.com',
      plantType:'אקליפטוס טהור',
      total:'15000',
      ashtaol:'10000',
      golani:'5000',
      gilat:'',
  },

  ]


  

  
  export const  FARM_TABLE_TREE_RESULTS_DATA:FarmForestTreeTableModel[]=[
    {
      id:1,
      plantType:'אקליפטוס הדרום',
      ashtaol:'10000',
      golani:'5000',
      gilat:'',
      total:'15000',
  },
  {
    id:11,
    plantType:'אקליפטוס הדרום',
    ashtaol:'10000',
    golani:'5000',
    gilat:'',
    total:'15000',
},
{
  id:12,
  plantType:'אקליפטוס הדרום',
  ashtaol:'10000',
  golani:'5000',
  gilat:'',
  total:'15000',
},
{
  id:13,
  plantType:'אקליפטוס הדרום',
  ashtaol:'10000',
  golani:'5000',
  gilat:'',
  total:'15000',
},

  ]


  export const  FARM_EXPANDABLE_TABLE_DATA:FarmForestTotalTableModel[]=[
    { 
      id:1,
      client:'בלום אורנה',
      phone:'044-80245355',
      adress:'יסוד המעלה 78 דטנם',
      email:'yoni12@gmail.com',
      plantType:'אקליפטוס טהור',
      total:'15000',
      ashtaol:'10000',
      golani:'5000',
      gilat:'',
  },
  {
    id:2,
    client:'בלום אורנה',
    phone:'044-80245355',
    adress:'יסוד המעלה 78 דטנם',
    email:'yoni12@gmail.com',
    plantType:'אקליפטוס טהור',
    total:'5000',
    ashtaol:'3000',
    golani:'',
    gilat:'2000',
},
{
  id:2,
  client:'בלום אורנה',
  phone:'044-80245355',
  adress:'יסוד המעלה 78 דטנם',
  email:'yoni12@gmail.com',
  plantType:'אקליפטוס טהור',
  total:'5000',
  ashtaol:'3000',
  golani:'',
  gilat:'2000',
},
{
  id:2,
  client:'בלום אורנה',
  phone:'044-80245355',
  adress:'יסוד המעלה 78 דטנם',
  email:'yoni12@gmail.com',
  plantType:'אקליפטוס טהור',
  total:'5000',
  ashtaol:'3000',
  golani:'',
  gilat:'2000',
},
  ]
