/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */
import axios from "axios";
import StyledCoverArt from "components/apps/Mixcloud/CoverArt/StyledCoverArt";
import { Mix, Track } from "components/apps/Mixcloud/types";
import { useMixcloud } from "contexts/mixcloud";
import { useState } from "react";

type TrackArtProps = {
  cover_image: string;
  thumb: string;
};

const CoverArt = (): JSX.Element => {
  const { getMixByMixcloudKey } = useMixcloud();
  const thisMix = getMixByMixcloudKey("adventures-in-decent-music-volume-37");
  const [newMixWithCoverArt, setNewMixWithCoverArt] = useState<Mix>({
    category: "",
    duration: "",
    listOrder: 0,
    mixcloudKey: "",
    name: "",
    releaseDate: "",
    shortName: "",
    tracks: [],
  });
  const [newTracksWithCoverArt, setNewTracksWithCoverArt] = useState<Track[]>(
    []
  );
  const [progressTracker, setProgressTracker] = useState({
    copiedToClipboard: false,
    uploadedToMixcloud: false,
    fetchedMixCoverArt: false,
    fetchedTracksCoverArt: false,
    eyeballed: false,
    wroteToMixesJson: false,
  });
  console.log("progressTracker", progressTracker);
  const discogsToken = "iyiHgpwTdcfUkpZQmaIyIGJLUAdBzHYJKtTTaUWp";
  const discogsConfig = {
    headers: {
      Authorization: `Discogs token=${discogsToken}`,
      "Content-Type": "application/json",
    },
    timeout: 5000,
  };

  const fetchTracksCoverArtImages = async (
    artistName: string,
    trackName: string
  ) => {
    return await axios
      .get(
        `https://api.discogs.com/database/search?page=1&per-page=1&q=${trackName} / ${artistName}`,
        discogsConfig
      )
      .then((res) => {
        return res.data.results[0];
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const makeAxiosTracksCoverArtRequests = async () => {
    const requests = thisMix[0].tracks.map((track, index) => {
      return fetchTracksCoverArtImages(track.artistName, track.trackName).then(
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
    makeAxiosTracksCoverArtRequests().then((results) => {
      setNewTracksWithCoverArt([...results]);
      updateProgressTracker("fetchedTracksCoverArt");
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
      updateProgressTracker("copiedToClipboard");
    });
  };

  const fetchMixCoverArtImages = async (mixcloudKey: string) => {
    return await axios
      .get(`https://api.mixcloud.com/rymixxx/${mixcloudKey}`)
      .then((res) => {
        return res.data.pictures;
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const makeAxiosMixCoverArtRequests = async () => {
    const requests = thisMix.map((mix, index) => {
      return fetchMixCoverArtImages(mix.mixcloudKey).then((result) => {
        const newMix: Mix = {
          ...mix,
          coverArtDate: new Date().toISOString(),
          coverArtLarge: result && result.large ? result.large : "",
          coverArtSmall: result && result.medium ? result.medium : "",
        };
        return newMix as Mix;
      });
    });

    return Promise.all(requests);
  };

  const getMixCoverArt = () => {
    makeAxiosMixCoverArtRequests().then((results) => {
      setNewMixWithCoverArt({ ...results[0] });
      updateProgressTracker("fetchedMixCoverArt");
    });
  };

  const confirmMixcloudUpload = () => {
    updateProgressTracker("uploadedToMixcloud");
  };

  const confirmChecked = () => {
    updateProgressTracker("eyeballed");
  };

  const writeToMixesJson = () => {
    console.log("Writing to mixes.json");
    updateProgressTracker("wroteToMixesJson");
  };

  const updateProgressTracker = (keyName: string) => {
    setProgressTracker({ ...progressTracker, [`${keyName}`]: true });
  };

  return (
    <StyledCoverArt>
      <button onClick={copyToClipboard} type="button">
        1. Copy M3U to Clipboard
      </button>
      <button
        onClick={confirmMixcloudUpload}
        type="button"
        disabled={!progressTracker.copiedToClipboard}
      >
        2. Upload Mix and M3U to Mixcloud
      </button>
      <button
        onClick={getMixCoverArt}
        type="button"
        disabled={!progressTracker.uploadedToMixcloud}
      >
        3. Fetch Mix Cover Art from Mixcloud
      </button>
      <button
        onClick={getTracksCoverArt}
        type="button"
        disabled={!progressTracker.fetchedMixCoverArt}
      >
        4. Fetch Tracks Cover Art from Discogs
      </button>
      <button
        onClick={confirmChecked}
        type="button"
        disabled={!progressTracker.fetchedTracksCoverArt}
      >
        5. Confirm Checked Data
      </button>
      <button
        onClick={writeToMixesJson}
        type="button"
        disabled={!progressTracker.eyeballed}
      >
        6. Write to mixes.json
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
        {thisMix[0].tracks.map(
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

      <h2>Mix Cover Art</h2>
      <dl key={newMixWithCoverArt.mixcloudKey}>
        <dt>name</dt>
        <dd>{newMixWithCoverArt.name}</dd>
        <dt>coverArtLarge</dt>
        <dd>{newMixWithCoverArt.coverArtLarge}</dd>
        <dt>coverArtSmall</dt>
        <dd>{newMixWithCoverArt.coverArtSmall}</dd>
        <dd>
          <img
            src={newMixWithCoverArt.coverArtSmall}
            alt={newMixWithCoverArt.name}
          />
        </dd>
      </dl>

      <h2>Tracks Cover Art</h2>
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
