export const Footer = () => {
  return (
    <div className="grid h-[60px] px-28 items-center border-t grid-cols-[1fr,1fr,auto]">
      <div className="grid-item"></div>
      <div className="grid-item"></div>
      <div className="grid-item">
        <div className="inline-block rounded px-5 py-1 w-fit text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500">
          Cancel
        </div>
        <div className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-1 w-fit text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500 ml-5">
          Continue
        </div>
      </div>
    </div>
  );
};
