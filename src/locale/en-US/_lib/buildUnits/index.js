export default function buildUnits () {
  return {
    // a.m., p.m.
    timeOfDay: {
      priority: 65,
      set: function (date, value) {
        var hours = date.getUTCHours()
        var isAM = value === 0

        if (isAM) {
          if (hours === 12) {
            date.setUTCHours(0)
          }
        } else {
          if (hours !== 12) {
            date.setUTCHours(12 + hours)
          }
        }

        return date
      }
    }
  }
}
