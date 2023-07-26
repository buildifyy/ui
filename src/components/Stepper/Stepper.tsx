export const Stepper = () => {
  return (
    <div className="flex h-[60px] px-28 items-center border-b">
      <h2 className="sr-only">Steps</h2>

      <div className="relative after:absolute after:inset-x-0 after:top-1/2 after:block after:h-0.5 after:-translate-y-1/2 after:rounded-lg after:bg-gray-100 w-full">
        <ol className="relative z-10 flex justify-between text-sm font-medium text-gray-500">
          <li className="flex items-center gap-2 bg-white p-2">
            <span className="h-6 w-6 rounded-full bg-gray-100 text-center text-[10px]/6 font-bold">
              1
            </span>

            <span className="hidden sm:block"> Basic Information </span>
          </li>

          <li className="flex items-center gap-2 bg-white p-2">
            <span className="h-6 w-6 rounded-full bg-blue-600 text-center text-[10px]/6 font-bold text-white">
              2
            </span>

            <span className="hidden sm:block"> Attributes </span>
          </li>

          <li className="flex items-center gap-2 bg-white p-2">
            <span className="h-6 w-6 rounded-full bg-gray-100 text-center text-[10px]/6 font-bold">
              3
            </span>

            <span className="hidden sm:block"> Relationships </span>
          </li>

          <li className="flex items-center gap-2 bg-white p-2">
            <span className="h-6 w-6 rounded-full bg-gray-100 text-center text-[10px]/6 font-bold">
              4
            </span>

            <span className="hidden sm:block"> Metric Types </span>
          </li>
        </ol>
      </div>
    </div>
  );
};
