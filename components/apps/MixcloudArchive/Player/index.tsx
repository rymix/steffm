import axios from "axios";
import { mixcloudUrlify } from "components/apps/MixcloudArchive/functions";
import MixCard from "components/apps/MixcloudArchive/MixCard";
import StyledPlayer from "components/apps/MixcloudArchive/Player/StyledPlayer";
import { useMixcloudArchive } from "contexts/mixcloudArchive";
import { useProcesses } from "contexts/process";
import type { LegacyRef } from "react";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

import useMixcloudWindowSize from "../useMixcloudWindowSize";

const MixcloudPlayer = (): JSX.Element => {
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
  } = useMixcloudArchive();
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
    axios("https://widget.mixcloud.com/media/js/widgetApi.js")
      .then((response) => {
        if (response.status === 200) {
          setPlayerSwitcher(<MixcloudPlayer />);
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