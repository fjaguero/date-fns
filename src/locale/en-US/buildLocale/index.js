import buildLocaleBuilder from '../../_lib/buildLocaleBuilder/index.js'
import localize from '../_lib/localize/index.js'
import localizeDistanceInWords from '../_lib/localizeDistanceInWords/index.js'
import buildFormatters from '../_lib/buildFormatters/index.js'
import buildParsers from '../_lib/buildParsers/index.js'
import buildUnits from '../_lib/buildUnits/index.js'

export default const buildLocale = buildLocaleBuilder({
  localize: localize,
  localizeDistanceInWords: localizeDistanceInWords,
  formatters: buildFormatters(),
  parsers: buildParsers(),
  units: buildUnits(),
  options: {
    weekStartsAt: 0
  }
})
