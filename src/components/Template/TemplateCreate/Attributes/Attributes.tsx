import { AddPanel, Panel } from "../../..";
import { Attribute } from "../../../../models";

interface AttributeProps {
  readonly attributes: Attribute[];
  readonly addAttribute: (attr: Attribute) => void;
  readonly openAttribute: (id: string) => void;
  readonly removeAttribute: (id: string) => void;
}

export const Attributes = ({
  attributes,
  addAttribute,
  openAttribute,
  removeAttribute,
}: AttributeProps) => {
  const handleAddAttribute = () => {
    addAttribute({
      id: attributes.length.toString(),
      name: "new attribute",
      isOpen: true,
    });
  };

  const handleRemoveAttribute = (id: string) => {
    removeAttribute(id);
  };

  const handleOpenAttribute = (id: string) => {
    openAttribute(id);
  };

  return (
    <div className="flex flex-col mt-5 mx-10 border rounded py-10 px-10 items-center overflow-scroll h-[27rem]">
      <div className="space-y-4 w-full">
        {attributes.map((attr: Attribute) => {
          return (
            <Panel
              key={attr.id}
              attribute={attr}
              onOpen={handleOpenAttribute}
              onRemove={handleRemoveAttribute}
            />
          );
        })}
        <AddPanel onAdd={handleAddAttribute} />
      </div>
    </div>
  );
};
