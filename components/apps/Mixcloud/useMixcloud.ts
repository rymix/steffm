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
};

export default useMixcloud;
