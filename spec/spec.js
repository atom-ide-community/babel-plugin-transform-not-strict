const pluginTester = require('babel-plugin-tester').default

const transformNotStrict = require('../src/index.js')

pluginTester({
  plugin: transformNotStrict,
  filename: __filename,
  tests: [
    {
      code: '"not strict"; "use strict";',
      output:'"not strict";',
    },
    {
      code: '"not strict";',
      output:'"not strict";',
    },
  ]
})
