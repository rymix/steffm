import { startTimeToIndex } from "components/apps/MixcloudArchive/functions";
import StyledTracklistItem from "components/apps/MixcloudArchive/MixDetail/StyledTracklistItem";
import { useMixcloudArchive } from "contexts/mixcloudArchive";
import { bulletItem } from "utils/functions";

type TracklistItemProps = {
  artistName: string;
  className?: string;
  divRef?: (element: HTMLDivElement) => HTMLDivElement | null | undefined;
  progressThroughCurrentTrack: number;
  publisher: string;
  remixArtistName?: string;
  sectionNumber: number;
  startTime: string;
  trackName: string;
};

const TracklistItem = ({
  artistName,
  className,
  divRef,
  progressThroughCurrentTrack,
  publisher,
  remixArtistName,
  sectionNumber,
  startTime,
  trackName,
}: TracklistItemProps): JSX.Element => {
  const { duration, seekTo } = useMixcloudArchive();

  return (
    <StyledTracklistItem
      key={sectionNumber}
      className={className}
      onClick={() => seekTo(startTimeToIndex(startTime, duration))}
      trackProgressPercentage={progressThroughCurrentTrack}
      value={sectionNumber}
    >
      <div ref={divRef} className="section-number" id={trackName}>
        {sectionNumber}
      </div>
      <div className="track-details">
        <h1>{trackName}</h1>
        <h2>
          {artistName}
          {bulletItem(remixArtistName)}
          {bulletItem(publisher)}
        </h2>
      </div>
      <div className="start-time">{startTime}</div>
    </StyledTracklistItem>
  );
};

export default TracklistItem;
