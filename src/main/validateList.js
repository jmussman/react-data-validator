// validateList.js
// Copyright © 2018 Joel Mussman. All rights reserved.
//

function validateList(value, list) {

    // Valid if the value exists in the list.

    let result = false

    if (list && Array.isArray(list)) {

        for (let i = 0; i < list.length; i++) {

            if (list[i] === value) {

                result = true
                break
            }
        }
    }
    
    return result
}

export default validateList