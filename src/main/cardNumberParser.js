// cardNumberParser.js
// Copyright © 2018 Joel Mussmn. All rights reserved.
//
// This is not a validator, but it is included in the package because after
// validation it may be useful to have information about a credit card. This
// simply returns the information in the card. A good reference for the
// card layout is http://www.dirigodev.com/blog/ecommerce/anatomy-of-a-credit-card-number/.
//

import cardNumberValidator from './cardNumberValidator'

function cardNumberParser(cardNumber) {

    let result = null

    if (cardNumberValidator(cardNumber)) {

        result = {
        
            mii: cardNumber.charAt(0),
            iin_bin: cardNumber.slice(0, 6),
            account: cardNumber.slice(6, cardNumber.length - 1),
            checksum: cardNumber.slice(cardNumber.length - 1)
        }
    }

    return result
}

export default cardNumberParser