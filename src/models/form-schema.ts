import * as yup from "yup";

export const schema = yup.object({
    basicInformation: yup.object({
        parent: yup.string().required(),
        name: yup.string().required(),
        externalId: yup.string().required()
    }),
    attributes: yup.array().of(yup.object({
        name: yup.string().required()
    })).required()
})