// ValidatorList.spec.js
// Copyright © 2018 Joel Mussman. All rights reserved.
//

import React from 'react';
import TestRenderer from 'react-test-renderer';

import Validator from '../../main/validator'

describe('Validator List Tests', () => {

    it('is valid when the value exists as the first element of the list', () => {
        
        const currentView = JSON.stringify(TestRenderer.create(<Validator value={ 1 } constraint={ [ 1, 2, 3 ] }>Error!</Validator>).toJSON())

        expect(currentView.indexOf('Error!')).toBe(-1)
    })

    it('is valid when the value exists as the last element in the list', () => {
        
        const currentView = JSON.stringify(TestRenderer.create(<Validator value={ 3 } constraint={ [ 1, 2, 3 ] }>Error!</Validator>).toJSON())

        expect(currentView.indexOf('Error!')).toBe(-1)
    })

    it('is valid when the value exists in the list', () => {
        
        const currentView = JSON.stringify(TestRenderer.create(<Validator value={ 2 } constraint={ [ 1, 2, 3 ] }>Error!</Validator>).toJSON())

        expect(currentView.indexOf('Error!')).toBe(-1)
    })

    it('is invalid when the value does not exist in the list', () => {
        
        const currentView = JSON.stringify(TestRenderer.create(<Validator value={ 4 } constraint={ [ 1, 2, 3 ] }>Error!</Validator>).toJSON())

        expect(currentView.indexOf('Error!')).toBeGreaterThanOrEqual(0)
    })

    it('is invalid when the value is not the same type in the list', () => {
        
        const currentView = JSON.stringify(TestRenderer.create(<Validator value={ '2' } constraint={ [ 1, 2, 3 ] }>Error!</Validator>).toJSON())

        expect(currentView.indexOf('Error!')).toBeGreaterThanOrEqual(0)
    })

    it('is invalid when the list is empty', () => {
        
        const currentView = JSON.stringify(TestRenderer.create(<Validator value={ 1 } constraint={ [ ] }>Error!</Validator>).toJSON())

        expect(currentView.indexOf('Error!')).toBeGreaterThanOrEqual(0)
    })
})