// ValidatorIsRequired.spec.js
// Copyright © 2018 Joel Mussman. All rights reserved.
//

import React from 'react';
import TestRenderer from 'react-test-renderer';

import Validator from '../../main/Validator'

describe('Validator IsRequired Tests', () => {

    it('is valid if the value is defined', () => {
        
        const currentView = JSON.stringify(TestRenderer.create(<Validator value={ 1 } constraint={ 1 } isRequired={ true }>Error!</Validator>).toJSON())

        expect(currentView.indexOf('Error!')).toBe(-1)
   })

    it('is valid for zero', () => {
        
        const currentView = JSON.stringify(TestRenderer.create(<Validator value={ 0 } constraint={ 0 } isRequired={ true }>Error!</Validator>).toJSON())

        expect(currentView.indexOf('Error!')).toBe(-1)
    })

    it('is invalid for null', () => {
        
        const currentView = JSON.stringify(TestRenderer.create(<Validator value={ null } constraint={ null } isRequired={ true }>Error!</Validator>).toJSON())

        expect(currentView.indexOf('Error!')).toBeGreaterThanOrEqual(0)
    })

    it('is invalid for an empty string', () => {
        
        const currentView = JSON.stringify(TestRenderer.create(<Validator value={ '' } constraint={ '' } isRequired={ true }>Error!</Validator>).toJSON())

        expect(currentView.indexOf('Error!')).toBeGreaterThanOrEqual(0)
    })

    it('is invalid when the value is undefined', () => {
        
        const value = undefined
        const currentView = JSON.stringify(TestRenderer.create(<Validator value={ value } constraint={ 0 } isRequired={ true }>Error!</Validator>).toJSON())

        expect(currentView.indexOf('Error!')).toBeGreaterThanOrEqual(0)
    })
})