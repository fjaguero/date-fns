import localize from '../localize/index.js'
import buildMatchRegExpFromArray from '../../../_lib/buildMatchRegExpFromArray/index.js'
import buildParseFnFromArray from '../../../_lib/buildParseFnFromArray/index.js'
import parseDecimal from '../../../_lib/parseDecimal/index.js'

export default function buildParseLocale () {
  var monthsShort = localize('months', 'short')
  var monthsLong = localize('months', 'long')
  var weekdaysNarrow = localize('weekdays', 'narrow')
  var weekdaysShort = localize('weekdays', 'short')
  var weekdaysLong = localize('weekdays', 'long')
  var timesOfDayUppercase = localize('timesOfDay', 'uppercase')
  var timesOfDayLowercase = localize('timesOfDay', 'lowercase')
  var timesOfDayLong = localize('timesOfDay', 'long')

  var patternOrdinal = /^(\d+)(th|st|nd|rd)/

  return {
    // Month: Jan, Feb, ..., Dec
    'MMM': {
      unit: 'month',
      match: buildMatchRegExpFromArray(monthsShort),
      parse: buildParseFnFromArray(monthsShort)
    },

    // Month: January, February, ..., December
    'MMMM': {
      unit: 'month',
      match: buildMatchRegExpFromArray(monthsLong),
      parse: buildParseFnFromArray(monthsLong)
    },

    // Day of week: Su, Mo, ..., Sa
    'dd': {
      unit: 'day',
      match: buildMatchRegExpFromArray(weekdaysNarrow),
      parse: buildParseFnFromArray(weekdaysNarrow)
    },

    // Day of week: Sun, Mon, ..., Sat
    'ddd': {
      unit: 'day',
      match: buildMatchRegExpFromArray(weekdaysShort),
      parse: buildParseFnFromArray(weekdaysShort)
    },

    // Day of week: Sunday, Monday, ..., Saturday
    'dddd': {
      unit: 'day',
      match: buildMatchRegExpFromArray(weekdaysLong),
      parse: buildParseFnFromArray(weekdaysLong)
    },

    // AM, PM
    'A': {
      unit: 'timeOfDay',
      match: buildMatchRegExpFromArray(timesOfDayUppercase),
      parse: buildParseFnFromArray(timesOfDayUppercase)
    },

    // am, pm
    'a': {
      unit: 'timeOfDay',
      match: buildMatchRegExpFromArray(timesOfDayLowercase),
      parse: buildParseFnFromArray(timesOfDayLowercase)
    },

    // a.m., p.m.
    'aa': {
      unit: 'timeOfDay',
      match: buildMatchRegExpFromArray(timesOfDayLong),
      parse: buildParseFnFromArray(timesOfDayLong)
    },

    // Ordinal quarter
    'Qo': {
      unit: 'quarter',
      match: patternOrdinal,
      parse: parseDecimal
    },

    // Ordinal month
    'Mo': {
      unit: 'month',
      match: patternOrdinal,
      parse: function (matchResult) {
        return parseDecimal(matchResult) - 1
      }
    },

    // Ordinal ISO week
    'Wo': {
      unit: 'isoWeek',
      match: patternOrdinal,
      parse: parseDecimal
    },

    // Ordinal day of week
    'do': {
      unit: 'day',
      match: patternOrdinal,
      parse: parseDecimal
    },

    // Ordinal day of month
    'Do': {
      unit: 'date',
      match: patternOrdinal,
      parse: parseDecimal
    },

    // Ordinal day of year
    'DDDo': {
      unit: 'dayOfYear',
      match: patternOrdinal,
      parse: parseDecimal
    }
  }
}
