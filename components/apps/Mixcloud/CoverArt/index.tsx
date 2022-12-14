/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */
import axios from "axios";
import StyledCoverArt from "components/apps/Mixcloud/CoverArt/StyledCoverArt";
import { Track } from "components/apps/Mixcloud/types";
import { useMixcloud } from "contexts/mixcloud";
import { useState } from "react";

type TrackArtProps = {
  cover_image: string;
  thumb: string;
};

const CoverArt = (): JSX.Element => {
  const { getMixByMixcloudKey } = useMixcloud();
  const thisMix = getMixByMixcloudKey("adventures-in-decent-music-volume-37");
  const [newTracksWithCoverArt, setNewTracksWithCoverArt] = useState<Track[]>(
    []
  );
  const discogsToken = "iyiHgpwTdcfUkpZQmaIyIGJLUAdBzHYJKtTTaUWp";
  const config = {
    headers: {
      Authorization: `Discogs token=${discogsToken}`,
      "Content-Type": "application/json",
    },
  };

  const getTracksCoverArt = () => {
    return Promise.all(
      thisMix.map((mix) => {
        return mix.tracks.slice(6, 8).map((track) => {
          return axios
            .get(
              `https://api.discogs.com/database/search?page=1&per-page=1&q=The Power of Love / Huey Lewis`,
              config
            )
            .then((response) => {
              const coverArtDate = new Date().toISOString();
              const coverArtLarge = response.data.results[0].cover_image;
              const coverArtSmall = response.data.results[0].thumb;
              // console.log({ ...track, coverArtLarge, coverArtSmall });
              return { ...track, coverArtDate, coverArtLarge, coverArtSmall };
            })
            .catch((error) => {
              console.log(error.response.data.error);
              throw error;
            });
        });
      })
    );
  };

  const getTracksCoverArt2 = () => {
    getTracksCoverArt()
      .then((data) => {
        const newTrackArray = data;
        console.log("newTrackArray", newTrackArray);
        setNewTracksWithCoverArt((arr) => [...arr, newTrackArray]);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  // useEffect(() => {
  //   console.log("newTracksWithCoverArt", newTracksWithCoverArt);
  // }, [newTracksWithCoverArt]);

  return (
    <StyledCoverArt>
      <button
        onClick={getTracksCoverArt}
        type="button"
        style={{ margin: "0.5em", padding: "1em" }}
      >
        Generate M3U Playlist
      </button>
      <button
        onClick={getTracksCoverArt}
        type="button"
        style={{ margin: "0.5em", padding: "1em" }}
      >
        Fetch Mix Cover Art
      </button>
      <button
        onClick={getTracksCoverArt2}
        type="button"
        style={{ margin: "0.5em", padding: "1em" }}
      >
        Fetch Tracks Cover Art
      </button>
      <dl>
        <dt>thisMix</dt>
        <dd>{thisMix[0]?.name}</dd>
      </dl>
      <ul>
        {newTracksWithCoverArt.toString()}
        {/* {newTracksWithCoverArt.map(( {trackName, artistName, remixArtistName, publisher, coverArtLarge, coverArtSmall}) => {
              return (
                <li key={trackName}>
                  {trackName} / {artistName} / {remixArtistName} / {publisher}
                </li>
              );
            });
        })} */}
      </ul>
    </StyledCoverArt>
  );
};

export default CoverArt;
