const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[15%] px-6 md:px-24 absolute text-white bg-gradient-to-b from-black z-10">
      <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>
      <h2 className="hidden md:inline-block py-6 text-lg w-1/4">{overview}</h2>
      <div className="my-4 md:m-0">
        <button className="bg-white text-black py-1 md:py-4 px-2 md:px-12 mx-2 text-lg rounded-lg hover:opacity-80">
          ▶️ Play
        </button>
        <button className="hidden md:inline-block bg-gray-500 text-white p-4 px-12 mx-2 text-lg bg-opacity-50 rounded-lg hover:opacity-80">
          More Info
        </button>
      </div>
    </div>
  );
};
export default VideoTitle;
