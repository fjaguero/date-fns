var locale = {
  weekdays: {
    narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    long: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  },

  eras: {
    narrow: ['B', 'A'],
    short: ['BC', 'AD'],
    long: ['Before Christ', 'Anno Domini']
  },

  months: {
    narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    long: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  }

  timesOfDay: {
    uppercase: ['AM', 'PM'],
    lowercase: ['am', 'pm'],
    long: ['a.m.', 'p.m.']
  }
}

export default function localize (token, type, payload) {
  if (token === 'weekday') {
    return locale.weekdays[type][payload]
  } else if (token === 'era') {
    return locale.eras[type][payload]
  } else if (token === 'month') {
    return locale.months[type][payload]
  } else if (token === 'timeOfDay') {
    var index = (payload / 12) >= 1 ? 1 : 0
    return locale.timesOfDay[type][index]
  } else {
    return locale[token][type]
  }
}
