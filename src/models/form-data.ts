export interface BasicInformation {
    readonly parent: string;
    readonly name: string;
    readonly externalId: string;
}

export interface Attribute {
    readonly name: string;
    readonly dataType: string
    readonly isRequired?: boolean;
    readonly isHidden?: boolean;
    readonly isExpanded: boolean;
}

export interface MetricType {
    readonly name: string;
    readonly metricType: string;
    readonly metrics: Metric[];
}

export interface Metric {
    readonly name: string;
    readonly isManual?: boolean;
    readonly value?: string | number | boolean;
    readonly isCalculated?: boolean;
    readonly isSourced?: boolean;
}
  
export interface CreateTemplateFormData {
    readonly tenant: string;
    readonly basicInformation: BasicInformation;
    readonly attributes: Attribute[];
    readonly metricTypes: MetricType[];
}