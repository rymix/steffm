import StyledMixesSelectBox from "components/apps/Mixcloud/MixesSelectBox/StyledMixesSelectBox";
import { useMixcloud } from "contexts/mixcloud";

const MixesSelecBox = (): JSX.Element => {
  const { mixes, mixcloudKey, selectedCategory, setMixcloudKey } =
    useMixcloud();
  const showAllCategories = (): JSX.Element[] =>
    mixes.map((mix) => (
      <option
        key={mix.mixcloudKey}
        selected={mix.mixcloudKey === mixcloudKey}
        value={mix.mixcloudKey}
      >
        {mix.name}
      </option>
    ));
  const showFilteredCategories = (): JSX.Element[] =>
    mixes
      .filter((mix) => mix.category === selectedCategory)
      .map((mix) => (
        <option
          key={mix.mixcloudKey}
          selected={mix.mixcloudKey === mixcloudKey}
          value={mix.mixcloudKey}
        >
          {mix.name}
        </option>
      ));

  return (
    <StyledMixesSelectBox onChange={(e) => setMixcloudKey(e.target.value)}>
      {selectedCategory === "all"
        ? showAllCategories()
        : showFilteredCategories()}
    </StyledMixesSelectBox>
  );
};

export default MixesSelecBox;
