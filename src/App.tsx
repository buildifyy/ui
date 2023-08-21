import { useLocation, useNavigate } from "react-router-dom";
import { TemplateForm } from "@/components/Form/TemplateForm";
import { InstanceForm } from "@/components/Form/InstanceForm";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/templates");
    }
  }, []);

  return location.pathname.includes("/templates") ? (
    <TemplateForm />
  ) : (
    <InstanceForm />
  );
}

export default App;
