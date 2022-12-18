import MixesSearchBox from "components/apps/MixcloudArchive/MixesAndTracksSearchBox";
import MixesSelectBox from "components/apps/MixcloudArchive/MixesSelectBox";
import StyledMixesSelector from "components/apps/MixcloudArchive/MixesSelector/StyledMixesSelector";

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
