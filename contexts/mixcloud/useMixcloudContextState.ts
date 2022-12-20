/* eslint-disable no-console */
import { useProcesses } from "contexts/process";
import { useCallback, useEffect, useRef, useState } from "react";
import { loadFiles } from "utils/functions";

export type MixcloudContextState = {
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
  idControls: string;
  idPlayer: string;
  loading: boolean;
  ready?: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setReady?: React.Dispatch<React.SetStateAction<boolean>>;
};

const useMixcloudContextState = (): MixcloudContextState => {
  const containerRef = useRef<HTMLDivElement>(null);
  const idControls = "MixcloudControls"; // Hard coded this as I can't work out how to pass it as a parameter
  const idPlayer = "Mixcloud";
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const {
    processes: {
      [idPlayer]: { closing: closingPlayer = false, libs = [] } = {},
    },
  } = useProcesses();
  const [mixcloudPlayer, setMixcloudPlayer] = useState(false);
  const loadMixcloudPlayer = useCallback(() => {
    setMixcloudPlayer(true);
    if (ready) {
      setLoading(false);
    }
  }, [ready, setLoading]);

  useEffect(() => {
    if (loading && !mixcloudPlayer) {
      loadFiles(libs).then(() => {
        loadMixcloudPlayer();
      });
    }

    return () => {
      if (closingPlayer) {
        console.log("Gonna close", idPlayer);
      }
    };
  }, [closingPlayer, libs, loadMixcloudPlayer, loading, mixcloudPlayer]);

  return {
    containerRef,
    idControls,
    idPlayer,
    loading,
    ready,
    setLoading,
    setReady,
  };
};

export default useMixcloudContextState;
