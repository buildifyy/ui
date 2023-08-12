import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  TemplateCreate,
  TemplateEdit,
  TemplateList,
  TemplateView,
} from "./components/Template";
import { Sidebar, Stepper } from "./components/skeleton";
import { FormProvider, useForm } from "react-hook-form";
import { TemplateFormData, schema } from "./models";
import { yupResolver } from "@hookform/resolvers/yup";

function App() {
  const location = useLocation();
  const [stepSelection, setStepSelection] = useState<
    "Basic Information" | "Attributes" | "Relationships" | "Metric Types"
  >("Basic Information");

  useEffect(() => {
    setStepSelection("Basic Information");
  }, [location]);

  const methods = useForm<TemplateFormData>({
    resolver: yupResolver(schema),
    mode: "all",
  });

  return (
    <FormProvider {...methods}>
      <div className="flex h-full">
        <Sidebar />
        <div className="flex w-full flex-col justify-between">
          <Stepper
            stepSelection={stepSelection}
            setStepSelection={setStepSelection}
          />
          <div className="flex h-full p-5">
            <Routes>
              <Route path="/templates" element={<TemplateList />} />
              <Route
                path="/templates/create"
                element={
                  <TemplateCreate
                    stepSelection={stepSelection}
                    setStepSelection={setStepSelection}
                  />
                }
              />
              <Route
                path="/templates/:templateId"
                element={<TemplateView stepSelection={stepSelection} />}
              />
              <Route
                path="/templates/edit/:templateId"
                element={<TemplateEdit stepSelection={stepSelection} />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}

export default App;
