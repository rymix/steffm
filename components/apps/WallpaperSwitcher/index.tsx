/* eslint-disable sonarjs/no-duplicate-string */
import StyledWallpaperSwitcher from "components/apps/WallpaperSwitcher/StyledWallpaperSwitcher";
import { useSession } from "contexts/session";
import { useRef, useState } from "react";

const destroyAllWallpapers = (): void => {
  delete window.Apod;
  delete window.Matrix;
  delete window.Tartan;
  delete window.Apod;
  delete window.Apod;
};

const WallpaperSwitcher = (): JSX.Element => {
  const { setWallpaper } = useSession();
  const previewRef = useRef<HTMLImageElement>(null);
  const [previewValue, setPreviewValue] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  type Wallpaper = {
    label: string;
    preview: string;
    value: string;
  };

  const wallpapers: Wallpaper[] = [
    {
      label: "Matrix (2D)",
      preview: "System/WallpaperPreviews/win95.jpg",
      value: "MATRIX 2D",
    },
    {
      label: "Matrix (3D)",
      preview: "System/WallpaperPreviews/win98.jpg",
      value: "MATRIX 3D",
    },
    {
      label: "Tartan",
      preview: "System/WallpaperPreviews/win95.jpg",
      value: "TARTAN",
    },
    {
      label: "Vanta Clouds (Day)",
      preview: "System/WallpaperPreviews/win98.jpg",
      value: "VANTACLOUDSDAY",
    },
    {
      label: "Vanta Clouds (Night)",
      preview: "System/WallpaperPreviews/win95.jpg",
      value: "VANTACLOUDSNIGHT",
    },
    {
      label: "Vanta Clouds (Day/Night Cycle)",
      preview: "System/WallpaperPreviews/win98.jpg",
      value: "VANTACLOUDSCYCLE",
    },
  ];

  const handleOptionChange = (value: string): void => {
    setPreviewValue(value);
    const wallpaper = wallpapers.find(
      (wallpaperItem) => wallpaperItem.value === value
    );
    const preview = wallpaper?.preview ?? "";
    setPreviewImage(preview);
  };

  return (
    <StyledWallpaperSwitcher>
      <div>
        <img ref={previewRef} alt="Preview" src={previewImage} />
      </div>
      <div>
        <select onChange={(e) => handleOptionChange(e.target.value)} size={10}>
          {wallpapers.map((wallpapersItem) => (
            <option
              key={wallpapersItem.label}
              selected={wallpapersItem.label === previewValue}
              value={wallpapersItem.value}
            >
              {wallpapersItem.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button onClick={() => setWallpaper(previewValue)} type="button">
          OK
        </button>
        <button type="button">Cancel</button>
        <button onClick={destroyAllWallpapers} type="button">
          Destroy
        </button>
      </div>
    </StyledWallpaperSwitcher>
  );
};

export default WallpaperSwitcher;
