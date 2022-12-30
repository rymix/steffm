import StyledMixcloudPlayer from "components/apps/Mixcloud/MixcloudPlayer/StyledMixcloudPlayer";
import { useMixcloud } from "contexts/mixcloud";
import { useProcesses } from "contexts/process";
import type { LegacyRef } from "react";
import { useRef } from "react";
import type ReactPlayer from "react-player";

import useMixcloudWindowSize from "../useMixcloudWindowSize";

type MixcloudPlayerProps = {
  loop: boolean;
  muted: boolean;
  onDuration: () => void;
  onPause: () => void;
  onPlay: () => void;
  onProgress: () => void;
  onReady: () => void;
  playing: boolean;
  url: string;
  volume: number;
};

const MixcloudPlayer = (): JSX.Element => {
  const {
    getMixByMixcloudKey,
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

  setMixcloudRef(useRef<MixcloudPlayerProps>(null));

  useMixcloudWindowSize(mixcloudKey);

  return (
    <StyledMixcloudPlayer>
      {/* <ReactPlayer
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
    /> */}
      <iframe
        key={mixcloudKey}
        ref={mixcloudRef as LegacyRef<ReactPlayer>}
        height="60"
        src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=%2FNTSRadio%2Ffloating-points-jamie-xx-18th-august-2016%2F"
        title={mixcloudKey}
        width="100%"
      />
    </StyledMixcloudPlayer>
  );
};

export default MixcloudPlayer;
