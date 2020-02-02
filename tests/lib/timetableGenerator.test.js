import { generate } from 'lib/timetableGenerator';

describe('Timetable Generator', () => {
  it('should generate the weekly schedule for odd week', () => {
    const timetable = {
      id: 1,
      /**
       * Number representation of day of the week
       * The week starts on Monday, i.e. 0 => Monday, 1 => Tuesday, 2 => Wednesday etc.
       */
      day: 2,
      start_at: '11:30:00',
      end_at: '13:30:00',
      week: 'odd',
      lab: '10223',
      start_week: 3,
      end_week: 13,
      semester: {
        id: 1,
        number: 2,
        first_week: '2020-01-13',
        year_start: 2019,
      },
    };
    const actual = generate(timetable);
    // odd week from week 3 - week 11, skipping the eighth week (recess week)
    const expected = ['2020-01-29', '2020-02-12', '2020-02-26', '2020-03-18', '2020-04-01', '2020-04-15'];
    expect(actual).toEqual(expected);
  });

  it('should generate the weekly schedule for even week', () => {
    const timetable = {
      id: 1,
      day: 3,
      start_at: '11:30:00',
      end_at: '13:30:00',
      week: 'even',
      lab: '10223',
      start_week: 4,
      end_week: 12,
      semester: {
        id: 1,
        number: 2,
        first_week: '2020-01-13',
        year_start: 2019,
      },
    };
    const actual = generate(timetable);
    const expected = ['2020-02-06', '2020-02-20', '2020-03-12', '2020-03-26', '2020-04-09'];
    expect(actual).toEqual(expected);
  });
});
