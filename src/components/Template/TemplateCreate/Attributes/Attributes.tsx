import { AddPanel, Panel } from "../../..";
import { Attribute } from "../../../../models";

interface AttributeProps {
  readonly attributes: Attribute[];
  readonly addAttribute: (attr: Attribute) => void;
  readonly removeAttribute: (id: string) => void;
}

export const Attributes = ({
  attributes,
  addAttribute,
  removeAttribute,
}: AttributeProps) => {
  const handleAddAttribute = () => {
    addAttribute({
      id: attributes.length.toString(),
      name: "Untitled Attribute",
      isOpen: true,
    });
  };

  const handleRemoveAttribute = (id: string) => {
    removeAttribute(id);
  };

  return (
    <div className="flex flex-col mt-5 mx-10 border rounded py-10 px-10 items-center overflow-scroll h-[27rem]">
      <div className="space-y-4 w-full">
        {attributes.map((attr: Attribute) => {
          return (
            <Panel
              key={attr.id}
              attribute={attr}
              onRemove={handleRemoveAttribute}
            />
          );
        })}
        <AddPanel onAdd={handleAddAttribute} />
      </div>
    </div>
  );
};
