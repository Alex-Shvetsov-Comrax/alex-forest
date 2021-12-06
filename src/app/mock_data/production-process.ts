import { SpatialTotalTableModel } from '../fm-pp-spatial-production-program/components/spatial-total-table/spatial-total-table.model';
import { ProductionProcessTableModel } from '../fm-production-process/components/production-process/components/production-procces-table/production-process-table.model';
import { ProductionProcessHeaderModel } from '../shared/components/add-production-process-header/production-process-header.model';
import { FilterModel } from '../shared/components/cards/card-filter/card-filter.model';
import { QuestionSelectModel } from '../shared/components/form/models/question-select.model';
import { QuestionTextModel } from '../shared/components/form/models/question-text.model';
import { Question } from '../shared/components/form/services/form.service';

export const PRODUCTION_PROCESS_TABLE: ProductionProcessTableModel[] = [
  {
    id: 1,
    year: { year: 'תשפא-תשפט', isShmita: true },
    planType: 'תוכנית יצור',
    gardening: 'גולני',
    status: 'מאושר',
    date: '19.07.21 08:45',
  },
  {
    id: 2,
    year: { year: 'תשפא-תשפט', isShmita: true },
    planType: 'תוכנית יצור',
    gardening: 'גולני',
    status: 'מאושר',
    date: '19.07.21 08:45',
  },
  {
    id: 3,
    year: { year: 'תשפא-תשפט', isShmita: true },
    planType: 'תוכנית יצור',
    gardening: 'גולני',
    status: 'מאושר',
    date: '19.07.21 08:45',
  },
  {
    id: 4,
    year: { year: 'תשפא-תשפט', isShmita: true },
    planType: 'תוכנית יצור',
    gardening: 'גולני',
    status: 'מאושר',
    date: '19.07.21 08:45',
  },
  {
    id: 5,
    year: { year: 'תשפא-תשפט', isShmita: true },
    planType: 'תוכנית יצור',
    gardening: 'גולני',
    status: 'מאושר',
    date: '19.07.21 08:45',
  },
  {
    id: 6,
    year: { year: 'תשפא-תשפט', isShmita: true },
    planType: 'תוכנית יצור',
    gardening: 'גולני',
    status: 'מאושר',
    date: '19.07.21 08:45',
  },
];

export const SPATIAL_COMMENT = 'לורם איפסום דיפסום';
export const ADD_SPATIAL_HEADER: ProductionProcessHeaderModel[] = [
  {
    text: 'הוספת תוכנית ייצור מרחבי',
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
export const EDIT_SPATIAL_HEADER: ProductionProcessHeaderModel[] = [
  {
    text: 'עריכת תוכנית ייצור מרחבי',
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

export const SPATIAL_HEADER_FORM: Question[] = [
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
  new QuestionTextModel({
    key: 'comment',
    label: 'הערה',
    gridProps: {
      cols: 3,
    },
  }),
];

export const FILTERS_SPATIAL: FilterModel[] = [
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

export const  SPATIAL_TABLE_DATA:SpatialTotalTableModel[]=[
  {
    id:1,
    plantType: 'ברוקווי',
    amount: 1000,
    area: 'נגב צפוני',
    receptacle: 'Q12',
    multiplicityMaterial: 'זרעים',
    seedOrigin: 'קיבוץ ניר עוז',
    comment: 'לורום איפסום דולור סיט אמט איפיסינג',
},
{
  id:16,
  plantType: 'ברוקווי',
  amount: 1000,
  area: 'נגב צפוני',
  receptacle: 'Q12',
  multiplicityMaterial: 'זרעים',
  seedOrigin: 'קיבוץ ניר עוז',
  comment: 'לורום איפסום דולור סיט אמט איפיסינג',
},
{
  id:51,
  plantType: 'ברוקווי',
  amount: 1000,
  area: 'נגב צפוני',
  receptacle: 'Q12',
  multiplicityMaterial: 'זרעים',
  seedOrigin: 'קיבוץ ניר עוז',
  comment: 'לורום איפסום דולור סיט אמט איפיסינג',
},
{
  id:14,
  plantType: 'ברוקווי',
  amount: 1000,
  area: 'נגב צפוני',
  receptacle: 'Q12',
  multiplicityMaterial: 'זרעים',
  seedOrigin: 'קיבוץ ניר עוז',
  comment: 'לורום איפסום דולור סיט אמט איפיסינג',
},
{
  id:13,
  plantType: 'ברוקווי',
  amount: 1000,
  area: 'נגב צפוני',
  receptacle: 'Q12',
  multiplicityMaterial: 'זרעים',
  seedOrigin: 'קיבוץ ניר עוז',
  comment: 'לורום איפסום דולור סיט אמט איפיסינג',
},
{
  id:12,
  plantType: 'ברוקווי',
  amount: 1000,
  area: 'נגב צפוני',
  receptacle: 'Q12',
  multiplicityMaterial: 'זרעים',
  seedOrigin: 'קיבוץ ניר עוז',
  comment: 'לורום איפסום דולור סיט אמט איפיסינג',
},
{
  id:11,
  plantType: 'ברוקווי',
  amount: 1000,
  area: 'נגב צפוני',
  receptacle: 'Q12',
  multiplicityMaterial: 'זרעים',
  seedOrigin: 'קיבוץ ניר עוז',
  comment: 'לורום איפסום דולור סיט אמט איפיסינג',
},
{
  id:111,
  plantType: 'ברוקווי',
  amount: 1000,
  area: 'נגב צפוני',
  receptacle: 'Q12',
  multiplicityMaterial: 'זרעים',
  seedOrigin: 'קיבוץ ניר עוז',
  comment: 'לורום איפסום דולור סיט אמט איפיסינג',
},
]

export const  SPATIAL_TABLE_DATA2:SpatialTotalTableModel[]=[
  
{
  id:51,
  plantType: 'ברוקווי',
  amount: 1000,
  area: 'נגב צפוני',
  receptacle: 'Q12',
  multiplicityMaterial: 'זרעים',
  seedOrigin: 'קיבוץ ניר עוז',
  comment: 'לורום איפסום דולור סיט אמט איפיסינג',
},
{
  id:14,
  plantType: 'ברוקווי',
  amount: 1000,
  area: 'נגב צפוני',
  receptacle: 'Q12',
  multiplicityMaterial: 'זרעים',
  seedOrigin: 'קיבוץ ניר עוז',
  comment: 'לורום איפסום דולור סיט אמט איפיסינג',
},
{
  id:13,
  plantType: 'ברוקווי',
  amount: 1000,
  area: 'נגב צפוני',
  receptacle: 'Q12',
  multiplicityMaterial: 'זרעים',
  seedOrigin: 'קיבוץ ניר עוז',
  comment: 'לורום איפסום דולור סיט אמט איפיסינג',
},]