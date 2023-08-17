import { Routes, Route } from "react-router-dom";
import {
  TemplateCreate,
  TemplateEdit,
  TemplateList,
  TemplateView,
} from "@/components/Template";
import { Sidebar, Stepper } from "@/components/skeleton";
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
      <div className="flex h-full">
        <Sidebar />
        <div className="flex w-full flex-col justify-between">
          <Stepper />
          <div className="flex h-full p-5">
            <Routes>
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
