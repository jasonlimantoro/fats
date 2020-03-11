import { List } from 'immutable';
import UIFx from 'uifx';
import moment from 'moment';
import cls from 'classnames';
import { defaultTypes } from 'config/styles';
import { generate } from './timetableGenerator';

export const noop = () => {};
export const identity = x => x;
export const tryCatch = async (fn, { successFn = noop, errorFn = noop } = {}) => {
  try {
    const res = await fn();
    return successFn(res);
  } catch (e) {
    return errorFn(e);
  }
};

export const executeIf = (yes, ifNo) => fn => {
  if (yes) {
    return fn();
  }
  return ifNo();
};

export class ScopedKey {
  constructor(scope) {
    this.scope = scope;
    this.loading = `${scope}Loading`;
    this.response = `${scope}Response`;
    this.error = `${scope}Error`;
    this.loaded = `${scope}Loaded`;
  }
}

const isMergeable = a => a && typeof a === 'object' && typeof a.mergeWith === 'function' && !List.isList(a);

/**
 * Due to bug in Immutable mergeDeepIn implementation, whereby list will be strangely concatenated
 * Need to implement custom logic instead
 * Reference : https://github.com/immutable-js/immutable-js/issues/1452
 */
export const mergeDeep = (a, b) => {
  // If b is null, it would overwrite a, even if a is mergeable
  if (isMergeable(a) && b !== null) {
    return a.mergeWith(mergeDeep, b);
  }

  if (!List.isList(a) || !List.isList(b)) {
    return b;
  }

  return b.reduce((acc, nextItem, index) => {
    const existingItem = acc.get(index);
    if (isMergeable(existingItem)) {
      return acc.set(index, existingItem.mergeWith(mergeDeep, nextItem));
    }
    return acc.set(index, nextItem);
  }, a);
};

export const toPercentage = value => Math.round(value * 100);

export const calculateLabIndexCompleteSchedule = ({ timetables, labs, schedules, semesters }) => {
  return Object.values(timetables).reduce((accum, current) => {
    const generated = generate({
      ...current,
      semester: semesters[current.semester],
    });
    return {
      ...accum,
      [current.lab]: {
        completeSchedule: generated.map(({ time, week }) => {
          const lab = labs[current.lab];
          let relatedSchedule = null;
          const existingSession = lab.schedule_set.some(existingScheduleId => {
            const schedule = schedules[existingScheduleId];
            if (!schedule) return false;
            const diff = moment(schedules[existingScheduleId].time).diff(moment(time), 'days');
            const oneDay = diff >= 0 && diff <= 1;
            if (oneDay) {
              relatedSchedule = existingScheduleId;
            }
            return oneDay;
          });
          return {
            week,
            label: time,
            past: existingSession,
            relatedSchedule,
          };
        }),
      },
    };
  }, {});
};

export const wait = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

export const orderByProperty = (property, method = 'ascending') => (a, b) => {
  if (a[property] < b[property]) {
    return method === 'ascending' ? -1 : 1;
  }
  if (a[property] > b[property]) {
    return method === 'ascending' ? 1 : -1;
  }
  return 0;
};

export const getTypeStyle = (type, types = defaultTypes, properties = ['text', 'border', 'main']) => {
  const typeStyle = types[type];
  return properties.reduce((accum, current) => cls(accum, typeStyle[current]), '');
};

export const createArrayToChoiceMapper = ({
  valueTransform = identity,
  labelTransform = identity,
} = {}) => el => ({
  value: valueTransform(el),
  label: labelTransform(el),
});

export const createActionTypes = (actionLists, namespace) =>
  actionLists.reduce(
    (actions, a) => ({
      ...actions,
      [a]: `${namespace}/${a}`,
    }),
    {},
  );
export const createAudio = (src, volume) => {
  const audio = new UIFx(src);
  audio.setVolume(volume);
  const play = volume => {
    audio.play(volume);
  };
  return { audio, play };
};
