import { Routes, Route, Navigate } from "react-router-dom";
import {
  TemplateCreate,
  TemplateEdit,
  TemplateList,
  TemplateView,
} from "@/components/Template";
import { Topbar } from "@/components/skeleton";
import { FormProvider, useForm } from "react-hook-form";
import {
  TemplateFormData,
  templateSchema,
  InstanceFormData,
  instanceSchema,
  InstanceMetaDataField,
} from "@/models";
import { yupResolver } from "@hookform/resolvers/yup";
import { InstanceCreate } from "@/components/Instance";
import { useState } from "react";

function App() {
  const [schemaContext, setSchemaContext] = useState<InstanceMetaDataField[]>(
    [],
  );
  const templateMethods = useForm<TemplateFormData>({
    resolver: yupResolver(templateSchema),
    mode: "all",
    defaultValues: {
      tenant: "the-binary",
    },
  });

  const instanceMethods = useForm<InstanceFormData>({
    resolver: yupResolver(instanceSchema),
    context: {
      attributes: schemaContext,
    },
    mode: "all",
    defaultValues: {
      tenant: "the-binary",
    },
  });

  return (
    <FormProvider {...templateMethods} {...instanceMethods}>
      <div className="flex h-full flex-col">
        <Topbar />
        <div className="flex w-full flex-col justify-between">
          <div className="flex h-full px-5 py-3">
            <Routes>
              <Route path="/" element={<Navigate replace to="/templates" />} />
              <Route path="/templates" element={<TemplateList />} />
              <Route path="/templates/create" element={<TemplateCreate />} />
              <Route path="/templates/:templateId" element={<TemplateView />} />
              <Route
                path="/templates/edit/:templateId"
                element={<TemplateEdit />}
              />
              <Route
                path="/instances/create"
                element={<InstanceCreate setSchemaContext={setSchemaContext} />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}

export default App;
