import { SelectOption } from '../../form/models/question-select.model';
import {
  CardStepModel,
  StepType,
  StepVariant,
} from '../card-step/card-step.model';

export class CardStatusModel extends CardStepModel {
  public options: SelectOption[];

  constructor(options?: {
    label?: string;
    path?: string;
    svgUrl?: string;
    variant?: StepVariant;
    type?: StepType;
    size?: number;
    divider?: number;
    spacer?: boolean;
    value?: number;
    options?: SelectOption[];
  }) {
    super(options);
    this.label = options?.label || '';
    this.path = options?.path || '';
    this.svgUrl = options?.svgUrl || '';
    this.variant = options?.variant || 'circle';
    this.type = options?.type || 'step';
    this.size = options?.size || 6;
    this.value = options?.value || null;
    this.divider = options?.divider || 0;
    this.spacer = options?.spacer || false;
    this.options = options?.options || [];
  }
}
