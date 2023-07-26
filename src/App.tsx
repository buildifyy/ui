import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  Content,
  Footer,
  Sidebar,
  Stepper,
  TemplateCreate,
  TemplateEdit,
  TemplateList,
  TemplateView,
} from "./components";

function App() {
  const location = useLocation();
  const [stepSelection, setStepSelection] = useState<
    "Basic Information" | "Attributes" | "Relationships" | "Metric Types"
  >("Basic Information");
  const [tenant, setTenant] = useState<string>("");

  useEffect(() => {
    setStepSelection("Basic Information");
  }, [location]);

  return (
    <div className="flex h-full">
      <Sidebar tenant={tenant} setTenant={setTenant} />
      <div className="flex w-full flex-col justify-between">
        <Stepper
          stepSelection={stepSelection}
          setStepSelection={setStepSelection}
        />
        <Content>
          <Routes>
            <Route
              path="/templates"
              element={<TemplateList tenant={tenant} />}
            />
            <Route
              path="/templates/create"
              element={
                <TemplateCreate stepSelection={stepSelection} tenant={tenant} />
              }
            />
            <Route
              path="/templates/:templateId"
              element={
                <TemplateView stepSelection={stepSelection} tenant={tenant} />
              }
            />
            <Route
              path="/templates/edit/:templateId"
              element={
                <TemplateEdit stepSelection={stepSelection} tenant={tenant} />
              }
            />
          </Routes>
        </Content>
        <Footer />
      </div>
    </div>
  );
}

export default App;
