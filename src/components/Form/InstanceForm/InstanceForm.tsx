import { FormProvider, useForm } from "react-hook-form";
import { Topbar } from "@/components/skeleton";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  InstanceCreate,
  InstanceList,
  InstanceView,
} from "@/components/Instance";
import {
  InstanceFormData,
  InstanceMetaDataField,
  instanceSchema,
} from "@/models";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

export const InstanceForm = () => {
  const [attributeSchemaContext, setAttributeSchemaContext] = useState<
    InstanceMetaDataField[]
  >([]);
  const [metricSchemaContext, setMetricSchemaContext] = useState<
    InstanceMetaDataField[]
  >([]);

  const methods = useForm<InstanceFormData>({
    resolver: yupResolver(instanceSchema),
    context: {
      attributes: attributeSchemaContext,
      metrics: metricSchemaContext,
    },
    mode: "all",
    defaultValues: {
      tenant: "the-binary",
    },
  });

  return (
    <FormProvider {...methods}>
      <div className="flex h-full flex-col">
        <Topbar />
        <div className="flex w-full flex-col justify-between">
          <div className="flex h-full px-5 py-3">
            <Routes>
              <Route path="/instances" element={<InstanceList />} />
              <Route
                path="/instances"
                element={<Navigate replace to="/instances/create" />}
              />
              <Route path="/instances/:instanceId" element={<InstanceView />} />
              <Route
                path="/instances/create"
                element={
                  <InstanceCreate
                    setAttributeSchemaContext={setAttributeSchemaContext}
                    setMetricSchemaContext={setMetricSchemaContext}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};
