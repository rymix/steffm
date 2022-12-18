/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios from "axios";
import StyledCoverArt from "components/apps/MixcloudArchive/CoverArt/StyledCoverArt";
import type { Mix, Track } from "components/apps/MixcloudArchive/types";
import { useMixcloudArchive } from "contexts/mixcloudArchive";
import { Fragment, useState } from "react";
import { hmsToMs } from "utils/functions";

const CoverArt = (): JSX.Element => {
  const { getMixByMixcloudKey, mixes } = useMixcloudArchive();
  const [thisMixcloudKey, setThisMixcloudKey] = useState(
    "adventures-in-decent-music-volume-37"
  );
  const thisMix = getMixByMixcloudKey(thisMixcloudKey);
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
    copiedJSONToClipboard: false,
    copiedM3UToClipboard: false,
    eyeballed: false,
    fetchedMixCoverArt: false,
    fetchedTracksCoverArt: false,
    uploadedToMixcloud: false,
    wroteToMixesJson: false,
  });
  const discogsToken = "iyiHgpwTdcfUkpZQmaIyIGJLUAdBzHYJKtTTaUWp";
  const discogsConfig = {
    headers: {
      Authorization: `Discogs token=${discogsToken}`,
      "Content-Type": "application/json",
    },
    timeout: 5000,
  };

  type DiscogsPayload = {
    cover_image: string;
    thumb: string;
  };

  type MixcloudPayload = {
    large: string;
    medium: string;
  };

  const updateProgressTracker = (keyName: string): void => {
    setProgressTracker({ ...progressTracker, [`${keyName}`]: true });
  };

  const fetchTracksCoverArtImages = async (
    artistName: string,
    trackName: string
  ): Promise<DiscogsPayload> => {
    return axios
      .get(
        `https://api.discogs.com/database/search?page=1&per-page=1&q=${trackName} / ${artistName}`,
        discogsConfig
      )
      .then((res) => {
        // console.log("res", res);
        return res.data.results[0];
      })
      .catch((_error) => {
        // console.log("error", error);
      });
  };

  const makeAxiosTracksCoverArtRequests = async (): Promise<Track[]> => {
    const requests = thisMix[0].tracks.map((track) => {
      return fetchTracksCoverArtImages(track.artistName, track.trackName).then(
        (result) => {
          const newTrack: Track = {
            ...track,
            coverArtDate: new Date().toISOString(),
            coverArtLarge:
              result && result.cover_image ? result.cover_image : "",
            coverArtSmall: result && result.thumb ? result.thumb : "",
          };
          return newTrack;
        }
      );
    });

    return Promise.all(requests);
  };

  const getTracksCoverArt = (): void => {
    makeAxiosTracksCoverArtRequests().then((results) => {
      setNewTracksWithCoverArt([...results]);
      setNewMixWithCoverArt({
        ...newMixWithCoverArt,
        tracks: [...results],
      });
      updateProgressTracker("fetchedTracksCoverArt");
    });
  };

  const copyToClipboard = (divId: string): void => {
    const copyText = document?.getElementById(divId)?.innerHTML
      ? document
          ?.getElementById(divId)
          ?.innerHTML.replaceAll("&nbsp;", " ")
          .replaceAll("<br>", "\r\n")
          .replaceAll("&amp;", "&")
      : "";
    navigator.clipboard.writeText(copyText || "").then(() => {
      updateProgressTracker(`copied${divId.toUpperCase()}ToClipboard`);
    });
  };

  const fetchMixCoverArtImages = async (
    mixcloudKey: string
  ): Promise<MixcloudPayload> => {
    return axios
      .get(`https://api.mixcloud.com/rymixxx/${mixcloudKey}`)
      .then((res) => {
        return res.data.pictures;
      })
      .catch((_error) => {
        // console.log("error", error);
      });
  };

  const makeAxiosMixCoverArtRequests = async (): Promise<Mix[]> => {
    const requests = thisMix.map((mix) => {
      return fetchMixCoverArtImages(mix.mixcloudKey).then((result) => {
        const newMix: Mix = {
          ...mix,
          coverArtDate: new Date().toISOString(),
          coverArtLarge: result && result.large ? result.large : "",
          coverArtSmall: result && result.medium ? result.medium : "",
        };
        return newMix;
      });
    });

    return Promise.all(requests);
  };

  const getMixCoverArt = (): void => {
    makeAxiosMixCoverArtRequests().then((results) => {
      setNewMixWithCoverArt({ ...results[0] });
      updateProgressTracker("fetchedMixCoverArt");
    });
  };

  const confirmMixcloudUpload = (): void => {
    updateProgressTracker("uploadedToMixcloud");
  };

  const confirmChecked = (): void => {
    updateProgressTracker("eyeballed");
  };

  const writeToMixesJson = (): void => {
    // console.log("Writing to mixes.json");
    updateProgressTracker("wroteToMixesJson");
  };

  return (
    <StyledCoverArt>
      <div>
        <select onChange={(e) => setThisMixcloudKey(e.target.value)}>
          <option value="Select">Select</option>

          {mixes.map((mix) => (
            <option
              key={mix.mixcloudKey}
              selected={mix.mixcloudKey === thisMixcloudKey}
              value={mix.mixcloudKey}
            >
              {mix.name}
            </option>
          ))}
        </select>
      </div>

      <button onClick={() => copyToClipboard("m3u")} type="button">
        1. Copy M3U to Clipboard
      </button>
      <button
        disabled={!progressTracker.copiedM3UToClipboard}
        onClick={confirmMixcloudUpload}
        type="button"
      >
        2. Upload Mix and M3U to Mixcloud
      </button>
      <button
        disabled={!progressTracker.uploadedToMixcloud}
        onClick={getMixCoverArt}
        type="button"
      >
        3. Fetch Mix Cover Art from Mixcloud
      </button>
      <button
        disabled={!progressTracker.fetchedMixCoverArt}
        onClick={getTracksCoverArt}
        type="button"
      >
        4. Fetch Tracks Cover Art from Discogs
      </button>
      <button
        disabled={!progressTracker.fetchedTracksCoverArt}
        onClick={confirmChecked}
        type="button"
      >
        5. Confirm Checked Data
      </button>
      <button
        disabled={!progressTracker.eyeballed}
        onClick={() => copyToClipboard("json")}
        type="button"
      >
        6. Copy JSON to Clipboard
      </button>
      <button
        disabled={!progressTracker.copiedJSONToClipboard}
        onClick={writeToMixesJson}
        type="button"
      >
        7. Write to mixes.json
      </button>
      <h1>{thisMix[0]?.name}</h1>

      <h2>M3U Export</h2>
      <pre key="m3u" id="m3u">
        PERFORMER &quot;Stef.FM&quot;
        <br />
        TITLE &quot;{thisMix[0]?.name}&quot;
        <br />
        FILE &quot;{thisMix[0]?.fileName}&quot; MP3
        <br />
        {thisMix[0].tracks.map(
          ({ artistName, trackName, sectionNumber, startTime }) => {
            return (
              <Fragment key={trackName}>
                &nbsp;&nbsp;TRACK {String(sectionNumber).padStart(2, "0")} AUDIO
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;PERFORMER &quot;{artistName}&quot;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;TITLE &quot;{trackName}&quot;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;INDEX 01 {hmsToMs(startTime)}
                <br />
              </Fragment>
            );
          }
        )}
      </pre>

      <h2>mixes.json Export</h2>
      <pre id="json">{JSON.stringify(newMixWithCoverArt, undefined, 2)}</pre>

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
            alt={newMixWithCoverArt.name}
            src={newMixWithCoverArt.coverArtSmall || ""}
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
                <img alt={trackName} src={coverArtSmall || ""} />
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
