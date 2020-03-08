import { createSelector } from 'reselect';
import { toPercentage } from 'lib/utils';

const selectDetectionResponse = state => state.camera.get('detectionResponse');
const selectDetections = state => state.camera.getIn(['detectionResponse', 'detections']);

export const selectDetectionsJS = createSelector(
  selectDetections,
  state => state.toJS(),
);

export const selectSortedDetectionJS = createSelector(
  selectDetectionsJS,
  detections => detections.sort((a, b) => a.score > b.score),
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
    if (score !== 100) return {};
    return student;
  },
);

export const selectDetectionMessage = createSelector(
  selectDetectionResponseJS,
  ({ message }) => message,
);
