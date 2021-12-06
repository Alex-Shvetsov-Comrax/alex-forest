import { FarmForestSingalExpandableTableModel } from '../farm-forest-tree-type/components/farm-forest-tree-type/components/farm-forest-singal-expandable-table/farm-forest-singal-expandable-table.model';
import { FarmForestTreeTypeSingalTableModel } from '../farm-forest-tree-type/components/farm-forest-tree-type/components/farm-forest-tree-type-singal-table/farm-forest-tree-type-singal-table.model';
import { FarmForestTotalTableModel } from '../fm-pp-farm-forest-program/components/farm-forest-results/components/farm-forest-total-table/farm-forest-total-table.model';
import { FarmForestTreeTableModel } from '../fm-pp-farm-forest-program/components/farm-forest-results/components/farm-forest-tree-table/farm-forest-tree-table.model';
import { FarmForestTableModel } from '../fm-pp-farm-forest-program/components/farm-forest/components/farm-forest-table/farm-forest-table.model';
import { SpatialTotalTableModel } from '../fm-pp-spatial-production-program/components/spatial-total-table/spatial-total-table.model';
import { ProductionProcessHeaderModel } from '../shared/components/add-production-process-header/production-process-header.model';
import { FilterModel } from '../shared/components/cards/card-filter/card-filter.model';
import { QuestionSelectModel } from '../shared/components/form/models/question-select.model';
import { QuestionTextModel } from '../shared/components/form/models/question-text.model';
import { Question } from '../shared/components/form/services/form.service';

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

export const FARM_TREE_TABLE_TOTAL_RESULTS_DATA: FarmForestTreeTableModel[] = [
  {
    id: 1,
    plantType: 'אקליפטוס הדרום',
    ashtaol: '10000',
    golani: '5000',
    gilat: '',
    total: '15000',
  },
  {
    id: 11,
    plantType: 'אקליפטוס הדרום',
    ashtaol: '10000',
    golani: '5000',
    gilat: '',
    total: '15000',
  },
  {
    id: 12,
    plantType: 'אקליפטוס הדרום',
    ashtaol: '10000',
    golani: '5000',
    gilat: '',
    total: '15000',
  },
  {
    id: 13,
    plantType: 'אקליפטוס הדרום',
    ashtaol: '10000',
    golani: '5000',
    gilat: '',
    total: '15000',
  },
];

export const FARM_TABLE_SINGAL_TREE_RESULTS_DATA: FarmForestTreeTypeSingalTableModel[] =
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

export const FARM_TABLE_TREE_RESULTS_DATA: FarmForestTreeTableModel[] = [
  {
    id: 1,
    plantType: 'אקליפטוס הדרום',
    ashtaol: '10000',
    golani: '5000',
    gilat: '',
    total: '15000',
  },
  {
    id: 11,
    plantType: 'אקליפטוס הדרום',
    ashtaol: '10000',
    golani: '5000',
    gilat: '',
    total: '15000',
  },
  {
    id: 12,
    plantType: 'אקליפטוס הדרום',
    ashtaol: '10000',
    golani: '5000',
    gilat: '',
    total: '15000',
  },
  {
    id: 13,
    plantType: 'אקליפטוס הדרום',
    ashtaol: '10000',
    golani: '5000',
    gilat: '',
    total: '15000',
  },
];

export const FARM_EXPANDABLE_SINGAL_TABLE_DATA: FarmForestSingalExpandableTableModel[] =
  [
    {
      id: 1,
      client: 'בלום אורנה',
      phone: '044-80245355',
      adress: 'יסוד המעלה 78 דטנם',
      email: 'yoni12@gmail.com',
      amount: '5000',
    },
    {
      id: 2,
      client: 'בלום אורנה',
      phone: '044-80245355',
      adress: 'יסוד המעלה 78 דטנם',
      email: 'yoni12@gmail.com',
      amount: '5000',
    },
    {
      id: 2,
      client: 'בלום אורנה',
      phone: '044-80245355',
      adress: 'יסוד המעלה 78 דטנם',
      email: 'yoni12@gmail.com',
      amount: '5000',
    },
    {
      id: 2,
      client: 'בלום אורנה',
      phone: '044-80245355',
      adress: 'יסוד המעלה 78 דטנם',
      email: 'yoni12@gmail.com',
      amount: '5000',
    },
  ];
