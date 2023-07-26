import { Route, Routes } from "react-router-dom";
import { Sidebar, Stepper, Content, Footer } from "..";
import {
  TemplateCreate,
  TemplateEdit,
  TemplateList,
  TemplateView,
} from "../Template";
import { useState } from "react";

export const Layout = () => {
  const [stepSelection, setStepSelection] = useState<
    "Basic Information" | "Attributes" | "Relationships" | "Metric Types"
  >("Basic Information");

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
            <Route path="/templates/create" element={<TemplateCreate />} />
            <Route path="/templates/:templateId" element={<TemplateView />} />
            <Route
              path="/templates/edit/:templateId"
              element={<TemplateEdit />}
            />
          </Routes>
        </Content>
        <Footer />
      </div>
    </div>
  );
};
