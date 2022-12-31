/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */
import StyledMixcloudPlayer from "components/apps/Mixcloud/MixcloudPlayer/StyledMixcloudPlayer";
import { useMixcloud } from "contexts/mixcloud";
import { useProcesses } from "contexts/process";
import type { LegacyRef } from "react";
import { useRef } from "react";

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
  const { mixcloudKey, mixcloudRef, setMixcloudRef } = useMixcloud();
  const {
    processes: { [mixcloudKey]: { url: initialUrl = "" } = {} },
  } = useProcesses();

  setMixcloudRef(useRef<MixcloudPlayerProps>(null));

  useMixcloudWindowSize(mixcloudKey);

  return (
    <StyledMixcloudPlayer>
      <iframe
        key={mixcloudKey}
        ref={mixcloudRef as LegacyRef<HTMLIFrameElement>}
        height="60"
        src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=%2FNTSRadio%2Ffloating-points-jamie-xx-18th-august-2016%2F"
        title={mixcloudKey}
        width="100%"
      />
    </StyledMixcloudPlayer>
  );
};

export default MixcloudPlayer;
