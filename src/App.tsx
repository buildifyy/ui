import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Layout,
  TemplateCreate,
  TemplateEdit,
  TemplateList,
  TemplateView,
} from "./components";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/templates" element={<TemplateList />}>
            <Route path="create" element={<TemplateCreate />} />
            <Route path=":templateId" element={<TemplateView />} />
            <Route path="edit/:templateId" element={<TemplateEdit />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
