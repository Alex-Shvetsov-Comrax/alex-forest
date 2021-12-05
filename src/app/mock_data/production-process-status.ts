import { ProductionProcessStatusTableModel } from '../fm-production-process/components/production-process-status-table/production-process-status-table.model';
import { ProductionProcessHeaderModel } from '../shared/components/add-production-process-header/production-process-header.model';

// change all the dummy data to status dammuy data
export const STATUS_HEADER: ProductionProcessHeaderModel[] = [
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
    text: 'גילת',
    size: '2.3',
    color: 'accent',
  },
];

export const STATUS_COMMENT = 'לורם איפסום דיפסום';

// export const EDIT_FARM_FOREST_HEADER: ProductionProcessHeaderModel[] = [
//   {
//       text: 'עריכת תוכנית ייצור יער משקי',
//       size: '2.6',
//       color: 'text',
//     },
//   {
//     text: 'גילת',
//     size: '2.3',
//     color: 'text',
//   },
//   {
//     text: 'תשפ"ט 2021- 2022',
//     size: '2.3',
//     color: 'text',
//   },
//   {
//     text: 'בטיפול',
//     size: '1.6',
//     color: 'accent',
//   },
// ];

//   export const FARM_FOREST_FORM: Question[] = [
//     new QuestionSelectModel({
//       key: 'plantSeason',
//       label: 'עונת נטיעה',
//       gridProps: {
//         cols: 2,
//       },
//       options: [
//         { label: 'A ', value: 'A ' },
//         { label: 'B', value: 'B' },
//         { label: 'C', value: 'C' },
//       ],
//     }),
//     new QuestionSelectModel({
//       key: 'status',
//       label: 'סטטוס',
//       gridProps: {
//         cols: 2,
//       },
//       options: [
//         { label: 'A ', value: 'A ' },
//         { label: 'B', value: 'B' },
//         { label: 'C', value: 'C' },
//       ],
//     }),

//   ];

export const STATUS_TABLE_DATA: ProductionProcessStatusTableModel[] = [
  {
    id: 1,
    oldStatus: 'בטיפול',
    newStatus: 'מאושר',
    changedBy: 'ישראלי ישראל',
    changeDate: '20.6.21',
    changeTime: '16:45',
  },
  {
    id: 2,
    oldStatus: 'בטיפול',
    newStatus: 'מאושר',
    changedBy: 'ישראלי ישראל',
    changeDate: '20.6.21',
    changeTime: '16:45',
  },
];
