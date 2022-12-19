import type { ComponentProcessProps } from "components/system/Apps/RenderComponent";
import useMixcloudContextState from "contexts/mixcloud/useMixcloudContextState";
import Button from "styles/common/Button";

import StyledMixcloud from "./StyledMixcloud";

const Mixcloud: FC<ComponentProcessProps> = ({ id }) => {
  const { loading, setLoading, url } = useMixcloudContextState();

  return (
    <StyledMixcloud>
      <Button onClick={() => setLoading(true)} type="button">
        setLoading false
      </Button>
      <p>id: {id}</p>
      <p>url: {url}</p>
      <p>loading: {loading ? "true" : "false"}</p>
    </StyledMixcloud>
  );
};

export default Mixcloud;
