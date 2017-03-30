import localize from './localize/index.js'
import localizeDistanceInWords from './localizeDistanceInWords/index.js'
import buildFormatLocale from './buildFormatLocale/index.js'
import buildParseLocale from './buildParseLocale/index.js'

function buildLocale () {
  return {
    localize: localize,
    localizeDistanceInWords: localizeDistanceInWords,
    format: buildFormatLocale(),
    parse: buildParseLocale(),
    options: {
      weekStartsAt: 0
    }
  }
}

/**
 * @type {Locale}
 * @category Locales
 * @summary English locale.
 */
export default const enLocale = buildLocale()
