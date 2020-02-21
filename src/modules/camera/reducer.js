import { fromJS } from 'immutable';
import { actionTypes } from './constant';

const initialState = fromJS({
  /**
   * Detection = {
   *   x: {float}
   *   y: {float}
   *   width: {float}
   *   height: {float}
   *   class_name: {String}
   * }
   *
   * detectionResponse = {
   *   meta: {Object}
   *   detections: [Detection],
   * }
   */
  detectionResponse: {
    detections: [],
  },
  detectionLoading: false,
  detectionError: {},
  detectionLoaded: false,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.DETECT_BEGIN:
      return state.set('detectionLoading', true);
    case actionTypes.DETECT_SUCCESS:
      return state
        .set('detectionLoading', false)
        .set('detectionResponse', fromJS(action.payload))
        .set('detectionError', initialState.get('detectionError'));
    case actionTypes.DETECT_FAILURE:
      return state
        .set('detectionLoading', false)
        .set('detectionResponse', initialState.get('detectionResponse'))
        .set('detectionError', fromJS(action.payload));
    default:
      return state;
  }
}
