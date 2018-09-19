// validateRegex.spec.js
// Copyright © 2018 Joel Mussman. All rights reserved.
//

import validateRegex from '../../main/validateRegex'

describe('validateRegex Tests', () => {

    it('returns true for a value matching a regular expression', () => {

        const result = validateRegex('true', /true/)

        expect(result).toBeTruthy()
    })

    it('returns false for a value not matching a regular expression', () => {

        const result = validateRegex('false', /true/)

        expect(result).toBeFalsy()
    })

    it('returns false if expression is not a regular expression', () => {

        const result = validateRegex('false', 'true')

        expect(result).toBeFalsy()
    })

    it('returns false if expression is not defined', () => {

        const result = validateRegex('false')

        expect(result).toBeFalsy()
    })

    it('returns false if value is not a string', () => {

        const result = validateRegex(0, /0/)

        expect(result).toBeFalsy()
    })
})