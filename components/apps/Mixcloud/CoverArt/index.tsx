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
  };

  // const getTracksCoverArt = () => {
  //   return Promise.all(
  //     thisMix.map((mix) => {
  //       return mix.tracks.slice(6, 8).map((track) => {
  //         return axios
  //           .get(
  //             `https://api.discogs.com/database/search?page=1&per-page=1&q=The Power of Love / Huey Lewis`,
  //             config
  //           )
  //           .then((response) => {
  //             const coverArtDate = new Date().toISOString();
  //             const coverArtLarge = response.data.results[0].cover_image;
  //             const coverArtSmall = response.data.results[0].thumb;
  //             // console.log({ ...track, coverArtLarge, coverArtSmall });
  //             return { ...track, coverArtDate, coverArtLarge, coverArtSmall };
  //           })
  //           .catch((error) => {
  //             console.log(error.response.data.error);
  //             throw error;
  //           });
  //       });
  //     })
  //   );
  // };

  // const getTracksCoverArt2 = () => {
  //   getTracksCoverArt()
  //     .then((data) => {
  //       const newTrackArray = data;
  //       console.log("newTrackArray", newTrackArray);
  //       setNewTracksWithCoverArt((arr) => [...arr, newTrackArray]);
  //     })
  //     .catch((error) => {
  //       console.log("error", error);
  //     });
  // };

  const fetchCoverArtImages = async (artistName: string, trackName: string) => {
    return await axios
      .get(
        `https://api.discogs.com/database/search?page=1&per-page=1&q=${trackName} / ${artistName}`,
        config
      )
      .then((res) => {
        return res.data.results[0];
      });
  };

  const makeAxiosCoverArtRequests = async () => {
    const requests = thisMix[0].tracks.map((track, index) => {
      if (index < 2) {
        return fetchCoverArtImages(track.artistName, track.trackName).then(
          (res) => {
            const newTrack: Track = {
              ...track,
              coverArtDate: new Date().toISOString(),
              coverArtLarge: res.cover_image,
              coverArtSmall: res.thumb,
            };
            console.log("newTrack", newTrack as Track);
            return newTrack;
          }
        );
      }
    });

    console.log("requests", requests);
    return Promise.all(requests);
  };

  const getTracksCoverArt = () => {
    makeAxiosCoverArtRequests().then((res) => console.log("res", res));
  };

  // console.log("newTracks", newTracks);
  // setTracks({ ...tracks, ...newTracks });

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
