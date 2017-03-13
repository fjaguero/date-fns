import firebase from 'firebase'
import path from 'path'
import fs from 'fs'
import childProcess from 'child_process'
import listLocales from './_lib/listLocales'
import countries from 'world-countries'
import languages from './_lib/languages.json'

// TODO: Convert to ISO 639-3
const codeAliases = {
  'fil': 'fil',
  'zh_cn': 'zho',
  'zh_tw': 'zho'
}

const {
  FIREBASE_EMAIL,
  FIREBASE_PASSWORD,
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID
} = process.env

const prereleaseRegExp = /(test|alpha|beta|rc)/

const features = {
  docs: true,
  i18n: true,
  benchmarks: true,
  camelCase: true,
  fp: true,
  esm: true,
  utc: false
}

const importExample = [`import format from 'date-fns/format'`]
  .concat(`format(new Date(2014, 1, 11), 'MM/DD/YYYY')`)
  .concat(`//=> '02/11/2014'`)
  .join('\n')

const constExample = [`dateFns.format(new Date(2014, 1, 11), 'MM/DD/YYYY')`]
  .concat(`//=> '02/11/2014'`)
  .join('\n')

const gettingStartedTabs = ['npm', 'yarn', 'bower', 'cdn']

function generateGettingStarted (version) {
  return {
    npm: {
      title: 'npm',
      install: `npm install date-fns@${version} --save`,
      example: importExample,
      link: 'https://www.npmjs.com/package/date-fns'
    },

    yarn: {
      title: 'Yarn',
      install: `yarn add date-fns@${version}`,
      example: importExample,
      link: 'https://www.npmjs.com/package/date-fns'
    },

    bower: {
      title: 'Bower',
      install: `bower install date-fns#${version}`,
      example: constExample,
      link: 'https://libraries.io/bower/date-fns'
    },

    cdn: {
      title: 'CDN & Download',
      install: `<script src="http://cdn.date-fns.org/v${version}/date_fns.min.js"></script>`,
      example: constExample,
      link: `http://cdn.date-fns.org/v${version}/date_fns.min.js`
    }
  }
}

function generateLocales (tag, locales) {
  if (!locales) {
    return locales
  }

  return locales.reduce((acc, locale) => {
    let code = codeAliases[locale]
    let lang
    if (code) {
      lang = languages.find(lang => lang.id === code)
    } else {
      lang = languages.find(lang => lang.part1 === locale)
      if (lang) code = lang.id
    }

    if (code) {
      return acc.concat({
        // Part ISO 639-1 to ISO 639-3
        code,
        url: `https://github.com/date-fns/date-fns/tree/${tag}/src/locale/${locale}`,
        name: lang.refName,
        countries: countries.reduce((accc, country) => {
          if (Object.keys(country.languages).includes(code)) {
            // ISO 3166-1 alpha-2
            return accc.concat(country.cca2)
          } else {
            return accc
          }
        }, [])
      })
    } else {
      return acc
    }
  }, [])
}

function generateVersionData () {
  const version = fs.readFileSync(path.join(process.cwd(), 'VERSION'))
    .toString()
    .replace(/[\s\n]/g, '')

  const tag = `v${version}`

  const commit = childProcess.execSync('git rev-parse HEAD')
    .toString()
    .replace(/[\s\n]/g, '')

  const date = parseInt(
    childProcess.execSync('git show -s --format=%ct')
      .toString()
      .replace(/[\s\n]/g, ''),
    10
  ) * 1000

  const docsJSON = fs.readFileSync(path.join(process.cwd(), 'dist', 'date_fns_docs.json'))
    .toString()
  const docs = JSON.parse(docsJSON)
  const docsCategories = Object.keys(docs)
  const docsPages = docsCategories.reduce((acc, category) => acc.concat(docs[category]), [])
  const docsKeys = docsPages
    .map(({urlId, category, title, description}, index) => ({urlId, category, title, description, key: index}))

  const locales = generateLocales(tag, listLocales().map((locale) => locale.code))

  const gettingStarted = generateGettingStarted(version)

  return {
    tag,
    date,
    prerelease: Boolean(prereleaseRegExp.exec(tag)),
    commit,
    docsPages,
    docsKeys,
    docsCategories,
    gettingStarted,
    gettingStartedTabs,
    locales,
    features
  }
}

function generateDocs (data) {
  const {tag, docsPages, docsKeys, docsCategories} = data

  return {
    tag,
    pages: docsPages,
    key: docsKeys,
    categories: docsCategories
  }
}

function generateVersion (data, docsKey) {
  const {
    tag,
    date,
    commit,
    prerelease,
    gettingStarted,
    gettingStartedTabs,
    features,
    locales
  } = data

  return {
    tag,
    date,
    commit,
    prerelease,
    gettingStarted,
    gettingStartedTabs,
    features,
    locales,
    docsKey
  }
}

firebase.initializeApp({
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID
})

firebase.auth()
  .signInWithEmailAndPassword(FIREBASE_EMAIL, FIREBASE_PASSWORD)
  .then(() => {
    const data = generateVersionData()

    const docsList = firebase.database().ref('/docs')
    const docs = docsList.push()

    const versionList = firebase.database().ref('/versions')
    const version = versionList.push()

    return Promise.all([
      docs.set(generateDocs(data)),
      version.set(generateVersion(data, docs.key))
    ])
  })
  .then(() => {
    console.log('Done!')
    process.exit(0)
  })
  .catch(({code, message}) => {
    console.log('Firebase returned an error:', code, message)
    process.exit(1)
  })
