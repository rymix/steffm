import { useMixcloudArchive } from "contexts/mixcloudArchive";
import { bulletItem } from "utils/functions";

import StyledMixHeader from "./StyledMixHeader";

const MixHeader = (): JSX.Element => {
  const { getMixByMixcloudKey, mixcloudKey } = useMixcloudArchive();

  return (
    <>
      {getMixByMixcloudKey(mixcloudKey).map(
        ({ category, duration, name, notes, releaseDate }) => {
          return (
            <StyledMixHeader key={mixcloudKey}>
              <figcaption>
                <div className="title-card">
                  <h1>{name}</h1>
                  <h2>
                    {category}
                    {bulletItem(releaseDate)}
                    {bulletItem(duration)}
                  </h2>
                  <p>{notes}</p>
                </div>
              </figcaption>
            </StyledMixHeader>
          );
        }
      )}
    </>
  );
};

export default MixHeader;
