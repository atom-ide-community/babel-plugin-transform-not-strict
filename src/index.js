'use strict';

module.exports = function ({ types: t }) {
    return {
        name: 'transform-not-strict',
        visitor: {
            Directive(path) {
                if (path.node.value.value === 'use strict') {
                    const siblings = path.container // get all the sibilings (code in the same level) of 'use strict'

                    for (const sibling of siblings) {
                        if (t.isDirective(sibling)) { // if the sibiling is a directive
                            if (sibling.value.value === 'not strict') { // check if its 'not strict'
                                path.remove(); // remove 'use strict'
                                break;
                            }
                        }
                    }
                }
            },
        },
    };
};
