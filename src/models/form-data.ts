export interface TemplateBasicInformation {
  readonly parent: string;
  readonly name: string;
  readonly externalId: string;
  readonly isCustom: boolean;
  readonly rootTemplate?: string;
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

export interface TemplateMetric {
  readonly id?: string;
  readonly name: string;
  readonly metricType: string;
  readonly unit: string;
  readonly isManual?: boolean;
  readonly value?: string | number | boolean | null;
  readonly isCalculated?: boolean;
  readonly isSourced?: boolean;
  readonly isNew?: boolean;
  readonly owningTemplate?: string;
}

export interface TemplateFormData {
  readonly tenant: string;
  readonly basicInformation: TemplateBasicInformation;
  readonly attributes: TemplateAttribute[];
  readonly metrics: TemplateMetric[];
}

export interface InstanceBasicInformationForm {
  readonly name: string;
  readonly externalId: string;
  readonly parent: string;
  readonly isCustom: boolean;
  readonly rootTemplate?: string;
}

export interface InstanceAttributeForm {
  readonly id: string;
  readonly value?: string;
}

export interface InstanceMetricForm {
  readonly id: string;
  readonly metricBehaviour: string;
  readonly value?: string;
}

export interface InstanceFormData {
  readonly tenant: string;
  readonly basicInformation: InstanceBasicInformationForm;
  readonly attributes: InstanceAttributeForm[];
  readonly metrics: InstanceMetricForm[];
}
