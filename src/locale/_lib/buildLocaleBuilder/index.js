import buildTokensRegExp from '../buildTokensRegExp/index.js'

export default function buildBuildLocale (localeBase) {
  return function (localeExtension) {
    localeExtension = localeExtension || {}

    var locale = {
      localize: localeExtension.localize || localeBase.localize,
      localizeDistanceInWords: localeExtension.localizeDistanceInWords || localeBase.localizeDistanceInWords,
      formatters: Object.assign({}, localeBase.formatters, localeExtension.formatters || {}),
      parsers: Object.assign({}, localeBase.parsers, localeExtension.parsers || {}),
      units: Object.assign({}, localeBase.units, localeExtension.units || {}),
      options: Object.assign({}, localeBase.options, localeExtension.options)
    }

    locale.formattingTokensRegExp = buildTokensRegExp(locale.formatters)
    locale.parsingTokensRegExp = buildTokensRegExp(locale.parsers)

    return locale
  }
}
