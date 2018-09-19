// validateIsRequired.spec.js
// Copyright © 2018 Joel Mussman. All rights reserved.
//

import validateIsRequired from '../../main/validateIsRequired'

describe('validateIsRequired tests', () => {

    it('returns true if the value is defined', () => {

        const result = validateIsRequired(1)

        expect(result).toBeTruthy()
    })

    it('returns true for zero', () => {

        const result = validateIsRequired(0)

        expect(result).toBeTruthy()
    })

    it('returns false for undefined', () => {

        const value = undefined
        const result = validateIsRequired(value)

        expect(result).toBeFalsy()
    })

    it('returns false for null', () => {

        const result = validateIsRequired(null)

        expect(result).toBeFalsy()
    })

    it('returns false for an empty string', () => {

        const result = validateIsRequired('')

        expect(result).toBeFalsy()
    })

    it('returns false for an empty array', () => {

        const result = validateIsRequired([])

        expect(result).toBeFalsy()
    })

    it('returns false when the value is not passed', () => {

        const result = validateIsRequired()

        expect(result).toBeFalsy()
    })
})