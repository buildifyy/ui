import { Routes, Route, Navigate } from "react-router-dom";
import {
  TemplateCreate,
  TemplateEdit,
  TemplateList,
  TemplateView,
} from "@/components/Template";
import { Topbar } from "@/components/skeleton";
import { FormProvider, useForm } from "react-hook-form";
import { TemplateFormData, schema } from "@/models";
import { yupResolver } from "@hookform/resolvers/yup";

function App() {
  const methods = useForm<TemplateFormData>({
    resolver: yupResolver(schema),
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
              <Route path="/" element={<Navigate replace to="/templates" />} />
              <Route path="/templates" element={<TemplateList />} />
              <Route path="/templates/create" element={<TemplateCreate />} />
              <Route path="/templates/:templateId" element={<TemplateView />} />
              <Route
                path="/templates/edit/:templateId"
                element={<TemplateEdit />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}

export default App;
