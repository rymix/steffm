import { categories } from "components/apps/Mixcloud/config";
import StyledMixesCategorySelector from "components/apps/Mixcloud/MixesCategorySelector/StyledMixesCategorySelector";
import { useMixcloud } from "contexts/mixcloud";

const MixesSelecBox = (): JSX.Element => {
  const { selectedCategory, setSelectedCategory } = useMixcloud();

  return (
    <StyledMixesCategorySelector
      onChange={(e) => setSelectedCategory(e.target.value)}
    >
      <option value="Select">Select</option>

      {categories.map((category) => (
        <option
          key={category.shortName}
          selected={category.shortName === selectedCategory}
          value={category.shortName}
        >
          {category.name}
        </option>
      ))}
    </StyledMixesCategorySelector>
  );
};

export default MixesSelecBox;
