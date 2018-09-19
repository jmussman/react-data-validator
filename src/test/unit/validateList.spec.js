// validateList.spec.js
// Copyright © 2018 Joel Mussman. All rights reserved.
//

import validateList from '../../main/validateList'

describe('validateList tests', () => {

    it('returns true when the value exists as the first element of the list', () => {

        const result = validateList(1, [ 1, 2, 3 ])

        expect(result).toBeTruthy()
    })

    it('returns true when the value exists as the last element in the list', () => {

        const result = validateList(3, [ 1, 2, 3 ])

        expect(result).toBeTruthy()
    })

    it('returns true when the value exists in the list', () => {

        const result = validateList(2, [ 1, 2, 3 ])

        expect(result).toBeTruthy()
    })

    it('returns false when the value does not exist in the list', () => {

        const result = validateList(4, [ 1, 2, 3 ])

        expect(result).toBeFalsy()
    })

    it('returns false when the value is not the same type in the list', () => {

        const result = validateList('2', [ 1, 2, 3 ])

        expect(result).toBeFalsy()
    })

    it('returns false when the list is empty', () => {

        const result = validateList(1)

        expect(result).toBeFalsy()
    })
})