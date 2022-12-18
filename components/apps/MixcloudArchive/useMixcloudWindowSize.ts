import playerDimensions from "components/apps/MixcloudArchive/config";
import useWindowSize from "components/system/Window/useWindowSize";
import { useEffect } from "react";

const useMixcloudWindowSize = (id: string): void => {
  const { updateWindowSize } = useWindowSize(id);

  useEffect(() => {
    updateWindowSize(
      playerDimensions.large.height,
      playerDimensions.large.width
    );
  }, [updateWindowSize]);
};

export default useMixcloudWindowSize;
