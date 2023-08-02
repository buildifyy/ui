import * as yup from "yup";

export const schema = yup.object({
    tenant: yup.string().required("This field is required"),
    basicInformation: yup.object({
        parent: yup.string().required("This field is required"),
        name: yup.string().required("This field is required"),
        externalId: yup.string().required("This field is required")
    }),
    attributes: yup.array().of(yup.object({
        name: yup.string().required("This field is required"),
        dataType: yup.string().required("This field is required"),
        isRequired: yup.boolean(),
        isHidden: yup.boolean()
    })).required().default([]),
    metricTypes: yup.array().of(yup.object({
        name: yup.string().required("This field is required"),
        metricType: yup.string().required("This field is required"),
        metrics: yup.array().of(yup.object({
            name: yup.string().required("This field is required"),
            isManual: yup.boolean(),
            value: yup.mixed<string | number | boolean>(),
            isCalculated: yup.boolean(),
            isSourced: yup.boolean()
        })).required().default([]).min(1, "Atleast 1 metric needs to be added")
    })).required().default([])
})