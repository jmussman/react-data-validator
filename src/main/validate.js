// validate.js
// Copyright © 2018 Joel Mussman. All rights reserved.
//

import validateExact from './validateExact'
import validateIsRequired from './validateIsRequired'
import validateList from './validateList'
import validateRange from './validateRange'
import validateRegex from './validateRegex'
import validateWithCallback from './validateWithCallback'

function validate(isRequired, value, constraint) {

    // This method is a controller that decides how to perform validation based on the information given
    // to the constraints prop. The default result is false, which is a best-practice for security,
    // so if a constraint is not found the result will still be false.

    let result = true

    // Check the value and constraint.

    if (typeof value === 'undefined' || typeof constraint === 'undefined') {

        result = false
    }

    // Check required flag.

    if (result && isRequired) {

        result = validateIsRequired(value)
    }

    // We can continue only if the value and constraint are actually defined

    if (result) {

        // Handle the validation if a regular expression is provided.

        if (constraint instanceof RegExp) {

            result = validateRegex(value, constraint)
        
        } else if (typeof constraint === 'object' && constraint.min && !isNaN(constraint.min) && constraint.max && !isNaN(constraint.max)) {

            // An object may be one of several types, but this only expects a "range" object with a min and max constraint.

            result = validateRange(value, constraint.min, constraint.max)
        
        } else if (Array.isArray(constraint)) {

            // If it is an array, validate against the members of the array.

            result = validateList(value, constraint)
        
        } else if (typeof constraint === 'function') {

            // If it is a function-object reference (including an arrow function) execute the function. 

            result = validateWithCallback(value, constraint)
        
        } else {

            // If it is anything else, look for an exact match.

            result = validateExact(value, constraint)
        }
    }

    return result
}

export default validate