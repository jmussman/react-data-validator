// ValidatorExact.spec.js
// Copyright © 2018 Joel Mussman. All rights reserved.
//

import React from 'react';
import TestRenderer from 'react-test-renderer';

import Validator from '../../main/Validator'

describe('Validator Exact Tests', () => {

    it('is valid for exact data', () => {
        
        const currentView = JSON.stringify(TestRenderer.create(<Validator value={ 1 } constraint={ 1 }>Error!</Validator>).toJSON())

        expect(currentView.indexOf('Error!')).toBe(-1)
    })

    it('is invalid for in-exact values', () => {
        
        const currentView = JSON.stringify(TestRenderer.create(<Validator value={ 1 } constraint={ 0 }>Error!</Validator>).toJSON())

        expect(currentView.indexOf('Error!')).toBeGreaterThanOrEqual(0)
    })

    it('is invalid for mismatched types', () => {
        
        const currentView = JSON.stringify(TestRenderer.create(<Validator value={ 1 } constraint={ '1' }>Error!</Validator>).toJSON())

        expect(currentView.indexOf('Error!')).toBeGreaterThanOrEqual(0)
    })
})