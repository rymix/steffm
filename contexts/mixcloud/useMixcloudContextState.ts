/* eslint-disable react-hooks/exhaustive-deps */
import type { Mix } from "components/apps/MixcloudArchive/types";
import { useFileSystem } from "contexts/fileSystem";
import { unzip } from "fflate";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import type ReactPlayer from "react-player";
import { MIXCLOUD_MIXES_FILE_LOCATION } from "utils/constants";

export type MixcloudProgress = {
  loaded: number;
  loadedSeconds: number;
  played: number;
  playedSeconds: number;
};

export type ProgressLog = {
  mixcloudKey: string;
  played: number;
};

export type MixcloudContextState = {
  currentTrackDiv: HTMLDivElement | undefined;
  duration: number;
  getMixByMixcloudKey: (lookupMixcloudKey: string) => Mix[];
  getMixesBySearchTerm: (searchTerm: string) => Mix[];
  getTracksBySearchTerm: (searchTerm: string) => Mix[];
  handleDuration: (newDuration: number) => void;
  handlePlayPauseToggle: () => void;
  handleProgress: (newProgress: MixcloudProgress) => void;
  handleVolumeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleVolumeMouseDown: () => void;
  handleVolumeMouseUp: (
    _event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => void;
  loadedProgress: boolean;
  loop: boolean;
  mixcloudKey: string;
  mixcloudRef: React.RefObject<ReactPlayer> | undefined;
  mixes: Mix[];
  played: number;
  playing: boolean;
  populateProgressLogFromFile: () => void;
  progressLog: ProgressLog[];
  ready: boolean;
  seekTo: (jumpPoint: number) => void;
  seeking: boolean;
  setCurrentTrackDiv: React.Dispatch<
    React.SetStateAction<HTMLDivElement | undefined>
  >;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  setLoadedProgress: React.Dispatch<React.SetStateAction<boolean>>;
  setLoop: React.Dispatch<React.SetStateAction<boolean>>;
  setMixcloudKey: React.Dispatch<React.SetStateAction<string>>;
  setMixcloudRef: React.Dispatch<React.RefObject<ReactPlayer> | undefined>;
  setMixes: React.Dispatch<React.SetStateAction<Mix[]>>;
  setPlayed: React.Dispatch<React.SetStateAction<number>>;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setProgressLog: React.Dispatch<React.SetStateAction<ProgressLog[]>>;
  setRandomUnplayedMix: (category?: string) => void;
  setReady: React.Dispatch<React.SetStateAction<boolean>>;
  setSeeking: React.Dispatch<React.SetStateAction<boolean>>;
  setVolumeChange: React.Dispatch<React.SetStateAction<boolean>>;
  volume: number;
  volumeChange: boolean;
};

const MIXCLOUD_PROGRESS_FILE = "/mixcloud.json";

const useMixcloudContextState = (): MixcloudContextState => {
  const { fs } = useFileSystem();
  const [currentTrackDiv, setCurrentTrackDiv] = useState<
    HTMLDivElement | undefined
  >();
  const [duration, setDuration] = useState(0);
  const [loadedProgress, setLoadedProgress] = useState(false);
  const [loop, setLoop] = useState(false);
  const [mixcloudKey, setMixcloudKey] = useState("");
  const [mixcloudRef, setMixcloudRef] =
    useState<React.RefObject<ReactPlayer>>();
  const [mixes, setMixes] = useState<Mix[]>([]);
  const [played, setPlayed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progressLog, setProgressLog] = useState<ProgressLog[]>([]);
  const [seeking, setSeeking] = useState(false);
  const [ready, setReady] = useState(false);
  const [volume, setVolume] = useState(1);
  const [volumeChange, setVolumeChange] = useState(false);

  const loadMixesFromFile = (): void => {
    fs?.readFile(
      MIXCLOUD_MIXES_FILE_LOCATION,
      (_errorReadFile, contents = Buffer.from("")) => {
        return unzip(contents, (_errorUnzip, unzipped) => {
          const jsonString = Buffer.from(unzipped["mixes.json"]).toString(
            "utf8"
          );
          let parsedData = JSON.parse(jsonString) as Mix[];
          parsedData = parsedData.sort((a, b) =>
            a.name > b.name ? 1 : b.name > a.name ? -1 : 0
          );
          setMixes(parsedData);
        });
      }
    );
  };

  const getMixByMixcloudKey = (lookupMixcloudKey: string): Mix[] =>
    mixes.filter((mix) => mix.mixcloudKey === lookupMixcloudKey);

  const getMixesBySearchTerm = (searchTerm: string): Mix[] =>
    mixes.filter((mix) => mix.name.includes(searchTerm));

  const getTracksBySearchTerm = (searchTerm: string): Mix[] =>
    mixes.filter((mix) => mix.name.includes(searchTerm));

  const getRandomUnplayedMixcloudKey = (): string => {
    const progressLogArray = progressLog.map((a) => a.mixcloudKey);
    const progressLogSet = new Set(progressLogArray);
    const filteredMixes = mixes.filter(
      (mix) => !progressLogSet.has(mix.mixcloudKey)
    );
    return filteredMixes[Math.floor(Math.random() * filteredMixes.length)]
      .mixcloudKey;
  };

  const getRandomUnplayedMixcloudKeyByCategory = (category: string): string => {
    const progressLogArray = progressLog.map((a) => a.mixcloudKey);
    const progressLogSet = new Set(progressLogArray);
    const filteredMixes = mixes
      .filter((mix) => mix.category === category)
      .filter((mix) => !progressLogSet.has(mix.mixcloudKey));
    return filteredMixes[Math.floor(Math.random() * filteredMixes.length)]
      .mixcloudKey;
  };

  const setRandomUnplayedMix = (category?: string): void => {
    if (category) {
      setMixcloudKey(getRandomUnplayedMixcloudKeyByCategory("aidm"));
    } else {
      setMixcloudKey(getRandomUnplayedMixcloudKey());
    }
  };

  const populateProgressLogFromFile = (): void => {
    fs?.readFile(MIXCLOUD_PROGRESS_FILE, (_error, contents) => {
      if (contents) {
        const fsContents = JSON.parse(
          contents.toString() || "{}"
        ) as ProgressLog[];
        setProgressLog(fsContents);
      }
    });
  };

  // Init Mixes
  useMemo(() => {
    loadMixesFromFile();
    populateProgressLogFromFile();
  }, [fs]);

  // Init current mixcloudKey
  useEffect(() => {
    if (mixes.length > 0 && !mixcloudKey) {
      setMixcloudKey(getRandomUnplayedMixcloudKey());
    }
  }, [mixcloudKey, mixes]);

  // Select initial random unplayed Mix
  useEffect(() => {
    if (mixes && mixes.length > 0 && !mixcloudKey) {
      setRandomUnplayedMix();
    }
  }, [mixes]);

  // Update things when mixcloudKey changes
  useEffect(() => {
    setSeeking(false);
    setDuration(0);
    setLoadedProgress(false);
    populateProgressLogFromFile();
    // eslint-disable-next-line unicorn/no-useless-undefined
    setCurrentTrackDiv(undefined);
    setPlayed(0);
    setSeeking(true);
  }, [mixcloudKey]);

  useEffect(() => {
    if (ready && playing && seeking) {
      // const match = progressLog.find(
      //   (item) => item.mixcloudKey === mixcloudKey
      // );
      setTimeout(() => {
        // mixcloudRef?.current?.seekTo(Number(match?.played));
        setLoadedProgress(true);
        setSeeking(false);
      }, 600);
    }
  }, [playing, ready, seeking]);

  // Save progress only if the progress loader routine has completed
  useEffect(() => {
    if (ready && playing && loadedProgress) {
      // const upsertProgressLog = (
      //   latestProgressItem: ProgressLog
      // ): ProgressLog[] => {
      //   let workingProgressLog = progressLog.length > 0 ? [...progressLog] : [];
      //   const found = workingProgressLog.find(
      //     (item) => item.mixcloudKey === latestProgressItem.mixcloudKey
      //   );

      //   workingProgressLog = found
      //     ? workingProgressLog.map((item) => {
      //         return item.mixcloudKey === latestProgressItem.mixcloudKey
      //           ? { ...item, played: latestProgressItem.played }
      //           : item;
      //       })
      //     : [...workingProgressLog, latestProgressItem];

      //   return workingProgressLog;
      // };

      const upsertIfGreaterProgressLog = (
        latestProgressItem: ProgressLog
      ): ProgressLog[] => {
        let workingProgressLog = progressLog.length > 0 ? [...progressLog] : [];
        const found = workingProgressLog.find(
          (item) => item.mixcloudKey === latestProgressItem.mixcloudKey
        );

        workingProgressLog = found
          ? workingProgressLog.map((item) => {
              return item.mixcloudKey === latestProgressItem.mixcloudKey &&
                item.played < latestProgressItem.played
                ? { ...item, played: latestProgressItem.played }
                : item;
            })
          : [...workingProgressLog, latestProgressItem];

        return workingProgressLog;
      };

      const progressLogItem: ProgressLog = {
        mixcloudKey,
        played,
      };

      setProgressLog(upsertIfGreaterProgressLog(progressLogItem));
      fs?.writeFile(MIXCLOUD_PROGRESS_FILE, JSON.stringify(progressLog));
    }
  }, [loadedProgress, played]);

  const handleDuration = (newDuration: number): void =>
    setDuration(newDuration);
  const handlePlayPauseToggle = (): void => setPlaying(!playing);
  const handleProgress = (newProgress: MixcloudProgress): void => {
    if (!seeking) {
      setPlayed(newProgress.played);
    }
  };
  const handleVolumeMouseDown = (): void => setVolumeChange(true);
  const handleVolumeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => setVolume(Number(event.currentTarget.value));
  const handleVolumeMouseUp = (): void => {
    setVolumeChange(false);
    // mixcloudRef?.current?.
    // console.log("Set volume change to", volume);
  };
  const seekTo = (jumpPoint: number): void => {
    setSeeking(true);
    mixcloudRef?.current?.seekTo(jumpPoint);
    setSeeking(false);
  };

  // We have to do this as onEnded on the React Player doesn't continue playing
  useEffect(() => {
    if (played >= 0.9998) {
      setRandomUnplayedMix();
    }
  }, [played]);

  return {
    currentTrackDiv,
    duration,
    getMixByMixcloudKey,
    getMixesBySearchTerm,
    getTracksBySearchTerm,
    handleDuration,
    handlePlayPauseToggle,
    handleProgress,
    handleVolumeChange,
    handleVolumeMouseDown,
    handleVolumeMouseUp,
    loadedProgress,
    loop,
    mixcloudKey,
    mixcloudRef,
    mixes,
    played,
    playing,
    populateProgressLogFromFile,
    progressLog,
    ready,
    seekTo,
    seeking,
    setCurrentTrackDiv,
    setDuration,
    setLoadedProgress,
    setLoop,
    setMixcloudKey,
    setMixcloudRef,
    setMixes,
    setPlayed,
    setPlaying,
    setProgressLog,
    setRandomUnplayedMix,
    setReady,
    setSeeking,
    setVolumeChange,
    volume,
    volumeChange,
  };
};

export default useMixcloudContextState;
