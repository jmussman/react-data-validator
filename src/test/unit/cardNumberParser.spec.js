// cardNumberParser.spec.js
// Copyright © 2018 Joel Mussman. All rights reserved.
//

jest.mock('../../main/cardNumberValidator')

import cardNumberParser from '../../main/cardNumberParser'
import cardNumberValidator from '../../main/cardNumberValidator'

describe('cardNumberParser tests', () => {

    beforeEach(() => {

        cardNumberValidator.mockImplementation(() => true );
    })

    it('will reject invalid card numbers', () => {

        cardNumberValidator.mockImplementation(() => false );
        
        const result = cardNumberParser('1234567890123456')

        expect(result).toBeNull()
    })

    it('will parse valid card numbers of length 11', () => {

        const expected_mii = '7'
        const expected_iin_bin = '760092'
        const expected_account = '4456'
        const expected_checksum = '1'

        const result = cardNumberParser('76009244561')

        expect(result.mii).toBe(expected_mii)
        expect(result.iin_bin).toBe(expected_iin_bin)
        expect(result.account).toBe(expected_account)
        expect(result.checksum).toBe(expected_checksum)
    })

    it('will parse valid card numbers of length 16',  () => {

        const expected_mii = '4'
        const expected_iin_bin = '401288'
        const expected_account = '888888188'
        const expected_checksum = '1'

        const result = cardNumberParser('4012888888881881')

        expect(result.mii).toBe(expected_mii)
        expect(result.iin_bin).toBe(expected_iin_bin)
        expect(result.account).toBe(expected_account)
        expect(result.checksum).toBe(expected_checksum)
    })
})