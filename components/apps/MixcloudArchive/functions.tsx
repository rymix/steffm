export const hoursMinutesSecondsToSeconds = (hmsTime: string): number => {
  const timeChunks = hmsTime.split(":");
  let seconds = 0;
  let minutes = 1;

  while (timeChunks.length > 0) {
    seconds += minutes * Number.parseInt(timeChunks.pop() as string, 10);
    minutes *= 60;
  }

  return seconds;
};

export const mixcloudUnurlify = (mixcloudKey: string): string =>
  mixcloudKey.replace("https://www.mixcloud.com/rymixxx/", "").replace("/", "");

export const mixcloudUrlify = (mixcloudKey: string): string =>
  `https://www.mixcloud.com/rymixxx/${mixcloudKey}`;

export const startTimeToIndex = (hmsTime: string, duration: number): number =>
  hoursMinutesSecondsToSeconds(hmsTime) / duration;
