// validateRegex.js
// Copyright © 2018 Joel Mussman. All rights reserved.
//

function validateRegex(value, expression) {

    // Valid if the value matches the regular expression.

    let result = false
    
    if (typeof value === 'string' && expression && expression instanceof RegExp) {

        result = expression.test(value)
    }

    return result
}

export default validateRegex