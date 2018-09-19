// dateValidator.js
// Copyright © 2018 Joel Mussman. All rights reserved.
//
// This wraps moment: see https://momentjs.com/docs/#/parsing/ for parsing details.
//

import moment from 'moment'

function dateValidator(...args) {

    const valid = moment(...args).isValid()

    return valid
}

export default dateValidator