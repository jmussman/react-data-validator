// validateWithCallback.js
// Copyright © 2016 Joel Mussman. All rights reserved.
//

function validateWithCallback(value, callback) {

    // Execute a function to check the value

    let result = false

    if (typeof value !== 'undefined' && callback && typeof callback == 'function') {

        result = callback(value)
    }

    return result
}

export default validateWithCallback