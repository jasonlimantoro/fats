import { createSelector } from 'reselect';

const selectDetections = state => state.camera.getIn(['detectionResponse', 'detections']);

export const selectDetectionsJS = createSelector(
  selectDetections,
  state => state.toJS(),
);
