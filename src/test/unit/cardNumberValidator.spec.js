// cardNumberValidator.spec.js
// Copyright © 2018 Joel Mussman. All rights reserved.
//

import cardNumberValidator from '../../main/cardNumberValidator'

describe('cardNumberValidator Tests', () => {

    it('validates a correct card number', () => {

        const cardNumber = '378282246310005'
        const result = cardNumberValidator(cardNumber)
        
        expect(result).toBeTruthy()
    })

    it('does not validate an incorrect card number', () => {

        const cardNumber = '378282246310000'
        const result = cardNumberValidator(cardNumber)
        
        expect(result).toBeFalsy()
    })
})