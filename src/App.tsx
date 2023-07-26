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

  useEffect(() => {
    setStepSelection("Basic Information");
  }, [location]);

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex w-full flex-col justify-between">
        <Stepper
          stepSelection={stepSelection}
          setStepSelection={setStepSelection}
        />
        <Content>
          <Routes>
            <Route path="/templates" element={<TemplateList />} />
            <Route
              path="/templates/create"
              element={<TemplateCreate stepSelection={stepSelection} />}
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
        </Content>
        <Footer />
      </div>
    </div>
  );
}

export default App;
