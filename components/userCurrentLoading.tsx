const UserCurrentLoading = () => {
  return (
    <div className=" w-full mx-auto p-6 bg-white font-sans animate-pulse">
      <div className="flex items-center space-x-6">
        <div className="w-32 h-32 rounded-full bg-gray-300 shadow-md" />
        <div className="flex-1 space-y-2">
          <div className="h-6 w-48 bg-gray-300 rounded" />
          <div className="h-4 w-40 bg-gray-200 rounded" />
          <div className="h-4 w-32 bg-blue-200 rounded" />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
        {[...Array(6)].map((_, i) => (
          <div key={i}>
            <div className="h-5 w-32 bg-gray-300 mb-3 rounded" />
            {[...Array(5)].map((_, j) => (
              <div key={j} className="h-4 w-full bg-gray-200 mb-2 rounded" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCurrentLoading;
