import StyledDebug from "components/apps/Mixcloud/Debug/StyledDebug";
import Duration from "components/apps/Mixcloud/Duration";
import { useMixcloud } from "contexts/mixcloud";

const Debug = (): JSX.Element => {
  const {
    currentTrackDiv,
    duration,
    handleVolumeMouseDown,
    handleVolumeChange,
    handleVolumeMouseUp,
    loadedProgress,
    mixcloudKey,
    mixcloudRef,
    played,
    playing,
    populateProgressLogFromFile,
    progressLog,
    seeking,
    setMixcloudKey,
    ready,
    volume,
  } = useMixcloud();

  const renderLoadButton = (key: string, label: string): JSX.Element => {
    return (
      <button onClick={() => setMixcloudKey(key)} type="button">
        {label}
      </button>
    );
  };

  return (
    <StyledDebug>
      {renderLoadButton("my-pair-of-shoes-100-mix-retrospective", "100")}
      {renderLoadButton("my-pair-of-shoes-volume-88", "88")}
      <p>
        {" "}
        <button onClick={() => populateProgressLogFromFile()} type="button">
          Refresh progressLog
        </button>
      </p>
      <p>
        {" "}
        <button
          onClick={() => setMixcloudKey("my-pair-of-shoes-volume-89")}
          type="button"
        >
          Load new mix
        </button>
      </p>
      <dl>
        <dt>progressLog</dt>
        <dd>{JSON.stringify(progressLog)}</dd>
        <dt>mixcloudRef</dt>
        <dd>{mixcloudRef?.toString()}</dd>
        <dt>mixcloudKey</dt>
        <dd>{mixcloudKey?.toString()}</dd>
        <dt>currentTrackDiv</dt>
        <dd>{currentTrackDiv?.toString()}</dd>
        <dt>ready</dt>
        <dd>{ready ? "true" : "false"}</dd>
        <dt>loaded progress</dt>
        <dd>{loadedProgress ? "true" : "false"}</dd>
        <dt>playing</dt>
        <dd>{playing ? "true" : "false"}</dd>
        <dt>seeking</dt>
        <dd>{seeking ? "true" : "false"}</dd>
        <dt>played</dt>
        <dd>
          <progress max={1} value={played} />
        </dd>
        <dt>duration</dt>
        <dd>
          <Duration seconds={duration} />
        </dd>
        <dt>elapsed</dt>
        <dd>
          <Duration seconds={duration * played} />
        </dd>
        <dt>remaining</dt>
        <dd>
          <Duration seconds={duration * (1 - played)} />
        </dd>
        <dt>Volume bar</dt>
        <dd>
          <input
            type="range"
            min={0}
            max={0.999999}
            step="any"
            value={volume}
            onMouseDown={handleVolumeMouseDown}
            onChange={handleVolumeChange}
            onMouseUp={handleVolumeMouseUp}
          />
        </dd>
      </dl>
    </StyledDebug>
  );
};

export default Debug;
