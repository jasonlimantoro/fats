import moment from 'moment';
import { DATETIME_FORMAT } from 'config/format';

const range = (start, stop, step = 1) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

const generateWeek = (start, end, oddOrEven) => {
  let weeks = [];
  if (oddOrEven === 'all') {
    weeks = range(start, end);
  } else {
    weeks = range(start, end, 2);
  }
  const RECESS_WEEK = 8;
  const addOffsetForRecessWeek = w => (w >= RECESS_WEEK ? w + 1 : w);
  return weeks.map(addOffsetForRecessWeek);
};

export const generate = timetable => {
  // monday
  const firstWeekMoment = moment(timetable.semester.first_week);
  // pivot moment
  const firstLabMoment = moment(firstWeekMoment).add(timetable.day, 'days');
  const weeks = generateWeek(timetable.start_week, timetable.end_week, timetable.week);
  const ntuweek = range(timetable.start_week, timetable.end_week, timetable.week === 'all' ? 1 : 2);
  return weeks.map((w, idx) => {
    return {
      time: moment(firstLabMoment)
        .add(w - 1, 'weeks')
        .format(DATETIME_FORMAT.DATE),
      week: ntuweek[idx],
    };
  });
};
