// cardInfo.spec.js
// Copyright © 2018 Joel Mussman. All rights reserved.
//

jest.mock('../../main/cardNumberValidator')

import jestFetchMock from 'jest-fetch-mock'

import cardInfo from '../../main/cardInfo'
import cardNumberValidator from '../../main/cardNumberValidator'

describe('cardInfo Tests', () => {

    let globalFetchOriginal = null

    beforeEach(() => {

        cardNumberValidator.mockImplementation(() => true );

        // Save the original global.fetch to reset in afterEach, we don't know that another test elsewhere actually depends on it.

        globalFetchOriginal = global.fetch
        global.fetch = jestFetchMock
    })

    afterEach(() => {

        // Reset the global.fetch method, we don't know that another test elsewhere actually depends on it.

        global.fetch = globalFetchOriginal
    })

    it('uses fetch to pass the Issuer Identification Number or Bank Identification Number', async (done) => {

        const cardNumber = '378282246310005'
        const path = `https://lookup.binlist.net/${378282}`

        fetch.mockResponseOnce(JSON.stringify({ data: '12345' }))

        const result = await cardInfo(cardNumber)

        expect(global.fetch).toHaveBeenCalledWith(path)
        done()
    })

    it('parses the JSON into an object', async (done) => {

        const cardNumber = '378282246310005'

        fetch.mockResponseOnce(JSON.stringify({ data: '12345' }))

        const result = await cardInfo(cardNumber)

        expect(result.data).toBe('12345')
        done()
    })

    it('rejects with an invalid card number', async (done) => {

        const cardNumber = '378282246310000'

        try {
        
            const result = await cardInfo(cardNumber)
        }

        catch (err) {

            done()
        }
    })

    it('rejects on fetch error', async (done) => {

        const cardNumber = '378282246310005'

        fetch.mockReject(new Error('fake error message'))

        try {
        
            const result = await cardInfo(cardNumber)
        }

        catch (err) {

            done()
        }
    })
})