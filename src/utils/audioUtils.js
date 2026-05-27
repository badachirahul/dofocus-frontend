export const playAlarm = (audio) => {
  if (!audio) return;

  audio.loop = true;
  audio.play();
};

export const stopAlarm = (audio) => {
  if (!audio) return;

  audio.pause();
  audio.currentTime = 0;
};