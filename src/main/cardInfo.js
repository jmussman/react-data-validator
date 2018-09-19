// cardInfo.js
// Copyright © Smallrock Internet. All rights reserved.
//
// This is not a validator, but it is included in the package because after
// validation it may be useful to have information about a credit card. The
// function is a proxy for https://lookup.binlist.net/.
//
// This function eats any error from the fetch, or if the card number is
// invalid, and returns null as the result. Any fetch error is logged to 
// the console to use for debugging purposes.
//

import cardNumberValidator from './cardNumberValidator'

async function cardInfo(cardNumber) {

    let result = null

    if (!cardNumberValidator(cardNumber)) {

        result = Promise.reject(new Error('Invalid card number'))
    
    } else {

        let bin = cardNumber.slice(0, 6)
        let raw = await fetch(`https://lookup.binlist.net/${bin}`)

        result = await raw.json()
    }

    return result
}

export default cardInfo