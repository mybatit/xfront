const Loader = () => {
  return (
    <div className="flex flex-row justify-center gap-2">
      <div className="w-4 h-4 rounded-full bg-sky-500 animate-bounce" />
      <div className="w-4 h-4 rounded-full bg-sky-500 animate-bounce [animation-delay:-.3s]" />
      <div className="w-4 h-4 rounded-full bg-sky-500 animate-bounce [animation-delay:-.5s]" />
    </div>
  );
};

export default Loader;
