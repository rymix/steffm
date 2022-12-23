import StyledSystemTrayControls from "components/apps/Mixcloud/SystemTrayControls/StyledSystemTrayControls";
import useNextFocusable from "components/system/Window/useNextFocusable";
import { useMixcloud } from "contexts/mixcloud";
import { useProcesses } from "contexts/process";
import { useSession } from "contexts/session";
import Button from "styles/common/Button";
import Icon from "styles/common/Icon";

const SystemTrayControls = (): JSX.Element => {
  const { playing, ready, setPlaying } = useMixcloud();
  const {
    open,
    minimize,
    processes: { Mixcloud: { minimized = false } = {} } = {},
  } = useProcesses();
  const id = "Mixcloud";
  const { foregroundId, setForegroundId } = useSession();
  const isForeground = id === foregroundId;
  const nextFocusableId = useNextFocusable(id);

  const playPauseToggle = (): void => {
    if (!ready) open(id);

    if (playing) {
      setPlaying(false);
    } else {
      setPlaying(true);
    }

    if (minimized || isForeground) minimize(id);
    setForegroundId(isForeground ? nextFocusableId : id);
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
        </figure>
      </Button>
    </StyledSystemTrayControls>
  );
};

export default SystemTrayControls;
