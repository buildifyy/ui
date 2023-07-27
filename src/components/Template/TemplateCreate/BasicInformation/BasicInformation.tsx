import { Select, Toggle } from "../../..";

interface BasicInformationProps {
  readonly parent: string;
  readonly onChangeParent: (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  readonly name: string;
  readonly onChangeName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  readonly externalId: string;
  readonly onChangeExternalId: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export const BasicInformation = (props: BasicInformationProps) => {
  const {
    parent,
    onChangeParent,
    name,
    onChangeName,
    externalId,
    onChangeExternalId,
  } = props;

  return (
    <div className="flex flex-col mt-5 mx-10 border rounded py-5 items-center overflow-scroll h-[27rem]">
      <div className="flex items-center w-full justify-around pt-5">
        <div className="flex flex-col w-96">
          <label
            htmlFor="parent"
            className="block text-sm font-medium text-gray-700"
          >
            Parent Template
          </label>
          <span className="text-xs text-gray-400 mt-2 w-60">
            Attributes, Relationships and Metric Types will be inherited from
            this template.
          </span>
        </div>
        <Select
          id="parent"
          name="parent"
          onChange={onChangeParent}
          value={parent}
          widthClassName="w-64"
        />
      </div>
      <hr className="w-[84%] my-6" />
      <div className="flex items-center w-full justify-around">
        <div className="flex flex-col w-96">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Template Name
          </label>
          <span className="text-xs text-gray-400 mt-2 w-60">
            This will be the name of your template.
          </span>
        </div>
        <input
          id="name"
          type="text"
          className="w-64 border h-8 p-2 rounded shadow-sm sm:text-sm text-gray-700"
          required
          value={name}
          onChange={onChangeName}
        />
      </div>
      <hr className="w-[84%] my-6" />
      <div className="flex items-center w-full justify-around">
        <div className="flex flex-col w-96">
          <label
            htmlFor="externalId"
            className="block text-sm font-medium text-gray-700"
          >
            External ID
          </label>
          <span className="text-xs text-gray-400 mt-2">
            A unique identifier for your template.
          </span>
        </div>
        <input
          id="externalId"
          type="text"
          className="w-64 border h-8 p-2 rounded shadow-sm sm:text-sm text-gray-700"
          required
          value={externalId}
          onChange={onChangeExternalId}
        />
      </div>
      <hr className="w-[84%] my-6" />
      <div className="flex items-center w-full justify-around">
        <div className="flex flex-col w-96">
          <label
            htmlFor="custom"
            className="block text-sm font-medium text-gray-700"
          >
            Custom
          </label>
          <span className="text-xs text-gray-400 mt-2">
            Specifies if the template is custom or out-of-the-box.
          </span>
        </div>
        <div className="flex w-64">
          <div className="flex flex-col w-96 items-end">
            <Toggle id="custom" name="custom" value={true} isDisabled />
            <span className="text-xs text-gray-400 mt-2">
              This value cannot be changed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
