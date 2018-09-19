// validateExact.spec.js
// Copyright © 2018 Joel Mussman. All rights reserved.
//

import validateExact from '../../main/validateExact'

describe('validateExact Tests', () => {

    it('returns true for exact data', () => {

        const result = validateExact('test', 'test')

        expect(result).toBeTruthy()
    })

    it('returns false for incorrect values', () => {

        const result = validateExact(4, 5)

        expect(result).toBeFalsy()
    })

    it('returns false for mismatched types', () => {

        const result = validateExact('5', 5)

        expect(result).toBeFalsy()
    })
})