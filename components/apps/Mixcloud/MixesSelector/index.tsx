import MixesSearchBox from "components/apps/Mixcloud/MixesAndTracksSearchBox";
import MixesSelectBox from "components/apps/Mixcloud/MixesSelectBox";
import StyledMixesSelector from "components/apps/Mixcloud/MixesSelector/StyledMixesSelector";

const MixesSelector = (): JSX.Element => {
  return (
    <StyledMixesSelector>
      <div id="select-wrapper">
        <MixesSelectBox />
      </div>
      <div id="search-wrapper">
        <MixesSearchBox />
      </div>
    </StyledMixesSelector>
  );
};

export default MixesSelector;
