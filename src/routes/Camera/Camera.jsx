import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { detect } from '@/camera/actions';
import { selectDetectionsJS, selectDetectedStudent } from '@/camera/selector';
import { toPercentage } from 'lib/utils';

const VIDEO_CONSTRAINTS = {
  audio: false,
  video: {
    width: { min: 640, ideal: 1280, max: 1920 },
    height: { min: 480, ideal: 680, max: 1080 },
  },
};

const UPLOAD_WIDTH = VIDEO_CONSTRAINTS.video.width.ideal;
const UPLOAD_HEIGHT = VIDEO_CONSTRAINTS.video.height.ideal;

const Camera = ({ detect, detections, student }) => {
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
          const score = toPercentage(detection.score);
          ctx.fillText(detection.class_name + ' - ' + score + '%', x + 5, y + 20);
          ctx.strokeRect(x, y, width, height);
        });
      };
      if (!student || (detections.length > 0 && toPercentage(detections[0].score) < 100)) {
        startDetection();
      }
      drawBoxes();
    },
    [detections, startDetection, student],
  );

  return (
    <div className="flex flex-col items-center px-8">
      {student.username ? (
        <div className="w-full py-4 px-3 my-4 border border-gray-600 rounded bg-green-500 text-white text-center text-2xl">
          Welcome {student.username}!!!
        </div>
      ) : (
        <div className="w-full py-4 px-3 my-4 border border-gray-600 rounded bg-gray-600 text-white text-center text-2xl">
          Please stand in front of the camera
        </div>
      )}
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
  student: PropTypes.object.isRequired,
};

Camera.defaultProps = {};

const mapStateToProps = state => ({
  detections: selectDetectionsJS(state),
  student: selectDetectedStudent(state),
});

const mapDispatchToProps = { detect };
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Camera);
