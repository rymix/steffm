import StyledMixCard from "components/apps/Mixcloud/MixCard/StyledMixCard";
import { useMixcloud } from "contexts/mixcloud";
import { bulletItem } from "utils/functions";

const MixCard = (): JSX.Element => {
  const { getMixByMixcloudKey, mixcloudKey } = useMixcloud();

  return (
    <>
      {getMixByMixcloudKey(mixcloudKey).map(
        ({ category, coverArtSmall, duration, name, releaseDate }) => {
          return (
            <StyledMixCard key={mixcloudKey}>
              <figcaption>
                {coverArtSmall ? (
                  <img src={coverArtSmall} alt={name} />
                ) : undefined}
                <div className="title-card">
                  <h1>{name}</h1>
                  <h2>
                    {category}
                    {bulletItem(releaseDate)}
                    {bulletItem(duration)}
                  </h2>
                </div>
              </figcaption>
            </StyledMixCard>
          );
        }
      )}
    </>
  );
};

export default MixCard;
