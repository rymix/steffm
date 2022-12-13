/* eslint-disable */
import StyledCoverArt from "components/apps/Mixcloud/CoverArt/StyledCoverArt";
import { useMixcloud } from "contexts/mixcloud";

type TrackArtProps = {
  cover_image: string;
  thumb: string;
};

const CoverArt = (): JSX.Element => {
  const { getMixByMixcloudKey } = useMixcloud();
  const thisMix = getMixByMixcloudKey("adventures-in-decent-music-volume-37");
  const discogsToken = "iyiHgpwTdcfUkpZQmaIyIGJLUAdBzHYJKtTTaUWp";
  const config = {
    headers: {
      Authorization: `Discogs token=${discogsToken}`,
      "Content-Type": "application/json",
    },
  };

  // return JSON.stringify(JSON.parse(code), undefined, 2);

  // const promises: TrackArtProps[] = [];

  // const getTrackCoverArt = (query: string): TrackArtProps => {
  //   axios
  //     .get(
  //       `https://api.discogs.com/database/search?page=1&per-page=1&q=${query}`,
  //       config
  //     )
  //     .then((response) => {
  //       if (response.status === 200 && response.data) {
  //         const art = {
  //           cover_image: response.data.results[0].cover_image,
  //           thumb: response.data.results[0].thumb,
  //         };
  //         console.log("gonna return", art);
  //         promises.push(art);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("error", error);
  //     });
  //   return { cover_image: "empty", thumb: "empty" };
  // };

  // Promise.all(promises).then((responses) =>
  //   console.log("responses", responses)
  // );

  return (
    <StyledCoverArt>
      <dl>
        <dt>thisMix</dt>
        <dd>{thisMix[0]?.name}</dd>
      </dl>
      <ul>
        {thisMix.map((mix) => {
          return mix.tracks
            .slice(7, 8)
            .map(({ artistName, trackName, publisher, remixArtistName }) => {
              return (
                <li key={trackName}>
                  {trackName} / {artistName} / {remixArtistName} / {publisher}
                  <br />
                  <img alt="farts" src="" />
                </li>
              );
            });
        })}
      </ul>
    </StyledCoverArt>
  );
};

export default CoverArt;
