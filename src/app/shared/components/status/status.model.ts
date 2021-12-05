
export class StatusModel {

  public label  : string
  public value  : number

  constructor(
    options: {
      label?: string,
      value?: number,
    }
  ) {
    this.label = options?.label;
    this.value = options?.value;
  }

  static create(status: StatusModel) {
    return new StatusModel({
      label: status.label,
      value: status.value,
    })
  }

}
