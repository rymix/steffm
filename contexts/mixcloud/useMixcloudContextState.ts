/* eslint-disable no-console */
import { useProcesses } from "contexts/process";
import { useCallback, useEffect, useRef, useState } from "react";
import { loadFiles } from "utils/functions";

export type ContextFactoryOptionalProps = {
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
  id: string;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  url: string;
};

export type MixcloudContextState = ContextFactoryOptionalProps & {
  ready?: boolean;
  setReady?: React.Dispatch<React.SetStateAction<boolean>>;
};

const useMixcloudContextState = (): MixcloudContextState => {
  // console.log("id", id);
  // console.log("url", url);
  // console.log("containerRef", containerRef);
  // console.log("setLoading", setLoading);
  // console.log("loading", loading);

  const id = "Mixcloud";
  const url = "farts";
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);
  const {
    processes: { [id]: { closing = false, libs = [] } = {} },
  } = useProcesses();
  const [mixcloudPlayer, setMixcloudPlayer] = useState(false);
  const loadMixcloudPlayer = useCallback(() => {
    setMixcloudPlayer(true);
    setLoading(false);
  }, [setLoading]);

  useEffect(() => {
    if (loading && !mixcloudPlayer) {
      loadFiles(libs).then(() => {
        loadMixcloudPlayer();
      });
    }

    return () => {
      if (closing) {
        console.log("Gonna close", id);
      }
    };
  }, [closing, id, libs, loadMixcloudPlayer, loading, mixcloudPlayer]);

  return {
    containerRef,
    id,
    loading,
    ready,
    setLoading,
    setReady,
    url,
  };
};

export default useMixcloudContextState;
