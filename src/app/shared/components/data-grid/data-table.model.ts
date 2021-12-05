import { DataCellModel } from "./data-cell.model";

export interface DataTable {
  columns?: DataCellModel[];
  rows: DataCellModel[][];
}
