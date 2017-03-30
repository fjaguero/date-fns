import '../localize/index.js'

export default function buildFormatters () {
  var formatters = {
    // Month: Jan, Feb, ..., Dec
    'MMM': function (date) {
      return localize['month', 'short', date.getUTCDay()]
    },

    // Month: January, February, ..., December
    'MMMM': function (date) {
      return localize['month', 'long', date.getUTCDay()]
    },

    // Day of week: Su, Mo, ..., Sa
    'dd': function (date) {
      return localize['weekday', 'narrow', date.getUTCDay()]
    },

    // Day of week: Sun, Mon, ..., Sat
    'ddd': function (date) {
      return localize['weekday', 'short', date.getUTCDay()]
    },

    // Day of week: Sunday, Monday, ..., Saturday
    'dddd': function (date) {
      return localize['weekday', 'long', date.getUTCDay()]
    },

    // AM, PM
    'A': function (date) {
      return localize['timeOfDay', 'uppercase', date.getUTCHours()]
    },

    // am, pm
    'a': function (date) {
      return localize['timeOfDay', 'lowercase', date.getUTCHours()
    },

    // a.m., p.m.
    'aa': function (date) {
      return localize['timeOfDay', 'long', date.getUTCHours()
    }
  }

  // Generate ordinal version of formatters: M -> Mo, D -> Do, etc.
  var ordinalFormatters = ['M', 'D', 'DDD', 'd', 'Q', 'W']
  ordinalFormatters.forEach(function (formatterToken) {
    formatters[formatterToken + 'o'] = function (date, formatters) {
      return ordinal(formatters[formatterToken](date))
    }
  })

  return formatters
}

function ordinal (number) {
  var rem100 = number % 100
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + 'st'
      case 2:
        return number + 'nd'
      case 3:
        return number + 'rd'
    }
  }
  return number + 'th'
}
