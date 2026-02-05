type Props = {
  title?: string;
  description?: string;
};

function SpinnerEmpty({ title, description }: Props) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
        </div>

        <h2 className="text-xl font-semibold text-gray-900">
          {title || "Processing your request"}
        </h2>

        <p className="text-sm text-gray-600 max-w-md">
          {description ||
            "Please wait while we process your request. Do not refresh the page."}
        </p>
      </div>
    </div>
  );
}

export default SpinnerEmpty;
