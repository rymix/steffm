import StyledSystemTrayControls from "components/apps/MixcloudArchive/SystemTrayControls/StyledSystemTrayControls";
import { useMixcloud } from "contexts/mixcloud";
import { useProcesses } from "contexts/process";
import Button from "styles/common/Button";
import Icon from "styles/common/Icon";

const SystemTrayControls = (): JSX.Element => {
  const { playing, ready, setPlaying } = useMixcloud();
  const { open } = useProcesses();
  const playPauseToggle = (): void => {
    if (!ready) open("MixcloudPlayer");

    if (playing) {
      setPlaying(false);
    } else {
      setPlaying(true);
    }
  };

  return (
    <StyledSystemTrayControls>
      <Button onClick={playPauseToggle}>
        <figure>
          <Icon
            alt={playing ? "Pause" : "Play"}
            imgSize={24}
            src={playing ? "/System/Icons/pause" : "/System/Icons/play"}
          />
          {playing ? "Y" : "N"}
        </figure>
      </Button>
    </StyledSystemTrayControls>
  );
};

export default SystemTrayControls;
