
export class ProductionProcessStatusTableModel {
    constructor(
        public id?: number|string,
        public oldStatus?:string,
        public newStatus?:string,
        public changedBy?:string,
        public changeDate?:string,
        public changeTime?:string
    ){}
}