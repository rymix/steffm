/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */
import StyledLibraryIndex from "components/apps/Mixcloud/LibraryIndex/StyledLibraryIndex";
import { useMixcloud } from "contexts/mixcloud";

const LibraryIndex = (): JSX.Element => {
  const { mixes, setMixcloudKey } = useMixcloud();
  const farts: JSX.Element[] = [];

  mixes.map(({ mixcloudKey: mixcloudKeyItem, name, tracks }) => {
    farts.push(<dt onClick={() => setMixcloudKey(mixcloudKeyItem)}>{name}</dt>);
    tracks.map(({ trackName }) => {
      farts.push(<dd>{trackName}</dd>);
    });
  });

  return <StyledLibraryIndex>{farts}</StyledLibraryIndex>;
};

export default LibraryIndex;
