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
import { Popup } from "./components/shared/Popup";

function App() {
  const location = useLocation();
  const [stepSelection, setStepSelection] = useState<
    "Basic Information" | "Attributes" | "Relationships" | "Metric Types"
  >("Basic Information");
  const [showCancelPopup, setShowCancelPopup] = useState(false);

  useEffect(() => {
    setStepSelection("Basic Information");
  }, [location]);

  const methods = useForm<TemplateFormData>({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const handleOnReset = () => {
    methods.reset({
      tenant: "",
      basicInformation: {
        name: "",
        parent: "",
        externalId: "",
      },
      attributes: [],
      metricTypes: [],
    });
    setStepSelection("Basic Information");
    setShowCancelPopup(false);
  };

  const handleOnBack = () => {
    setShowCancelPopup(false);
  };

  return (
    <FormProvider {...methods}>
      {showCancelPopup && (
        <Popup onReset={handleOnReset} onBack={handleOnBack} />
      )}
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
                    setShowCancelPopup={setShowCancelPopup}
                  />
                }
              />
              <Route
                path="/templates/:templateId"
                element={
                  <TemplateView
                    stepSelection={stepSelection}
                    setStepSelection={setStepSelection}
                  />
                }
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
