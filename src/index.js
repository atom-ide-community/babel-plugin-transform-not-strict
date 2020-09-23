'use strict';

// remove for file that only have 'not strict'
function removeSelective(path, t, directiveTriggers, commentTriggers) {
    if (path.node.value.value === 'use strict') {
        const siblings = path.container // get all the sibilings (code in the same level) of 'use strict'

        for (const sibling of siblings) {
            if (t.isDirective(sibling)) { // if the sibiling is a directive
                if (sibling.value.value === 'not strict') { // check if its 'not strict'
                    path.remove(); // remove 'use strict'
                    break;
                }
            }

            // remove based on comment triggers
            if (commentTriggers.length) {
                if (sibling.leadingComments) {
                    let foundInLeadingComment = false;
                    for (const leadingComment of sibling.leadingComments) {
                        if (commentTriggers.includes(leadingComment.value.trim())) {
                            path.remove(); // remove 'use strict'
                            foundInLeadingComment = true;
                            break;
                        }
                    }
                    if (foundInLeadingComment) {
                        break;
                    }
                }
                if (sibling.trailingComments) {
                    let foundInTrailingComment = false;
                    for (const trailingComment of sibling.trailingComments) {
                        if (commentTriggers.includes(trailingComment.value.trim())) {
                            path.remove(); // remove 'use strict'
                            foundInTrailingComment = true;
                            break;
                        }
                    }
                    if (foundInTrailingComment) {
                        break;
                    }
                }
            }

        }
    }
}

// remove for all files
function removeAll(path) {
    if (path.node.value.value === 'use strict') {
        path.node.value.value = 'not strict' // replace 'use strict' with 'not strict'
    }
}


module.exports = function ({ types: t }) {
    return {
        name: 'transform-not-strict',
        visitor: {
            Directive(path, state) {
                if (state.opts.removeAll) {
                    removeAll(path) // remove for all files
                } else {
                    removeSelective(path, t, state.opts.directiveTriggers, state.opts.commentTriggers) // remove for file that only have 'not strict'
                }
            },
        },
    };
};
