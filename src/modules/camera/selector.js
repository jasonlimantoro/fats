import { createSelector } from 'reselect';
import { orderByProperty, toPercentage } from 'lib/utils';
import { config } from 'routes/Camera/config';

const selectDetectionResponse = state => state.camera.get('detectionResponse');
const selectDetections = state => state.camera.getIn(['detectionResponse', 'detections']);

export const selectDetectionsJS = createSelector(
  selectDetections,
  state => state.toJS(),
);

export const selectSortedDetectionJS = createSelector(
  selectDetectionsJS,
  detections => {
    const orderByScore = orderByProperty('score', 'descending');
    return detections.sort(orderByScore);
  },
);

const selectDetectionResponseJS = createSelector(
  selectDetectionResponse,
  state => state.toJS(),
);

export const selectDetectedStudent = createSelector(
  selectDetectionResponseJS,
  ({ student, detections }) => {
    if (!detections[0]) return {};
    const score = toPercentage(detections[0].score);
    if (score <= config.ACCURACY_THRESHOLD) return {};
    return student;
  },
);

export const selectDetectionMessage = createSelector(
  selectDetectionResponseJS,
  ({ message }) => message,
);
