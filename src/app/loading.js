export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
      <p className="text-sm font-medium text-gray-500 tracking-wide">Fetching data from Pet Adoption Platform
...</p>
    </div>
  );
}