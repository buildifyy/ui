export interface TemplateBasicInformation {
  readonly parent: string;
  readonly name: string;
  readonly externalId: string;
  readonly isCustom: boolean;
}

export interface TemplateAttribute {
  readonly id?: string;
  readonly name: string;
  readonly dataType: string;
  readonly isRequired?: boolean;
  readonly isHidden?: boolean;
  readonly isNew?: boolean;
  readonly owningTemplate?: string;
}

export interface TemplateMetricType {
  readonly id?: string;
  readonly name: string;
  readonly metricType: string;
  readonly metrics: TemplateMetric[];
  readonly isNew?: boolean;
  readonly owningTemplate?: string;
}

export interface TemplateMetric {
  readonly id?: string;
  readonly name: string;
  readonly isManual?: boolean;
  readonly value?: string | number | boolean | null;
  readonly isCalculated?: boolean;
  readonly isSourced?: boolean;
}

export interface TemplateFormData {
  readonly tenant: string;
  readonly basicInformation: TemplateBasicInformation;
  readonly attributes: TemplateAttribute[];
  readonly metricTypes: TemplateMetricType[];
}

export interface InstanceBasicInformationForm {
  readonly name: string;
  readonly externalId: string;
  readonly parent: string;
}

export interface InstanceAttributeForm {
  readonly value?: string;
}

export interface InstanceFormData {
  readonly tenant: string;
  readonly basicInformation: InstanceBasicInformationForm;
  readonly attributes: InstanceAttributeForm[];
}
