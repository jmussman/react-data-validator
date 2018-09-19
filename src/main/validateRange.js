// validateRange.js
// Copyright © Joel Mussman. All rights reserved.
//

function validateRange(value, min, max) {

    // Check the value against a minimum and maximum range.

    let result = false

    if (typeof value === 'number' && typeof min === 'number' && typeof max === 'number') {

        if (min > max) {

            const swap = min

            min = max
            max = swap
        }

        value = parseFloat(value);
        result = (value >= min && value <= max)
    }

    return result
}

export default validateRange