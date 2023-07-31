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
    })).required().default([])
})