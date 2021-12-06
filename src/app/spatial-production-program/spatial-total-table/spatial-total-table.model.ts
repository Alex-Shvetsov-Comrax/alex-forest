export class SpatialTotalTableModel {
  constructor(
    public id?: number | string,
    public plantType?: string,
    public amount?: number,
    public area?: string,
    public receptacle?: string,
    public multiplicityMaterial?: string,
    public seedOrigin?: string,
    public comment?: string
  ) // public filterValue?:string,

  {}
}
