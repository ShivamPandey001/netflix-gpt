const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-b from-black z-10">
      <h1 className="text-6xl font-bold">{title}</h1>
      <h2 className="py-6 text-lg w-1/4">{overview}</h2>
      <button className="bg-white text-black p-4 px-12 mx-2 text-lg rounded-lg hover:opacity-80">
        ▶️ Play
      </button>
      <button className="bg-gray-500 text-white p-4 px-12 mx-2 text-lg bg-opacity-50 rounded-lg hover:opacity-80">
        More Info
      </button>
    </div>
  );
};
export default VideoTitle;
