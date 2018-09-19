// validate.spec.js
// Copyright © 2018 Joel Mussman. All rights reserved.
//
// This test relies on internal knowledge of validate, it is testing to make
// sure that the correct validator is called based on the data passed.
//

jest.mock('../../main/validateExact')
jest.mock('../../main/validateIsRequired')
jest.mock('../../main/validateList')
jest.mock('../../main/validateRange')
jest.mock('../../main/validateRegex')
jest.mock('../../main/validateWithCallback')

import validateExact from '../../main/validateExact'
import validateIsRequired from '../../main/validateIsRequired'
import validateList from '../../main/validateList'
import validateRange from '../../main/validateRange'
import validateRegex from '../../main/validateRegex'
import validateWithCallback from '../../main/validateWithCallback'

import validate from '../../main/validate'

describe('validate Tests', () => {

    it('uses validateIsRequired', () => {

        validateIsRequired.mockImplementation(() => true)
        validate(true, 0, 0)
        expect(validateIsRequired).toBeCalled()
    })

    it('uses validateRegex', () => {

        const value = 'true'
        const regex = /true/

        validateRegex.mockImplementation(() => true)
        validate(false, value, regex)
        expect(validateRegex).toBeCalledWith(value, regex)
    })

    it('uses validateRange', () => {

        const range = { min: 1, max: 3 }
        const value = 2

        validateRange.mockImplementation(() => true)
        validate(false, value, range)
        expect(validateRange).toBeCalledWith(value, range.min, range.max)
    })

    it('uses validateList', () => {

        const array = [ 1, 2, 3 ]
        const value = 2

        validateList.mockImplementation(() => true)
        validate(false, value, array)
        expect(validateList).toBeCalledWith(value, array)
    })

    it('uses validateWithCallback', () => {

        const mock = jest.fn(() => true)
        const value = 2

        validateWithCallback.mockImplementation(() => true)
        validate(false, value, mock)
        expect(validateWithCallback).toBeCalledWith(value, mock)
    })

    it('uses validateExact for numbers', () => {

        const value = 1

        validateExact.mockImplementation(() => true)
        validate(false, value, value)
        expect(validateExact).toBeCalledWith(value, value)
    })

    it('uses validateExact for strings', () => {

        const value = 'true'

        validateExact.mockImplementation(() => true)
        validate(false, value, value)
        expect(validateExact).toBeCalledWith(value, value)
    })

    it('uses validateExact for objects', () => {

        const value = { }

        validateExact.mockImplementation(() => true)
        validate(false, value, value)
        expect(validateExact).toBeCalledWith(value, value)
    })
})