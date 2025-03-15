export default function ButtonsFallback() {
  return (
    <div className="container mx-auto p-4">
      <div className="animate-pulse">
        <div className="mb-4 h-8 w-1/4 rounded bg-gray-200"></div>
        <div className="mb-2 h-4 w-full rounded bg-gray-200"></div>
        <div className="h-4 w-3/4 rounded bg-gray-200"></div>
      </div>
    </div>
  );
}
