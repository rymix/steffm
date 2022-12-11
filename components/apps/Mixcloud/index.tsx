import MixDetail from "components/apps/Mixcloud/MixDetail";
import MixesSelector from "components/apps/Mixcloud/MixesSelector";
import MixHeader from "components/apps/Mixcloud/MixHeader";
import Player from "components/apps/Mixcloud/Player";
import StyledMixcloud from "components/apps/Mixcloud/StyledMixcloud";

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
