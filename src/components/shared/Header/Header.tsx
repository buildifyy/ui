import { useFormContext, useWatch } from "react-hook-form";
import { InstanceFormData, TemplateFormData } from "@/models";
import { useLocation, useParams } from "react-router-dom";

interface HeaderProps {
  readonly value: string;
  readonly type?: "Template" | "Instance";
  readonly isListView?: boolean;
}

export const Header = ({
  value,
  type = "Template",
  isListView,
}: HeaderProps) => {
  const location = useLocation();
  const { templateId } = useParams();
  const { instanceId } = useParams();
  const { control: templateControl } = useFormContext<TemplateFormData>();
  const { control: instanceControl } = useFormContext<InstanceFormData>();

  const templateNameLive = useWatch<TemplateFormData>({
    name: "basicInformation.name",
    control: templateControl,
  });

  const instanceNameLive = useWatch<InstanceFormData>({
    name: "basicInformation.name",
    control: instanceControl,
  });

  const helperText = () => {
    if (location.pathname.includes("/templates")) {
      if (location.pathname.includes("/create")) {
        return `Creating ${type} ${templateNameLive ?? ""}`;
      } else if (location.pathname.includes("/edit")) {
        return `Editing ${type} ${templateNameLive ?? ""}`;
      } else if (templateId) {
        return `Viewing ${type} ${templateNameLive ?? ""}`;
      }
    } else if (location.pathname.includes("/instances")) {
      if (location.pathname.includes("/create")) {
        return `Creating ${type} ${instanceNameLive ?? ""}`;
      } else if (location.pathname.includes("/edit")) {
        return `Editing ${type} ${instanceNameLive ?? ""}`;
      } else if (instanceId) {
        return `Viewing ${type} ${instanceNameLive ?? ""}`;
      }
    }
  };

  return (
    <div
      className={`flex justify-between items-end ${
        isListView
          ? "lg:mx-[10%] mx-0"
          : "lg:mx-[20%] md:mx-[15%] sm:mx-[5%] xs:mx-0"
      }`}
    >
      <div className="flex flex-col">
        <span className="text-sm italic">{helperText()}</span>
        <h1 className="text-xl font-semibold tracking-wide">{value}</h1>
      </div>
    </div>
  );
};
