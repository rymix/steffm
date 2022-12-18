import MixDetail from "components/apps/MixcloudArchive/MixDetail";
import MixesSelector from "components/apps/MixcloudArchive/MixesSelector";
import MixHeader from "components/apps/MixcloudArchive/MixHeader";
import Player from "components/apps/MixcloudArchive/Player";
import StyledMixcloud from "components/apps/MixcloudArchive/StyledMixcloud";

const MixcloudLibrary = (): JSX.Element => {
  return (
    <StyledMixcloud>
      <MixesSelector />
      <Player />
      <MixHeader />
      <MixDetail />
    </StyledMixcloud>
  );
};

export default MixcloudLibrary;
