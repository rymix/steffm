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
        return (
          <>
            <dt>{mixName}</dt>
            {tracks.map(({ artistName, trackName }, index) => {
              return (
                <>
                  <dd>{trackName}</dd>
                  <dd>{artistName}</dd>
                </>
              );
            })}
          </>
        );
      })}
    </StyledLibraryItem>
  );
};

export default LibraryItem;
