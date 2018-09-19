// dateValidator.spec.js
// Copyright © 2018 Joel Mussman. All rights reserved.
//
// This validates that moment is passed all the data given to the validator, but does not
// check the dates. Validating moment is not the goal. The forms of calling moment are
// (see ):
//
// moment(string)
// moment(string, string)
// moment(string, string, boolean)
// moment(string, string, string)
// moment(string, string, string, boolean)
// moment(string, string[])
// moment(string, string[], string)
// moment(string, string[], boolean)
// moment(string, string[], string, boolean)
//
// This test does rely on internal knowledge of how dates are validated (using moment), but we
// still need to test that it works correctly.
//

jest.mock('moment')
import moment from 'moment'

import dateValidator from '../../main/dateValidator'

describe('dateValidator Tests', () => {

    beforeAll(() => {

        moment.mockImplementation(() => { return { isValid: function () { return true }}});
    })

    it('calls moment with a date string', () => {

        const date = '2018-31-08'

        dateValidator(date)
        expect(moment).toHaveBeenCalledWith(date)
    })

    it('calls moment with date and format strings', () => {

        const date = '2018-31-08'
        const format = 'M/D/YYYY'

        dateValidator(date, format)
        expect(moment).toHaveBeenCalledWith(date, format)
    })

    it('calls moment with date and format strings, and strict', () => {

        const date = '8/31/2018'
        const format = 'M/D/YYYY'
        const strict = true

        dateValidator(date, format, strict)
        expect(moment).toHaveBeenCalledWith(date, format, strict)
    })

    it('calls moment with date, format, and locale strings', () => {

        const date = '2018-31-08'
        const format = 'M/D/YYYY'
        const locale = 'us'

        dateValidator(date, format, locale)
        expect(moment).toHaveBeenCalledWith(date, format, locale)
    })

    it('calls moment with date, format, and locale strings, and strict', () => {

        const date = '2018-31-08'
        const format = 'M/D/YYYY'
        const locale = 'us'
        const strict = true

        dateValidator(date, format, locale, strict)
        expect(moment).toHaveBeenCalledWith(date, format, locale, strict)
    })

    it('calls moment with date and multiple format strings', () => {

        const date = '2018-31-08'
        const formats = [ 'M/D/YYYY', 'M/D/YY' ]

        dateValidator(date, formats)
        expect(moment).toHaveBeenCalledWith(date, formats)
    })

    it('calls moment with date, multiple format strings, and locale', () => {

        const date = '2018-31-08'
        const formats = [ 'M/D/YYYY', 'M/D/YY' ]
        const locale = 'us'

        dateValidator(date, formats, locale)
        expect(moment).toHaveBeenCalledWith(date, formats, locale)
    })

    it('calls moment with date, multiple format strings, and strict', () => {

        const date = '2018-31-08'
        const formats = [ 'M/D/YYYY', 'M/D/YY' ]
        const strict = true

        dateValidator(date, formats, strict)
        expect(moment).toHaveBeenCalledWith(date, formats, strict)
    })

    it('calls moment with date, multiple format strings, locale, and strict', () => {

        const date = '2018-31-08'
        const formats = [ 'M/D/YYYY', 'M/D/YY' ]
        const locale = 'us'
        const strict = true

        dateValidator(date, formats, locale, strict)
        expect(moment).toHaveBeenCalledWith(date, formats, locale, strict)
    })
})