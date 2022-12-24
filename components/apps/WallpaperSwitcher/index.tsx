import StyledWallpaperSwitcher from "components/apps/WallpaperSwitcher/StyledWallpaperSwitcher";
import { useSession } from "contexts/session";
import { useRef, useState } from "react";

const WallpaperSwitcher = (): JSX.Element => {
  const { setWallpaper, wallpaperImage } = useSession();
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
      label: "Astronomy Picture of the Day",
      preview: "System/WallpaperPreviews/win95.jpg",
      value: "APOD",
    },
    {
      label: "Coastal Landscape",
      preview: "System/WallpaperPreviews/win98.jpg",
      value: "COSTAL_LANDSCAPE",
    },
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
    {
      label: "Vanta Waves",
      preview: "System/WallpaperPreviews/win95.jpg",
      value: "VANTAWAVES",
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
      </div>
    </StyledWallpaperSwitcher>
  );
};

export default WallpaperSwitcher;
