type EmptyStateProps = {
  title?: string;
  description?: string;
};

export function EmptyState({
  title = "Nothing here yet",
  description = "There are no items to display at the moment.",
}: EmptyStateProps) {
  return (
    <div className="min-h-100 bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center space-y-3">
        <div className="flex justify-center mb-4">
          <svg
            className="w-16 h-16 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>

        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

        <p className="text-sm text-gray-600 max-w-sm">{description}</p>
      </div>
    </div>
  );
}
