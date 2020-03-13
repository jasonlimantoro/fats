import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { detect, resetDetection } from '@/camera/actions';
import { selectDetectedStudent, selectDetectionMessage, selectSortedDetectionJS } from '@/camera/selector';
import { take } from '@/ui/camera/actions';
import {
  selectActiveSessionDetailJS,
  selectAttendancePayload,
  selectIsAttendanceTaken,
  selectTakeAttendanceError,
} from '@/ui/camera/selector';
import { toPercentage } from 'lib/utils';
import { debounce } from 'throttle-debounce';
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

const COUNTDOWN = 30;
const MODAL_DELAY = 5000;
const ACCURACY_THRESHOLD = 90;
const ATTENDANCE_TAKING_DEBOUNCE_DELAY = 15000;
const OBJECT_DETECTION_INTERVAL = 2000;

const Camera = ({
  detect,
  detections,
  student,
  take,
  attendancePayload,
  activeSessionDetail,
  detectionMessage,
  resetDetection,
  attendanceError,
  isAttendanceTaken,
}) => {
  const videoRef = React.useRef(null);
  const imageRef = React.useRef(null);
  const drawRef = React.useRef(null);
  const [showModal, setShowModal] = React.useState(false);
  const [countDown, setCountDown] = React.useState(COUNTDOWN);

  const foundStudent = !!student.username;
  const isSuccess = isAttendanceTaken && !attendanceError && student.username;
  const shouldTakeAttendance =
    detections.length > 0 && toPercentage(detections[0].score) >= ACCURACY_THRESHOLD;

  React.useEffect(
    () => {
      const interval = setInterval(() => {
        if (countDown === 0) {
          setCountDown(COUNTDOWN);
          setShowModal(true);
          return;
        }
        if (foundStudent) {
          setCountDown(COUNTDOWN);
        } else {
          setCountDown(count => count - 1);
        }
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    },
    [countDown, foundStudent],
  );
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
      imageCanvas.toBlob(file => detect(file, attendancePayload.lab), 'image/jpeg');
    },
    [detect, attendancePayload.lab],
  );
  React.useEffect(
    () => {
      const detection = detections[0] || {};
      const drawBoxes = () => {
        const ctx = drawRef.current.getContext('2d');
        const drawCanvas = drawRef.current;
        ctx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
        const { x, width, y, height, class_name, score } = detection;
        const mirrored = drawCanvas.width - (x + width);
        const scorePercent = toPercentage(score);
        ctx.fillText(class_name + ' - ' + scorePercent + '%', x + 5, y + 20);
        ctx.strokeRect(mirrored, y, width, height);
      };
      const interval = setInterval(() => {
        if (showModal) return;
        startDetection();
        drawBoxes();
      }, OBJECT_DETECTION_INTERVAL);
      return () => {
        clearInterval(interval);
      };
    },
    [detections, startDetection, showModal],
  );
  useDeepCompareEffect(
    () => {
      const onSuccess = debounce(ATTENDANCE_TAKING_DEBOUNCE_DELAY, false, () => {
        if (shouldTakeAttendance && foundStudent) {
          setCountDown(COUNTDOWN);
          if (confirm(`Taking attendance for ${student.username}?`)) {
            take({
              ...attendancePayload,
              student: student.user_id,
            });
            setShowModal(true);
          }
        }
        if (detectionMessage) {
          setShowModal(true);
        }
      });
      onSuccess();
    },
    [student, take, attendancePayload, foundStudent, shouldTakeAttendance],
  );
  const handleVideo = stream => {
    videoRef.current.srcObject = stream;
  };

  const handleVideoError = e => {
    // eslint-disable-next-line no-console
    console.log(e);
  };

  const handleCloseModal = React.useCallback(
    () => {
      setShowModal(false);
      resetDetection();
    },
    [resetDetection],
  );
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
        type={isSuccess ? 'success' : 'error'}
        timeout={MODAL_DELAY}
      >
        <Modal.Header className="mb-4 text-center">
          <p className="font-bold text-2xl">
            {isSuccess ? 'Success' : 'Error while performing the recognition'}
          </p>
        </Modal.Header>
        <Modal.Body className="flex-1 flex justify-center my-4">
          {isSuccess ? (
            <p>Welcome, {student.username}!</p>
          ) : (
            <p>Error: {detectionMessage || attendanceError || 'No Student detected in the camera'}</p>
          )}
        </Modal.Body>
        <Modal.DismissButton>{({ countDown }) => `OK (dismissing in ${countDown}s...)`}</Modal.DismissButton>
      </Modal>
      Timeout: {countDown}
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
  resetDetection: PropTypes.func.isRequired,
  attendanceError: PropTypes.string,
  isAttendanceTaken: PropTypes.bool.isRequired,
};

Camera.defaultProps = {};

const mapStateToProps = () => state => ({
  detections: selectSortedDetectionJS(state),
  student: selectDetectedStudent(state),
  detectionMessage: selectDetectionMessage(state),
  attendancePayload: selectAttendancePayload(state),
  activeSessionDetail: selectActiveSessionDetailJS(state),
  attendanceError: selectTakeAttendanceError(state),
  isAttendanceTaken: selectIsAttendanceTaken(state),
});

const mapDispatchToProps = { detect, take, resetDetection };
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Camera);
