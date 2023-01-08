/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */
import StyledLibraryIndex from "components/apps/Mixcloud/LibraryIndex/StyledLibraryIndex";
import { useMixcloud } from "contexts/mixcloud";
import LibraryItem from "./LibraryItem";

const LibraryIndex = (): JSX.Element => {
  const { mixes, setMixcloudKey } = useMixcloud();

  return (
    <StyledLibraryIndex>
      {mixes.map(({ mixcloudKey: mixcloudKeyItem }) => (
        <LibraryItem mixcloudKeyItem={mixcloudKeyItem} />
      ))}
    </StyledLibraryIndex>
  );
};

export default LibraryIndex;
