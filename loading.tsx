const Loading = () => {
  return (
    <div className="flex items-center justify-center border fixed top-0 left-0 right-0 bottom-0">
      <div className="w-10 h-10 border-4 border-t-red-500 border-gray-300 rounded-full animate-spin" />
    </div>
  );
};

export default Loading;
