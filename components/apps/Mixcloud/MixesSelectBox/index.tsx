import StyledMixesSelectBox from "components/apps/Mixcloud/MixesSelectBox/StyledMixesSelectBox";
import { useMixcloud } from "contexts/mixcloud";

const MixesSelecBox = (): JSX.Element => {
  const { mixes, mixcloudKey, setMixcloudKey } = useMixcloud();

  return (
    <StyledMixesSelectBox onChange={(e) => setMixcloudKey(e.target.value)}>
      <option value="Select">Select</option>

      {mixes.map((mix) => (
        <option
          key={mix.mixcloudKey}
          value={mix.mixcloudKey}
          selected={mix.mixcloudKey === mixcloudKey}
        >
          {mix.name}
        </option>
      ))}
    </StyledMixesSelectBox>
  );
};

export default MixesSelecBox;
