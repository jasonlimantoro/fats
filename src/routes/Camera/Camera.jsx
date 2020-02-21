import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { detect } from '@/camera/actions';
import { selectDetectionsJS } from '@/camera/selector';

const VIDEO_CONSTRAINTS = {
  audio: false,
  video: {
    width: { min: 640, ideal: 1280, max: 1920 },
    height: { min: 480, ideal: 720, max: 1080 },
  },
};

const UPLOAD_WIDTH = VIDEO_CONSTRAINTS.video.width.ideal;
const UPLOAD_HEIGHT = VIDEO_CONSTRAINTS.video.height.ideal;

const Camera = ({ detect, detections }) => {
  const videoRef = React.useRef(null);
  const imageRef = React.useRef(null);
  const drawRef = React.useRef(null);

  const handleVideo = stream => {
    videoRef.current.srcObject = stream;
  };

  const handleVideoError = e => {
    // eslint-disable-next-line no-console
    console.log(e);
  };

  React.useEffect(() => {
    navigator.mediaDevices
      .getUserMedia(VIDEO_CONSTRAINTS)
      .then(handleVideo)
      .catch(handleVideoError);
    const videoDom = videoRef.current;
    return () => {
      videoDom.srcObject.getTracks().forEach(track => {
        track.stop();
      });
    };
  }, []);

  const startDetection = React.useCallback(
    () => {
      const drawCanvas = drawRef.current;
      const drawCtx = drawCanvas.getContext('2d');
      const imageCanvas = imageRef.current;
      const imageCtx = imageCanvas.getContext('2d');

      drawCtx.lineWidth = 4;
      drawCtx.strokeStyle = 'red';
      drawCtx.font = '20px Verdana';
      drawCtx.fillStyle = 'cyan';

      imageCtx.drawImage(
        videoRef.current,
        0,
        0,
        videoRef.current.videoWidth,
        videoRef.current.videoHeight,
        0,
        0,
        UPLOAD_WIDTH,
        UPLOAD_HEIGHT,
      );
      imageCanvas.toBlob(file => detect(file), 'image/jpeg');
    },
    [detect],
  );

  React.useEffect(
    () => {
      const drawBoxes = () => {
        const ctx = drawRef.current.getContext('2d');
        const drawCanvas = drawRef.current;
        ctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
        detections.forEach(detection => {
          let x = detection.x * drawCanvas.width;
          const y = detection.y * drawCanvas.height;
          const width = detection.width * drawCanvas.width - x;
          const height = detection.height * drawCanvas.height - y;
          // mirrored
          x = drawCanvas.width - (x + width);

          ctx.fillText(detection.class_name + ' - ' + Math.round(detection.score * 100) + '%', x + 5, y + 20);
          ctx.strokeRect(x, y, width, height);
        });
      };

      startDetection();
      drawBoxes();
    },
    [detections, startDetection],
  );

  return (
    <div>
      Camera
      <div className="flex justify-center">
        <div className="relative">
          <video
            onLoadedMetadata={startDetection}
            onPlaying={startDetection}
            className="absolute hflip"
            ref={videoRef}
            autoPlay
          >
            <track kind="captions" />
          </video>
          <canvas
            ref={drawRef}
            className="absolute"
            width={VIDEO_CONSTRAINTS.video.width.ideal}
            height={VIDEO_CONSTRAINTS.video.height.ideal}
          />
          <canvas
            ref={imageRef}
            width={VIDEO_CONSTRAINTS.video.width.ideal}
            height={VIDEO_CONSTRAINTS.video.height.ideal}
          />
        </div>
      </div>
    </div>
  );
};

Camera.propTypes = {
  detect: PropTypes.func.isRequired,
  detections: PropTypes.array.isRequired,
};

Camera.defaultProps = {};

const mapStateToProps = state => ({
  detections: selectDetectionsJS(state),
});

const mapDispatchToProps = { detect };
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Camera);
