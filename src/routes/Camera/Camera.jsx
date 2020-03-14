import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { detect, resetDetection } from '@/camera/actions';
import { selectDetectedStudent, selectDetectionMessage, selectSortedDetectionJS } from '@/camera/selector';
import { take, resetAttendanceTakingStatus } from '@/ui/camera/actions';
import {
  selectActiveSessionDetailJS,
  selectAttendancePayload,
  selectIsAttendanceTaken,
  selectTakeAttendanceError,
} from '@/ui/camera/selector';
import { toPercentage } from 'lib/utils';
import { debounce } from 'throttle-debounce';
import Modal from 'components/Modal';
import useCountDown from 'lib/hooks/useCountDown';
import { config } from './config';

const Camera = ({
  detect,
  detections,
  student,
  take,
  attendancePayload,
  activeSessionDetail,
  detectionMessage,
  resetDetection,
  resetAttendanceTakingStatus,
  attendanceError,
  isAttendanceTaken,
}) => {
  const videoRef = React.useRef(null);
  const imageRef = React.useRef(null);
  const drawRef = React.useRef(null);
  const [showModal, setShowModal] = React.useState(false);
  const detectionIntervalRef = React.useRef();
  const debouncedOnSuccessRef = React.useRef();

  const foundStudent = !!student.username;
  const isSuccess = isAttendanceTaken && !attendanceError && student.username;
  const shouldTakeAttendance =
    detections.length > 0 && toPercentage(detections[0].score) >= config.ACCURACY_THRESHOLD;

  const handleFinish = React.useCallback(
    () => {
      resetAttendanceTakingStatus();
      setShowModal(true);
    },
    [resetAttendanceTakingStatus],
  );
  const cameraCountDown = useCountDown({
    start: config.COUNTDOWN,
    onFinish: handleFinish,
    shouldReset: foundStudent,
    resetOnFinish: true,
  });
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
        config.VIDEO_CONSTRAINTS.video.width.ideal,
        config.VIDEO_CONSTRAINTS.video.height.ideal,
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
      if (!showModal) {
        const intervalId = setInterval(() => {
          startDetection();
          drawBoxes();
        }, config.OBJECT_DETECTION_INTERVAL);
        detectionIntervalRef.current = intervalId;
      } else {
        clearInterval(detectionIntervalRef.current);
      }
      return () => {
        clearInterval(detectionIntervalRef.current);
      };
    },
    [detections, startDetection, showModal],
  );
  useDeepCompareEffect(
    () => {
      if (shouldTakeAttendance && foundStudent) {
        const onSuccess = debounce(config.ATTENDANCE_TAKING_DEBOUNCE_DELAY, false, () => {
          cameraCountDown.resetTimer();
          if (confirm(`Taking attendance for ${student.username}?`)) {
            take({
              ...attendancePayload,
              student: student.user_id,
            });
            setShowModal(true);
          } else {
            resetDetection();
          }
          if (detectionMessage) {
            setShowModal(true);
          }
        });
        debouncedOnSuccessRef.current = onSuccess;
      } else {
        debouncedOnSuccessRef.current?.cancel();
        debouncedOnSuccessRef.current = null;
      }
      debouncedOnSuccessRef.current?.();
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
      .getUserMedia(config.VIDEO_CONSTRAINTS)
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
            width={config.VIDEO_CONSTRAINTS.video.width.ideal}
            height={config.VIDEO_CONSTRAINTS.video.height.ideal}
          />
          <canvas
            ref={imageRef}
            width={config.VIDEO_CONSTRAINTS.video.width.ideal}
            height={config.VIDEO_CONSTRAINTS.video.height.ideal}
          />
        </div>
      </div>
      <Modal
        className="flex flex-col border-4"
        show={showModal}
        onClose={handleCloseModal}
        type={isSuccess ? 'success' : 'error'}
        timeout={config.MODAL_DELAY}
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
      Timeout: {cameraCountDown.timer}
    </div>
  );
};

Camera.propTypes = {
  detect: PropTypes.func.isRequired,
  detections: PropTypes.array.isRequired,
  student: PropTypes.object.isRequired,
  take: PropTypes.func.isRequired,
  resetAttendanceTakingStatus: PropTypes.func.isRequired,
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

const mapDispatchToProps = { detect, take, resetDetection, resetAttendanceTakingStatus };
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Camera);
