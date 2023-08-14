export interface BasicInformation {
  readonly parent: string;
  readonly name: string;
  readonly externalId: string;
  readonly isCustom: boolean;
}

export interface Attribute {
  readonly name: string;
  readonly dataType: string;
  readonly isRequired?: boolean;
  readonly isHidden?: boolean;
  readonly isNew?: boolean;
}

export interface MetricType {
  readonly name: string;
  readonly metricType: string;
  readonly metrics: Metric[];
  readonly isNew?: boolean;
}

export interface Metric {
  readonly name: string;
  readonly isManual?: boolean;
  readonly value?: string | number | boolean | null;
  readonly isCalculated?: boolean;
  readonly isSourced?: boolean;
}

export interface TemplateFormData {
  readonly tenant: string;
  readonly basicInformation: BasicInformation;
  readonly attributes: Attribute[];
  readonly metricTypes: MetricType[];
}
