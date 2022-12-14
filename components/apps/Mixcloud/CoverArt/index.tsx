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
          const newTrack: Track = {
            ...track,
            coverArtDate: new Date().toISOString(),
            coverArtLarge:
              result && result.cover_image ? result.cover_image : "",
            coverArtSmall: result && result.thumb ? result.thumb : "",
          };
          return newTrack as Track;
        }
      );
    });

    return Promise.all(requests);
  };

  const getTracksCoverArt = () => {
    makeAxiosCoverArtRequests().then((results) => {
      setNewTracksWithCoverArt([...results]);
    });
  };

  const hmsToMs = (hms: string) => {
    const pieces = hms.split(":");
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    if (pieces.length === 2) {
      hours = 0;
      minutes = parseInt(pieces[0]);
      seconds = parseInt(pieces[1]);
    } else {
      hours = parseInt(pieces[0]);
      minutes = parseInt(pieces[1]);
      seconds = parseInt(pieces[2]);
    }

    const newMinutes = hours * 60 + minutes;
    const ms =
      String(newMinutes).padStart(2, "0") +
      ":" +
      String(seconds).padStart(2, "0") +
      ":00";

    return ms;
  };

  const copyToClipboard = () => {
    const copyText = document?.getElementById("m3u")?.innerHTML
      ? document
          ?.getElementById("m3u")
          ?.innerHTML.replaceAll("&nbsp;", " ")
          .replaceAll("<br>", "\r\n")
          .replaceAll("&amp;", "&")
      : "";
    navigator.clipboard.writeText(copyText).then(() => {
      // Alert the user that the action took place.
      // Nobody likes hidden stuff being done under the hood!
      alert("Copied to clipboard");
    });
  };

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
        onClick={copyToClipboard}
        type="button"
        style={{ margin: "0.5em", padding: "1em" }}
      >
        Copy M3U to Clipboard
      </button>
      {/* <button
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
      <h1>{thisMix[0]?.name}</h1>

      <h2>M3U Export</h2>
      <code id="m3u">
        PERFORMER "Stef.FM"
        <br />
        TITLE "{thisMix[0]?.name}"
        <br />
        FILE "{thisMix[0]?.fileName}" MP3
        <br />
        {newTracksWithCoverArt.map(
          ({
            artistName,
            trackName,
            publisher,
            coverArtLarge,
            coverArtSmall,
            sectionNumber,
            startTime,
          }) => {
            return (
              <>
                &nbsp;&nbsp;TRACK {String(sectionNumber).padStart(2, "0")} AUDIO
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;PERFORMER "{artistName}"
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;TITLE "{trackName}"
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;INDEX 01 {hmsToMs(startTime)}
                <br />
              </>
            );
          }
        )}
      </code>

      <h2>Cover Art Listing</h2>
      {newTracksWithCoverArt.map(
        ({ trackName, publisher, coverArtLarge, coverArtSmall }) => {
          return (
            <dl key={trackName}>
              <dt>trackName</dt>
              <dd>{trackName}</dd>
              <dt>publisher</dt>
              <dd>{publisher}</dd>
              <dt>coverArtLarge</dt>
              <dd>{coverArtLarge}</dd>
              <dt>coverArtSmall</dt>
              <dd>{coverArtSmall}</dd>
              <dd>
                <img src={coverArtSmall} alt={trackName} />
              </dd>
              <dt>-----------------------------------</dt>
            </dl>
          );
        }
      )}
    </StyledCoverArt>
  );
};

export default CoverArt;
