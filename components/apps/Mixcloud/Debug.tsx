import useVideoPlayer from "../VideoPlayer/useVideoPlayer";

const Debug = () => {
  const {} = useVideoPlayer();

  return <p>loading: {loading}</p>;
};

export default Debug;
