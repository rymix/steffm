import axiosMixcloud from "components/apps/Mixcloud/axiosMixcloud";
import { mixcloudUrlify } from "components/apps/Mixcloud/functions";
import MixCard from "components/apps/Mixcloud/MixCard";
import StyledPlayer from "components/apps/Mixcloud/Player/StyledPlayer";
import useMixcloudWindowSize from "components/apps/Mixcloud/useMixcloudWindowSize";
import { useMixcloud } from "contexts/mixcloud";
import { useProcesses } from "contexts/process";
import type { LegacyRef } from "react";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

const ReactMixcloudPlayer = (): JSX.Element => {
  const {
    handleDuration,
    handleProgress,
    loop,
    mixcloudKey,
    mixcloudRef,
    playing,
    setMixcloudRef,
    setPlaying,
    setReady,
    volume,
  } = useMixcloud();
  const {
    processes: { [mixcloudKey]: { url: initialUrl = "" } = {} },
  } = useProcesses();

  setMixcloudRef(useRef<ReactPlayer>(null));

  useMixcloudWindowSize(mixcloudKey);

  return (
    <ReactPlayer
      ref={mixcloudRef as LegacyRef<ReactPlayer>}
      className="react-player"
      height="100%"
      loop={loop}
      onDuration={handleDuration}
      onPause={() => setPlaying(false)}
      onPlay={() => setPlaying(true)}
      onProgress={handleProgress}
      onReady={() => setReady(true)}
      playing={playing}
      url={mixcloudUrlify(mixcloudKey) || initialUrl}
      volume={volume}
      width="100%"
      muted
    />
  );
};

const Player = (): JSX.Element => {
  const [playerSwitcher, setPlayerSwitcher] = useState(<p>Loading</p>);

  useEffect(() => {
    axiosMixcloud("/media/js/widgetApi.js")
      .then((response) => {
        if (response.status === 200 || response.data === null) {
          setPlayerSwitcher(<ReactMixcloudPlayer />);
          // setPlayerSwitcher(<MixcloudPlayer />);
        } else {
          setPlayerSwitcher(<MixCard />);
        }
      })
      .catch((_error) => {
        setPlayerSwitcher(<MixCard />);
      });
  }, []);

  return <StyledPlayer>{playerSwitcher}</StyledPlayer>;
};

export default Player;
