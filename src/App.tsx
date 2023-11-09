import { useLocation, useNavigate } from "react-router-dom";
import { TemplateForm } from "@/components/Form/TemplateForm";
import { InstanceForm } from "@/components/Form/InstanceForm";
import { useEffect } from "react";
import { ThemeProvider } from "./components/theme-provider";
import { NextUIProvider } from "@nextui-org/react";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/templates");
    }
  }, []);

  return (
    <NextUIProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {location.pathname.includes("/templates") ? (
          <TemplateForm />
        ) : (
          <InstanceForm />
        )}
      </ThemeProvider>
    </NextUIProvider>
  );
}

export default App;
