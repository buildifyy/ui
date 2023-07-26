import { useLocation } from "react-router-dom";

export const Footer = () => {
  const location = useLocation();

  if (
    location.pathname !== "/templates/create" &&
    !location.pathname.includes("/templates/edit")
  ) {
    return null;
  }

  return (
    <div className="grid h-[60px] px-28 items-center border-t grid-cols-[1fr,1fr,auto]">
      <div className="grid-item"></div>
      <div className="grid-item"></div>
      <div className="grid-item">
        <button className="inline-block rounded px-5 py-1 w-fit text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500 disabled:opacity-50 disabled:pointer-events-none">
          Cancel
        </button>
        <button className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-1 w-fit text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 ml-5 disabled:opacity-50 disabled:pointer-events-none">
          Continue
        </button>
      </div>
    </div>
  );
};
