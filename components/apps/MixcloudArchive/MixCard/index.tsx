import StyledMixCard from "components/apps/MixcloudArchive/MixCard/StyledMixCard";
import { useMixcloudArchive } from "contexts/mixcloudArchive";
import { bulletItem } from "utils/functions";

const MixCard = (): JSX.Element => {
  const { getMixByMixcloudKey, mixcloudKey } = useMixcloudArchive();

  return (
    <>
      {getMixByMixcloudKey(mixcloudKey).map(
        ({ category, coverArtSmall, duration, name, releaseDate }) => {
          return (
            <StyledMixCard key={mixcloudKey}>
              <figcaption>
                {coverArtSmall ? (
                  <img alt={name} src={coverArtSmall} />
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
