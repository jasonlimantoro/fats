export const config = {
  VIDEO_CONSTRAINTS: {
    audio: false,
    video: {
      width: { min: 640, ideal: 1280, max: 1920 },
      height: { min: 480, ideal: 680, max: 1080 },
    },
  },
  COUNTDOWN: 15,
  MODAL_DELAY: 5000,
  ACCURACY_THRESHOLD: 90,
  ATTENDANCE_TAKING_DEBOUNCE_DELAY: 10000,
  OBJECT_DETECTION_INTERVAL: 2000,
};
