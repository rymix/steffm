import AppContainer from "components/apps/AppContainer";
import StyledMixcloud from "components/apps/Mixcloud/StyledMixcloud";
import type { ComponentProcessProps } from "components/system/Apps/RenderComponent";
// import useMixcloud from "components/apps/Mixcloud/useMixcloud";
import { useMixcloud } from "contexts/mixcloud";

const Mixcloud: FC<ComponentProcessProps> = ({ id }) => (
  <AppContainer StyledComponent={StyledMixcloud} id={id} useHook={useMixcloud}>
    <div>Hello World</div>
  </AppContainer>
);

export default Mixcloud;
