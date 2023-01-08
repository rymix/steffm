/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */
import StyledLibraryItem from "components/apps/Mixcloud/LibraryIndex/StyledLibraryItem";
import { useMixcloud } from "contexts/mixcloud";

const LibraryItem = (props: any): JSX.Element => {
  const { mixcloudKeyItem: mixcloudKey } = props;
  const { getMixByMixcloudKey, mixes, setMixcloudKey } = useMixcloud();

  return (
    <StyledLibraryItem>
      {getMixByMixcloudKey(mixcloudKey).map(({ name: mixName, tracks }) => {
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
            return (
              <>
                <dd>{trackName}</dd>
                <dd>{artistName}</dd>
              </>
              // <TracklistItem
              //   key={sectionNumber}
              //   artistName={artistName}
              //   progressThroughCurrentTrack={0}
              //   publisher={publisher}
              //   remixArtistName={remixArtistName}
              //   sectionNumber={sectionNumber}
              //   startTime={startTime}
              //   trackName={trackName}
              // />
            );
          }
        );
      })}
    </StyledLibraryItem>
  );
};

export default LibraryItem;
