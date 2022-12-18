/* eslint-disable no-console */
import { useProcesses } from "contexts/process";
import { useCallback, useEffect, useState } from "react";
import { loadFiles } from "utils/functions";

const useMixcloud = (
  id: string,
  url: string,
  containerRef: React.MutableRefObject<HTMLDivElement | null>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  loading: boolean
): void => {
  console.log("id", id);
  console.log("url", url);
  console.log("containerRef", containerRef);
  console.log("setLoading", setLoading);
  console.log("loading", loading);

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
};

export default useMixcloud;
