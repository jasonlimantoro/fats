import { createSelector } from 'reselect';
import { toPercentage } from 'lib/utils';

const selectDetectionResponse = state => state.camera.get('detectionResponse');
const selectDetections = state => state.camera.getIn(['detectionResponse', 'detections']);

export const selectDetectionsJS = createSelector(
  selectDetections,
  state => state.toJS(),
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
