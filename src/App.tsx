import { useState } from "react";
import { Routes, Route, useSearchParams } from "react-router-dom";
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
import { Popup } from "./components/shared";

function App() {
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const methods = useForm<TemplateFormData>({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const handleOnReset = () => {
    methods.reset({
      basicInformation: {
        name: "",
        parent: "",
        externalId: "",
      },
      attributes: [],
      metricTypes: [],
    });
    searchParams.set("config", "basic-information");
    setSearchParams(searchParams);
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
          <Stepper />
          <div className="flex h-full p-5">
            <Routes>
              <Route path="/templates" element={<TemplateList />} />
              <Route
                path="/templates/create"
                element={
                  <TemplateCreate setShowCancelPopup={setShowCancelPopup} />
                }
              />
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
