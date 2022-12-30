import StyledMixImage from "components/apps/Mixcloud/MixImage/StyledMixImage";
import { useState } from "react";
import { MIXCLOUD_DEFAULT_CARD_IMAGE } from "utils/constants";

type MixImageProps = {
  alt: string;
  src: string;
};

const MixImage: FC<MixImageProps> = ({ alt, src }): JSX.Element => {
  const [dynamicSrc, setDynamicSrc] = useState(src);
  const handleImageOnError = () => {
    setDynamicSrc(MIXCLOUD_DEFAULT_CARD_IMAGE);
  };

  return (
    <StyledMixImage
      alt={alt}
      onError={handleImageOnError}
      src={dynamicSrc || MIXCLOUD_DEFAULT_CARD_IMAGE}
    />
  );
};

export default MixImage;
