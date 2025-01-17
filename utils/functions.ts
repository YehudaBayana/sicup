export const disableScroll = () => {
  document.body.style.overflow = "hidden";
};

export const enableScroll = () => {
  document.body.style.overflow = "auto";
};

export function msToMinutesAndSeconds(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ":" + (Number(seconds) < 10 ? "0" : "") + seconds;
}
