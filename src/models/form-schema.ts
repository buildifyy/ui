import * as yup from "yup";
import { InstanceMetaDataField } from "@/models/instance";

export const templateSchema = yup.object({
  tenant: yup.string().required("This field is required"),
  basicInformation: yup.object({
    parent: yup.string().required("This field is required"),
    name: yup.string().required("This field is required"),
    externalId: yup.string().required("This field is required"),
    isCustom: yup.boolean().required("This field is required").default(true),
  }),
  attributes: yup
    .array()
    .of(
      yup.object({
        name: yup.string().required("This field is required"),
        dataType: yup.string().required("This field is required"),
        isRequired: yup.boolean(),
        isHidden: yup.boolean(),
      }),
    )
    .required()
    .default([]),
  metricTypes: yup
    .array()
    .of(
      yup.object({
        name: yup.string().required("This field is required"),
        metricType: yup.string().required("This field is required"),
        metrics: yup
          .array()
          .of(
            yup.object({
              name: yup.string().required("This field is required"),
              isManual: yup
                .boolean()
                .test(
                  "oneOfRequired",
                  "One of Manual, Calculated or Sourced must be selected",
                  function () {
                    return (
                      this.parent.isManual ||
                      this.parent.isCalculated ||
                      this.parent.isSourced
                    );
                  },
                ),
              value: yup.mixed<string | number | boolean>().nullable(),
              isCalculated: yup
                .boolean()
                .test(
                  "oneOfRequired2",
                  "One of Manual, Calculated or Sourced must be selected",
                  function () {
                    return (
                      this.parent.isManual ||
                      this.parent.isCalculated ||
                      this.parent.isSourced
                    );
                  },
                ),
              isSourced: yup
                .boolean()
                .test(
                  "oneOfRequired3",
                  "One of Manual, Calculated or Sourced must be selected",
                  function () {
                    return (
                      this.parent.isManual ||
                      this.parent.isCalculated ||
                      this.parent.isSourced
                    );
                  },
                ),
            }),
          )
          .required()
          .default([])
          .min(1, "Atleast 1 metric needs to be added"),
      }),
    )
    .required()
    .default([]),
});

export const instanceSchema = yup.object({
  tenant: yup.string().required("This field is required"),
  basicInformation: yup.object({
    parent: yup.string().required("This field is required"),
    name: yup.string().required("This field is required"),
    externalId: yup.string().required("This field is required"),
    isCustom: yup.boolean().required("This field is required").default(true),
  }),
  attributes: yup
    .array()
    .of(
      yup.object({
        id: yup.string().required(),
        value: yup.string().test("value-validation", "", function (value) {
          const index = parseInt(this.path.split("[")[1].split("]")[0], 10);
          const attributeContext = this.options.context?.["attributes"][
            index
          ] as InstanceMetaDataField;
          if (attributeContext?.isRequired) {
            return value == null || value === ""
              ? this.createError({ message: "This value is required" })
              : true;
          }

          if (value) {
            switch (attributeContext?.type) {
              case "integer":
                if (value.includes(".")) {
                  return this.createError({
                    message: "Please enter a valid integer",
                  });
                }
                return isNaN(parseInt(value))
                  ? this.createError({
                      message: "Please enter a valid integer",
                    })
                  : true;
              case "float":
                return isNaN(parseFloat(value))
                  ? this.createError({
                      message: "Please enter a valid decimal value",
                    })
                  : true;
            }
          }

          return true;
        }),
      }),
    )
    .required(),
  metricTypes: yup.array().of(
    yup.object({
      id: yup.string().required(),
      metrics: yup.array().of(
        yup.object({
          id: yup.string().required(),
          metricType: yup.string().required("This is a required field"),
          value: yup.string()
        })
      ).required()
    })
  ).required()
});
