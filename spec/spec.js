const pluginTester = require("babel-plugin-tester").default;

const transformNotStrict = require("../src/index.js");

pluginTester({
  plugin: transformNotStrict,
  filename: __filename,
  tests: [
    {
      code: '"not strict"; "use strict";',
      output: '"not strict";',
    },
    {
      code: '"not strict";',
      output: '"not strict";',
    },
    {
      code: '"use strict";',
      output: '"use strict";',
    },
    {
      code: '"use strict"; "not strict";',
      output: '"not strict";',
    },
    {
      code: `
      "use strict";
      "not strict";

      process.platform = "windows";
      `,
      output: `
      "not strict";

      process.platform = "windows";`,
    },
    {
      code: `
      "use strict";
      "not strict";

      let x = 1;
      `,
      output: `
      "not strict";

      let x = 1;`,
    },

    // With removeAll option
    {
      code: '"not strict"; "use strict";',
      output: `
      "not strict";
      "not strict";`,
      pluginOptions: {
        removeAll: true,
      },
    },
    {
      code: '"not strict";',
      output: '"not strict";',
      pluginOptions: {
        removeAll: true,
      },
    },
    {
      code: '"use strict";',
      output: '"not strict";',
      pluginOptions: {
        removeAll: true,
      },
    },
    {
      code: `
      "use strict";

      process.platform = "windows";
      `,
      output: `
      "not strict";

      process.platform = "windows";`,
      pluginOptions: {
        removeAll: true,
      },
    },
    {
      code: `
      "use strict";

      let x = 1;
      `,
      output: `
      "not strict";

      let x = 1;`,
      pluginOptions: {
        removeAll: true,
      },
    },

    // with extra comment and directive triggers
    {
      code: `
      "use strict";
      "use babel";
      `,
      output: `
      "use babel";
      `,
      pluginOptions: {
        directiveTriggers: ["use babel"],
        commentTriggers: ["@babel", "@flow", "* @babel", "* @flow"],
      },
    },
    {
      code: `
      "use babel";
      "use strict";
      `,
      output: `
      "use babel";
      `,
      pluginOptions: {
        directiveTriggers: ["use babel"],
        commentTriggers: ["@babel", "@flow", "* @babel", "* @flow"],
      },
    },
    {
      code: `
      "use strict";
      /** @babel */
      let x = 1;
      `,
      output: `
      /** @babel */
      let x = 1;
      `,
      pluginOptions: {
        directiveTriggers: ["use babel"],
        commentTriggers: ["@babel", "@flow", "* @babel", "* @flow"],
      },
    },
    {
      code: `
      "use strict";
      // @babel
      let x = 1;
      `,
      output: `
      // @babel
      let x = 1;
      `,
      pluginOptions: {
        directiveTriggers: ["use babel"],
        commentTriggers: ["@babel", "@flow", "* @babel", "* @flow"],
      },
    },
    {
      code: `
      "use strict";
      // @flow
      let x = 1;
      `,
      output: `
      // @flow
      let x = 1;
      `,
      pluginOptions: {
        directiveTriggers: ["use babel"],
        commentTriggers: ["@babel", "@flow", "* @babel", "* @flow"],
      },
    },
    {
      code: `
      // @flow
      "use strict";
      `,
      output: ``,
      pluginOptions: {
        directiveTriggers: ["use babel"],
        commentTriggers: ["@babel", "@flow", "* @babel", "* @flow"],
      },
    },
    {
      code: `
      // @babel
      // @flow
      "use strict";
      `,
      output: ``,
      pluginOptions: {
        directiveTriggers: ["use babel"],
        commentTriggers: ["@babel", "@flow", "* @babel", "* @flow"],
      },
    },
    {
      code: `
      // @babel
      "use strict";
      // @flow
      `,
      output: `
      `,
      pluginOptions: {
        directiveTriggers: ["use babel"],
        commentTriggers: ["@babel", "@flow", "* @babel", "* @flow"],
      },
    },
  ],
});
