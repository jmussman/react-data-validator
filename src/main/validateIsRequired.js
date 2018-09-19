// validateIsRequired.js
// Copyright © 2018 Joel Mussman. All rights reserved.
//

function validateIsRequired(value) {

    // False if the value is undefined, null, or empty.


    const result = !((typeof value === 'undefined') || value === null || value === '' || (Array.isArray(value) && value.length <= 0))

    return result
}

export default validateIsRequired