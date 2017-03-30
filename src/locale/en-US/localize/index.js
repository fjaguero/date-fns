var locale = {
  weekday: {
    narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    long: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  },

  era: {
    narrow: ['B', 'A'],
    short: ['BC', 'AD'],
    long: ['Before Christ', 'Anno Domini']
  },

  month: {
    narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    long: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  }

  timeOfDay: {
    uppercase: ['AM', 'PM'],
    lowercase: ['am', 'pm'],
    long: ['a.m.', 'p.m.']
  }
}

const locale = {
  blank: 'Aucune date sélectionnée',
  headerFormat: 'dddd, D MMM',
  locale: require('date-fns/locale/fr'), // You need to pass in the date-fns locale for the language you want (unless it's EN)
  todayLabel: {
    long: "Aujourd'hui",
    short: 'Auj.',
  },
  weekdays: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
  weekStartsOn: 1, // Start the week on Monday
};

export default function localize (token, payload, options) {

}
