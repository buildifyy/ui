interface PopupProps {
  readonly onReset?: () => void;
  readonly onBack?: () => void;
}

export const Popup = ({ onReset, onBack }: PopupProps) => {
  return (
    <div className="fixed h-full w-full z-50 backdrop-blur-sm">
      <div className="rounded-lg bg-white p-8 shadow-2xl fixed left-1/3 top-48">
        <h2 className="text-lg font-bold">Are you sure you want to do that?</h2>

        <p className="mt-2 text-sm text-gray-500">
          Are you sure you want to cancel the template creation process?
        </p>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            className="rounded bg-green-50 px-4 py-2 text-sm font-medium text-green-600"
            onClick={onReset}
          >
            Yes, I'm sure
          </button>

          <button
            type="button"
            className="rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600"
            onClick={onBack}
          >
            No, go back
          </button>
        </div>
      </div>
    </div>
  );
};
