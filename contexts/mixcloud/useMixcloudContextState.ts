/* eslint-disable no-console */
import { useEffect, useState } from "react";

export type ContextFactoryOptionalProps = {
  containerRef?: React.MutableRefObject<HTMLDivElement | null>;
  id?: string;
  loading?: boolean;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  url?: string;
};

export type MixcloudContextState = ContextFactoryOptionalProps & {
  ready: boolean;
  setReady: React.Dispatch<React.SetStateAction<boolean>>;
};

const useMixcloudContextState = (
  id: string,
  url: string,
  containerRef: React.MutableRefObject<HTMLDivElement | null>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  loading: boolean
): MixcloudContextState => {
  console.log("id", id);
  console.log("url", url);
  console.log("containerRef", containerRef);
  console.log("setLoading", setLoading);
  console.log("loading", loading);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    console.log("farts");
    setReady(true);
  }, []);

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
