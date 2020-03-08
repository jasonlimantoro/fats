import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { detect } from '@/camera/actions';
import { selectDetectedStudent, selectDetectionMessage, selectSortedDetectionJS } from '@/camera/selector';
import { take } from '@/ui/camera/actions';
import { selectActiveSessionDetailJS, selectAttendancePayload } from '@/ui/camera/selector';
import { toPercentage, wait } from 'lib/utils';
import Modal from 'components/Modal';

const VIDEO_CONSTRAINTS = {
  audio: false,
  video: {
    width: { min: 640, ideal: 1280, max: 1920 },
    height: { min: 480, ideal: 680, max: 1080 },
  },
};

const UPLOAD_WIDTH = VIDEO_CONSTRAINTS.video.width.ideal;
const UPLOAD_HEIGHT = VIDEO_CONSTRAINTS.video.height.ideal;

const COUNTDOWN = 10;
const MODAL_DELAY = 5000;
const Camera = ({
  detect,
  detections,
  student,
  take,
  attendancePayload,
  activeSessionDetail,
  detectionMessage,
}) => {
  const videoRef = React.useRef(null);
  const imageRef = React.useRef(null);
  const drawRef = React.useRef(null);
  const [showModal, setShowModal] = React.useState(false);
  const [detected, setDetected] = React.useState(null);
  const [countDown, setCountDown] = React.useState(COUNTDOWN);
  const [detectionError, setDetectionError] = React.useState('');

  // Timeout
  React.useEffect(
    () => {
      const reset = async () => {
        if (countDown === 0) {
          setDetected(false);
          setShowModal(true);
          setDetectionError(detectionMessage || 'No student is detected');
          await wait(MODAL_DELAY);
          setCountDown(COUNTDOWN);
        }
      };
      reset();
    },
    [countDown, detectionMessage],
  );
  // Decreasing timeout count
  React.useEffect(
    () => {
      const interval = setInterval(() => {
        if (detected === true || countDown === 0) return;
        setCountDown(count => count - 1);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    },
    [countDown, detected],
  );
  // take attendance when found valid student
  useDeepCompareEffect(
    () => {
      const foundStudent = !!student.username;
      setShowModal(foundStudent);
      setDetected(foundStudent);
      if (foundStudent) {
        take({
          ...attendancePayload,
          student: student.user_id,
        });
      }
    },
    [student, take, attendancePayload],
  );
  const handleVideo = stream => {
    videoRef.current.srcObject = stream;
  };

  const handleVideoError = e => {
    // eslint-disable-next-line no-console
    console.log(e);
  };

  const handleCloseModal = React.useCallback(() => {
    setShowModal(false);
  }, []);
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
      imageCanvas.toBlob(file => detect(file, attendancePayload), 'image/jpeg');
    },
    [detect, attendancePayload],
  );

  React.useEffect(
    () => {
      const detection = detections[0] || {};
      const drawBoxes = () => {
        const ctx = drawRef.current.getContext('2d');
        const drawCanvas = drawRef.current;
        ctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
        let x = detection.x * drawCanvas.width;
        const y = detection.y * drawCanvas.height;
        const width = detection.width * drawCanvas.width - x;
        const height = detection.height * drawCanvas.height - y;
        // mirrored
        x = drawCanvas.width - (x + width);
        const score = toPercentage(detection.score);
        ctx.fillText(detection.class_name + ' - ' + score + '%', x + 5, y + 20);
        ctx.strokeRect(x, y, width, height);
      };
      if (detections.length > 0 && toPercentage(detections[0].score) < 100) {
        startDetection();
      }
      drawBoxes();
    },
    [detections, startDetection, detected],
  );

  return (
    <div className="flex flex-col items-center px-8">
      <p className="text-2xl font-bold">
        Attendance for {activeSessionDetail.lab?.course}-{activeSessionDetail.lab?.index}-
        {activeSessionDetail.lab?.name}
      </p>
      <p>
        {activeSessionDetail.timetable?.start_at} - {activeSessionDetail.timetable?.end_at}
      </p>
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
      <Modal
        className="flex flex-col border-4"
        show={showModal}
        onClose={handleCloseModal}
        type={detected ? 'success' : 'error'}
        timeout={MODAL_DELAY}
      >
        <Modal.Header className="mb-4 text-center">
          <p className="font-bold text-2xl">
            {student.username ? 'Success' : 'Error while performing the recognition'}
          </p>
        </Modal.Header>
        <Modal.Body className="flex-1 flex justify-center my-4">
          {detected ? (
            <p>Welcome, {student.username}!</p>
          ) : (
            <p>{detectionError || 'Oh snap! Some image detection has some issues'}</p>
          )}
        </Modal.Body>
        <Modal.DismissButton>{({ countDown }) => `OK (dismissing in ${countDown}s...)`}</Modal.DismissButton>
      </Modal>
    </div>
  );
};

Camera.propTypes = {
  detect: PropTypes.func.isRequired,
  detections: PropTypes.array.isRequired,
  student: PropTypes.object.isRequired,
  take: PropTypes.func.isRequired,
  attendancePayload: PropTypes.object.isRequired,
  activeSessionDetail: PropTypes.object.isRequired,
  detectionMessage: PropTypes.string,
};

Camera.defaultProps = {};

const mapStateToProps = state => ({
  detections: selectSortedDetectionJS(state),
  student: selectDetectedStudent(state),
  detectionMessage: selectDetectionMessage(state),
  attendancePayload: selectAttendancePayload(state),
  activeSessionDetail: selectActiveSessionDetailJS(state),
});

const mapDispatchToProps = { detect, take };
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Camera);
