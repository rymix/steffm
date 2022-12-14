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
  const [tracks, setTracks] = useState<Track[]>([]);
  const [newTracksWithCoverArt, setNewTracksWithCoverArt] = useState<Track[]>(
    []
  );
  const discogsToken = "iyiHgpwTdcfUkpZQmaIyIGJLUAdBzHYJKtTTaUWp";
  const config = {
    headers: {
      Authorization: `Discogs token=${discogsToken}`,
      "Content-Type": "application/json",
    },
    timeout: 5000,
  };

  const fetchCoverArtImages = async (artistName: string, trackName: string) => {
    return await axios
      .get(
        `https://api.discogs.com/database/search?page=1&per-page=1&q=${trackName} / ${artistName}`,
        config
      )
      .then((res) => {
        return res.data.results[0];
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const makeAxiosCoverArtRequests = async () => {
    const requests = thisMix[0].tracks.map((track, index) => {
      return fetchCoverArtImages(track.artistName, track.trackName).then(
        (result) => {
          console.log("result.length", result);
          const newTrack: Track = {
            ...track,
            coverArtDate: new Date().toISOString(),
            coverArtLarge:
              result && result.cover_image ? result.cover_image : "",
            coverArtSmall: result && result.thumb ? result.thumb : "",
          };
          console.log("newTrack", newTrack as Track);
          return newTrack;
        }
      );
    });

    console.log("requests", requests);
    return Promise.all(requests);
  };

  const getTracksCoverArt = () => {
    makeAxiosCoverArtRequests().then((res) => console.log("res", res));
  };

  return (
    <StyledCoverArt>
      {/* <button
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
      </button> */}
      <button
        onClick={getTracksCoverArt}
        type="button"
        style={{ margin: "0.5em", padding: "1em" }}
      >
        Fetch Tracks Cover Art
      </button>
      <button
        onClick={() => {
          console.log("tracks", tracks);
        }}
        type="button"
        style={{ margin: "0.5em", padding: "1em" }}
      >
        Log
      </button>
      <dl>
        <dt>thisMix</dt>
        <dd>{thisMix[0]?.name}</dd>
        {/* {tracks.map(
          ({ trackName, publisher, coverArtLarge, coverArtSmall }) => {
            <>
              <dt>trackName</dt>
              <dd>{trackName}</dd>
              <dt>publisher</dt>
              <dd>{publisher}</dd>
              <dt>coverArtLarge</dt>
              <dd>{coverArtLarge}</dd>
              <dt>coverArtSmall</dt>
              <dd>{coverArtSmall}</dd>
            </>;
          }
        )} */}
        {/* {Object.entries(singleTrack).map(([key, value], index) => (
          <p key={key}>
            {key}: {value}
          </p>
        ))} */}
        {/* {newTracksWithCoverArt.map(( {trackName, artistName, remixArtistName, publisher, coverArtLarge, coverArtSmall}) => {
              return (
                <li key={trackName}>
                  {trackName} / {artistName} / {remixArtistName} / {publisher}
                </li>
              );
            });
        })} */}
      </dl>
    </StyledCoverArt>
  );
};

export default CoverArt;
