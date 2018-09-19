// validateWithCallback.spec.js
// Copyright © 2018 Joel Mussman. All rights reserved.
//

import validateWithCallback from '../../main/validateWithCallback'

describe('validateWithCallback Tests', () => {

    it('runs the callback with the correct value', () => {

        const value = 'true'
        const func = jest.fn(value => true)

        validateWithCallback(value, func)
        expect(func).toBeCalledWith(value)
    })

    it('returns false if the callback is not a function', () => {

        const result = validateWithCallback(true, true)

        expect(result).toBeFalsy()
    })

    it('returns false if the callback is not defined', () => {

        const result = validateWithCallback(true)

        expect(result).toBeFalsy()
    })

    it('returns false if the value is not defined', () => {

        const result = validateWithCallback()

        expect(result).toBeFalsy()
    })
})