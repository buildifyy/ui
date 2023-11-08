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
  metrics: yup
    .array()
    .of(
      yup.object({
        name: yup.string().required("This field is required"),
        metricType: yup.string().required("This field is required"),
        unit: yup.string().required("This field is required"),
        isManual: yup.boolean().test(
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
        isCalculated: yup.boolean().test(
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
        isSourced: yup.boolean().test(
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
              case "bool":
                return (value.toLowerCase() !== "true" && value.toLowerCase() !== "false")
                  ? this.createError({
                      message: "Please enter a valid boolean value",
                    })
                  : true;
              case "string":
                return !/^[a-zA-Z0-9\\s]*$/.test(value) ? this.createError({
                  message: "Please enter a valid string value",
                }) : true;
            }
          }

          return true;
        }),
      }),
    )
    .required(),
  metrics: yup.array().of(
    yup.object({
      id: yup.string().required(),
      metricBehaviour: yup.string().required("This is a required field"),
      value: yup.string().test("value-validation", "", function(value) {
        console.log('path: ', this.path);
        const index = parseInt(this.path.split("[")[1].split("]")[0], 10);
        console.log('index: ', index);
        console.log('options: ', this.options);
        const metricContext = this.options.context?.["metrics"][
          index
        ] as InstanceMetaDataField;
        console.log('metricContext: ', metricContext);
        if (value) {
          switch (metricContext?.type) {
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
            case "bool":
              return (value.toLowerCase() !== "true" && value.toLowerCase() !== "false")
                ? this.createError({
                    message: "Please enter a valid boolean value",
                  })
                : true;
            case "string":
              return !/^[a-zA-Z0-9\\s]*$/.test(value) ? this.createError({
                message: "Please enter a valid string value",
              }) : true;
          }
        }

        return true;
      })
    })
  ).required()
});
