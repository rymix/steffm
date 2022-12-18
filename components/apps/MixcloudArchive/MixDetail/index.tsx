import { hoursMinutesSecondsToSeconds } from "components/apps/MixcloudArchive/functions";
import StyledMixDetail from "components/apps/MixcloudArchive/MixDetail/StyledMixDetail";
import TracklistItem from "components/apps/MixcloudArchive/MixDetail/TracklistItem";
import { useMixcloudArchive } from "contexts/mixcloudArchive";
import { useEffect, useRef } from "react";
import { clamp } from "utils/functions";

const isActive = (
  timestampFraction: number,
  nextTimestampFraction: number,
  progressFraction: number
): boolean => {
  return (
    progressFraction > timestampFraction &&
    progressFraction < nextTimestampFraction
  );
};

const trackProgressCalculator = (
  trackProgress: number,
  trackLength: number
): number => {
  const trackProgressPercentage = (trackProgress / trackLength) * 100;
  return clamp(trackProgressPercentage, 0, 100);
};

const MixDetail = (): JSX.Element => {
  const {
    currentTrackDiv,
    duration,
    getMixByMixcloudKey,
    mixcloudKey,
    played,
    setCurrentTrackDiv,
  } = useMixcloudArchive();
  const trackRefs = useRef<HTMLDivElement[]>([]);
  const addToRefs = (el: HTMLDivElement, index: number): HTMLDivElement => {
    if (!el || trackRefs.current.includes(el)) return el;
    trackRefs.current.splice(index, 0, el);
    return el;
  };

  useEffect(() => {
    currentTrackDiv?.parentElement?.parentElement?.scrollTo({ top: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mixcloudKey]);

  useEffect(() => {
    const scrollToPosition = currentTrackDiv?.parentElement?.offsetTop || 0;
    const scrollToOffset = 100;
    currentTrackDiv?.parentElement?.parentElement?.scrollTo({
      behavior: "smooth",
      top: scrollToPosition - scrollToOffset,
    });
  }, [currentTrackDiv]);

  return (
    <StyledMixDetail key={mixcloudKey}>
      <ol>
        {getMixByMixcloudKey(mixcloudKey).map(({ tracks }) => {
          return tracks.map(
            (
              {
                artistName,
                publisher,
                remixArtistName,
                sectionNumber,
                startTime,
                trackName,
              },
              index
            ) => {
              const timestampFraction =
                hoursMinutesSecondsToSeconds(startTime) / duration;
              const nextTimestampFraction =
                hoursMinutesSecondsToSeconds(
                  tracks[
                    index + 1 >= tracks.length ? tracks.length - 1 : index + 1
                  ].startTime
                ) / duration;
              const progressThroughCurrentTrack = trackProgressCalculator(
                played - timestampFraction,
                nextTimestampFraction - timestampFraction
              );

              if (
                currentTrackDiv !== trackRefs.current[index] &&
                isActive(timestampFraction, nextTimestampFraction, played)
              ) {
                setCurrentTrackDiv(trackRefs.current[index]);
              }

              return (
                <TracklistItem
                  key={sectionNumber}
                  artistName={artistName}
                  className={
                    isActive(timestampFraction, nextTimestampFraction, played)
                      ? "active"
                      : undefined
                  }
                  divRef={(element: HTMLDivElement) =>
                    addToRefs(element, index)
                  }
                  progressThroughCurrentTrack={progressThroughCurrentTrack}
                  publisher={publisher}
                  remixArtistName={remixArtistName}
                  sectionNumber={sectionNumber}
                  startTime={startTime}
                  trackName={trackName}
                />
              );
            }
          );
        })}
      </ol>
    </StyledMixDetail>
  );
};

export default MixDetail;
