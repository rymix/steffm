type DurationProps = {
  seconds: number;
};

const pad = (string: string): string => {
  return `0${string}`.slice(-2);
};

const format = (seconds: number): string => {
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = pad(date.getUTCSeconds().toString()).toString();
  if (hh) {
    return `${hh}:${pad(mm.toString())}:${ss}`;
  }
  return `${mm}:${ss}`;
};

export default function Duration({ seconds }: DurationProps): JSX.Element {
  return <time dateTime={`P${Math.round(seconds)}S`}>{format(seconds)}</time>;
}
