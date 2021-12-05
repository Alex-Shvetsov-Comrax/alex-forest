export interface Year {
    year:string;
    isShmita:boolean
    
  }
  

export class ProductionProcessTableModel {
  constructor(
      public id?: number | string,
      public year?:Year,
      public planType?:string,
      public gardening?: string,
      public status?: string,
      public date?: Date |string,

    ){}
}
