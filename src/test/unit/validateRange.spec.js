// validateRange.spec.js
// Copyright © 2018 Joel Mussman. All rights reserved.
//

import validateRange from '../../main/validateRange'

describe('validateInRange Tests', () => {

    it('Is true when the value is the first element of the range', () => {

        const result = validateRange(1, 1, 3)

        expect(result).toBeTruthy()
    })

    it('returns true when the value is the last element in the range', () => {

        const result = validateRange(3, 1, 3)

        expect(result).toBeTruthy()
    })

    it('returns true when the value exists in the range', () => {

        const result = validateRange(2, 1, 3)

        expect(result).toBeTruthy()
    })

    it('returns true when the range goes negative to positive', () => {

        const result = validateRange(0, -1, 1)

        expect(result).toBeTruthy()
    })

    it('returns false when the value is before the range', () => {

        const result = validateRange(0, 1, 3)

        expect(result).toBeFalsy()
    })

    it('returns false when the value is greater than the range', () => {

        const result = validateRange(4, 1, 3)

        expect(result).toBeFalsy()
    })

    it('returns false when value is not a number', () => {

        const result = validateRange('1', 1, 3)

        expect(result).toBeFalsy()
    })

    it('returns false when min is not a number', () => {

        const result = validateRange(1, '1', 3)

        expect(result).toBeFalsy()
    })

    it('returns false when max is not a number', () => {

        const result = validateRange(1, 1, '3')

        expect(result).toBeFalsy()
    })

    it('returns false when max is missing', () => {

        const result = validateRange(1, 1)

        expect(result).toBeFalsy()
    })

    it('returns false when min and max are missing', () => {

        const result = validateRange(1)

        expect(result).toBeFalsy()
    })

    it('returns false value, min, and max are missing', () => {

        const result = validateRange()

        expect(result).toBeFalsy()
    })

    it('returns true when min and max are reversed', () => {

        const result = validateRange(2, 3, 1)

        expect(result).toBeTruthy()
    })
})