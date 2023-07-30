import { Attribute } from "../../models";

interface PanelProps {
  readonly attribute: Attribute;
  readonly onRemove: (id: string) => void;
}

export const Panel = ({ attribute, onRemove }: PanelProps) => {
  return (
    <div className="flex justify-between items-center gap-2">
      <details
        className="group rounded-lg bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden w-full"
        open={attribute.isOpen}
      >
        <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
          <span className="font-normal italic text-sm">{attribute.name}</span>

          <span className="relative h-5 w-5 shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 h-5 w-5 opacity-100 group-open:opacity-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 h-5 w-5 opacity-0 group-open:opacity-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
        </summary>

        <div className="mt-4 leading-relaxed text-gray-700 text-sm">
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
              id="name"
              type="text"
              className="w-64 border h-8 p-2 rounded shadow-sm sm:text-sm text-gray-700"
              required
              // value={externalId}
              // onChange={onChangeExternalId}
            />
          </div>
        </div>
      </details>
      <span
        className="text-sm hover:cursor-pointer"
        onClick={() => onRemove(attribute.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="18px"
          height="18px"
        >
          <path d="M 20.5 4 A 1.50015 1.50015 0 0 0 19.066406 6 L 14.640625 6 C 12.803372 6 11.082924 6.9194511 10.064453 8.4492188 L 7.6972656 12 L 7.5 12 A 1.50015 1.50015 0 1 0 7.5 15 L 8.2636719 15 A 1.50015 1.50015 0 0 0 8.6523438 15.007812 L 11.125 38.085938 C 11.423352 40.868277 13.795836 43 16.59375 43 L 31.404297 43 C 34.202211 43 36.574695 40.868277 36.873047 38.085938 L 39.347656 15.007812 A 1.50015 1.50015 0 0 0 39.728516 15 L 40.5 15 A 1.50015 1.50015 0 1 0 40.5 12 L 40.302734 12 L 37.935547 8.4492188 C 36.916254 6.9202798 35.196001 6 33.359375 6 L 28.933594 6 A 1.50015 1.50015 0 0 0 27.5 4 L 20.5 4 z M 14.640625 9 L 33.359375 9 C 34.196749 9 34.974746 9.4162203 35.439453 10.113281 L 36.697266 12 L 11.302734 12 L 12.560547 10.113281 A 1.50015 1.50015 0 0 0 12.5625 10.111328 C 13.025982 9.4151428 13.801878 9 14.640625 9 z M 11.669922 15 L 36.330078 15 L 33.890625 37.765625 C 33.752977 39.049286 32.694383 40 31.404297 40 L 16.59375 40 C 15.303664 40 14.247023 39.049286 14.109375 37.765625 L 11.669922 15 z" />
        </svg>
      </span>
    </div>
  );
};
