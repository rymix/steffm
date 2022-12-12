/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import StyledCoverArt from "components/apps/Mixcloud/CoverArt/StyledCoverArt";
import { useMixcloud } from "contexts/mixcloud";

const CoverArt = (): JSX.Element => {
  const { getMixByMixcloudKey } = useMixcloud();

  const thisMix = getMixByMixcloudKey("adventures-in-decent-music-volume-38");

  return (
    <StyledCoverArt>
      <dl>
        <dt>thisMix</dt>
        <dd>{thisMix[0]?.name}</dd>
      </dl>
      <ul>
        {thisMix.map((mix) => {
          return mix.tracks.map(
            ({ trackName, coverArtDate, coverArtSmall, coverArtLarge }) => (
              <li key={trackName}>
                {trackName}
                <br />
                {coverArtDate}
                <br />
                {coverArtSmall}
                <br />
                {coverArtLarge}
              </li>
            )
          );
        })}
      </ul>
    </StyledCoverArt>
  );
};

export default CoverArt;
