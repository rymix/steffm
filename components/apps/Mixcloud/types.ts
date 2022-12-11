export type Track = {
  artistName: string;
  coverArtDate?: string | null;
  coverArtLarge?: string | null;
  coverArtSmall?: string | null;
  publisher: string;
  remixArtistName?: string;
  sectionNumber: number;
  startTime: string;
  trackName: string;
};

export type Mix = {
  category: string;
  coverArtDate?: string | null;
  coverArtLarge?: string | null;
  coverArtSmall?: string | null;
  duration: string;
  fileName?: string;
  listOrder: number;
  mixcloudKey: string;
  name: string;
  notes?: string;
  releaseDate: string;
  shortName: string;
  tracks: Track[];
};
