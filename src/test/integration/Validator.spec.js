// Validator.spec.js
// Copyright © 2018 Joel Mussman. All rights reserved.
//

import React from 'react';
import TestRenderer from 'react-test-renderer';

import { consumePropertyMessages, resetPropertyMessages, throwPropertyMessages } from '../common/propertyMessages'

import Validator from '../../main/Validator'

describe('Validator Tests', () => {
    
    afterEach(() => {

        // Restore the original console error logger for the next test

        resetPropertyMessages()
    })

    it('fails when value is not provided', () => {

        throwPropertyMessages()
        expect(() => { TestRenderer.create(<Validator constraint={ 1 } notify={ mockNotify }>Error!</Validator>) }).toThrowError()
    })

    it('fails when constraint is not provided', () => {

        throwPropertyMessages()
        expect(() => { TestRenderer.create(<Validator value={ 1 } notify={ mockNotify }>Error!</Validator>) }).toThrowError()
    })

    it('is invalid when the value is not passed', () => {
        
        consumePropertyMessages()

        const currentView = JSON.stringify(TestRenderer.create(<Validator constraint={ 0 }>Error!</Validator>).toJSON())

        expect(currentView.indexOf('Error!')).toBeGreaterThanOrEqual(0)
    })

    it('is invalid when the constraint is not passed', () => {

        consumePropertyMessages()

        const currentView = JSON.stringify(TestRenderer.create(<Validator value={ 0 }>Error!</Validator>).toJSON())

        expect(currentView.indexOf('Error!')).toBeGreaterThanOrEqual(0)
    })

    it('is invalid when the value and constraint are not passed', () => {
        
        consumePropertyMessages()

        const currentView = JSON.stringify(TestRenderer.create(<Validator>Error!</Validator>).toJSON())

        expect(currentView.indexOf('Error!')).toBeGreaterThanOrEqual(0)
    })
})