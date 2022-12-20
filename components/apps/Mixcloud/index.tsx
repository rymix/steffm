import MixDetail from "components/apps/Mixcloud/MixDetail";
import MixesSelector from "components/apps/Mixcloud/MixesSelector";
import MixHeader from "components/apps/Mixcloud/MixHeader";
import Player from "components/apps/Mixcloud/Player";
import StyledMixcloud from "components/apps/Mixcloud/StyledMixcloud";
import type { ComponentProcessProps } from "components/system/Apps/RenderComponent";
import StyledLoading from "components/system/Files/FileManager/StyledLoading";
import { useMixcloud } from "contexts/mixcloud";

const Mixcloud: FC<ComponentProcessProps> = () => {
  const { loading } = useMixcloud();

  return (
    <>
      {loading && <StyledLoading />}
      <StyledMixcloud>
        <MixesSelector />
        <Player />
        <MixHeader />
        <MixDetail />
      </StyledMixcloud>
    </>
  );
};

export default Mixcloud;
