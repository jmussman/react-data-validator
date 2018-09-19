// ValidatorRegex.spec.js
// Copyright © 2018 Joel Mussman. All rights reserved.
//

import React from 'react';
import TestRenderer from 'react-test-renderer';

import Validator from '../../main/Validator'

describe('Validator Regex Tests', () => {

    it('is valid for a value matching a regular expression', () => {
    
        const currentView = JSON.stringify(TestRenderer.create(<Validator value={ 'true' } constraint={ /true/ }>Error!</Validator>).toJSON())

        expect(currentView.indexOf('Error!')).toBe(-1)
    })

    it('is invalid for a value not matching a regular expression', () => {
    
        const currentView = JSON.stringify(TestRenderer.create(<Validator value={ 'false' } constraint={ /true/ }>Error!</Validator>).toJSON())

        expect(currentView.indexOf('Error!')).toBeGreaterThanOrEqual(0)
    })

    it('is invalid if value is not a string', () => {
    
        const currentView = JSON.stringify(TestRenderer.create(<Validator value={ 0 } constraint={ /true/ }>Error!</Validator>).toJSON())

        expect(currentView.indexOf('Error!')).toBeGreaterThanOrEqual(0)
    })
})