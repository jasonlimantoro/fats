import moment from 'moment';

const generateWeek = (start, end, oddOrEven) => {
  const finalArr = [];
  let i = start;
  while (i <= end + 1) {
    if (i === 8) {
      i++;
      continue;
    }
    if (i === 7) {
      finalArr.push(i);
      if (oddOrEven === 'all') {
        i += 2;
      } else {
        i += 3;
      }
      continue;
    }
    finalArr.push(i);
    if (oddOrEven === 'all') {
      i++;
    } else {
      i += 2;
    }
    if (i > end && oddOrEven === 'all') {
      break;
    }
  }
  return finalArr;
};

export const generate = timetable => {
  // monday
  const firstWeekMoment = moment(timetable.semester.first_week);
  // pivot moment
  const firstLabMoment = moment(firstWeekMoment).add(timetable.day, 'days');
  const weeks = generateWeek(timetable.start_week, timetable.end_week, timetable.week);
  return weeks.map(w =>
    moment(firstLabMoment)
      .add(w - 1, 'weeks')
      .format('YYYY-MM-DD'),
  );
};
