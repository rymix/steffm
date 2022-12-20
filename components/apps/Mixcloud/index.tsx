/* eslint-disable no-console */
import type { ComponentProcessProps } from "components/system/Apps/RenderComponent";
import StyledLoading from "components/system/Files/FileManager/StyledLoading";
import { useMixcloud } from "contexts/mixcloud";
import Button from "styles/common/Button";

import StyledMixcloud from "./StyledMixcloud";

const Mixcloud: FC<ComponentProcessProps> = ({ id }) => {
  const { loading, setLoading } = useMixcloud();

  return (
    <>
      {loading && <StyledLoading />}
      <StyledMixcloud>
        <Button onClick={() => setLoading(false)} type="button">
          setLoading false
        </Button>
        <p>id: {id}</p>
        <p>loading: {loading ? "true" : "false"}</p>
      </StyledMixcloud>
    </>
  );
};

export default Mixcloud;
