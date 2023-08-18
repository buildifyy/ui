import { Header } from "@/components/shared";
import { Footer } from "@/components/skeleton";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { BasicInformation } from "./BasicInformation";

export const InstanceCreate = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const config = searchParams.get("config");

  const configMap: Record<string, string> = {
    "basic-information": "Basic Information",
    attributes: "Attributes",
    relationships: "Relationships",
    "metric-types": "Metric Types",
  };

  useEffect(() => {
    if (!config) {
      searchParams.set("config", "basic-information");
      setSearchParams(searchParams);
    }
  }, [config]);

  const toRender = () => {
    switch (config) {
      case "basic-information":
        return <BasicInformation />;
      default:
        return null;
    }
  };

  return (
    <form className="h-full w-full">
      <div className="w-full">
        <Header
          value={config ? configMap[config] : "Basic Information"}
          type="Instance"
        />
        {toRender()}
        <Footer />
      </div>
    </form>
  );
};
