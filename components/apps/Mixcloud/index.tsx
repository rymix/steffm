/* eslint-disable no-console */
import type { ComponentProcessProps } from "components/system/Apps/RenderComponent";
import { useMixcloud } from "contexts/mixcloud";
import Button from "styles/common/Button";

import StyledMixcloud from "./StyledMixcloud";

const Mixcloud: FC<ComponentProcessProps> = ({ id }) => {
  const { loading, setLoading, url } = useMixcloud();
  console.log("setLoading", setLoading);
  console.log("url", url);

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
