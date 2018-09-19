// validateExact.js
// Copyright © 2018 Joel Mussman. All rights reserved.
//

function validateExact(value, exact) {

    // Valid if the value is an exact match, both in type and value.

    const result = value === exact

    return result
}

export default validateExact