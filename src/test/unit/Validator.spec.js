// Validator.spec.js
// Copyright © 2018 Joel Mussman. All rights reserved.
//
// These tests check the Validator component to make sure that a) the correct validation
// function is used, b) the message is displayed for failed validation, and c) the
// notification callback is used.
//

jest.mock('../../main/validate')

import React from 'react';
import TestRenderer from 'react-test-renderer';

import { resetPropertyMessages, throwPropertyMessages } from '../common/propertyMessages'

import validate from '../../main/validate'
import Validator from '../../main/validator'

describe('Validator tests', () => {
    
    afterEach(() => {

        // Restore the original console error logger for the next test

        resetPropertyMessages()
    })

    it('renders the message when the value is invalid', () => {

        validate.mockImplementation(() => false)
        
        const currentView = JSON.stringify(TestRenderer.create(<Validator value={ 1 } constraint={ 0 }>Error!</Validator>).toJSON())

        expect(currentView.indexOf('Error!')).toBeGreaterThanOrEqual(0)
    })

    it('does not render when the value is valid', () => {

        validate.mockImplementation(() => true)
        
        const currentView = JSON.stringify(TestRenderer.create(<Validator value={ 1 } constraint={ 0 }>Error!</Validator>).toJSON())

        expect(currentView.indexOf('Error!')).toBe(-1)
    })

    it('renders on an required, empty value when renderOnEmpty is true', ()=> {

        validate.mockImplementation(() => false)
        
        const currentView = JSON.stringify(TestRenderer.create(<Validator isRequired={ true } value={ '' } constraint={ 'true' } renderOnEmpty={ true }>Error!</Validator>).toJSON())

        expect(currentView.indexOf('Error!')).toBeGreaterThanOrEqual(0)
    })

    it('does not render on a required, empty value when renderOnEmpty is not true', () => {

        validate.mockImplementation(() => false)
        
        const currentView = JSON.stringify(TestRenderer.create(<Validator isRequired={ true } value={ '' } constraint={ 'true' }>Error!</Validator>).toJSON())

        expect(currentView.indexOf('Error!')).toBe(-1)
    })

    it('calls notify when the value is invalid', done => {

        const mockNotify = jest.fn(() => done() )

        validate.mockImplementation(() => false)
        TestRenderer.create(<Validator value={ 1 } constraint={ 0 } notify={ mockNotify }>Error!</Validator>)

        // If mockNotify was called then done() is called and the test completes, otherwise it fails.
    })

    it('does not call notify when the value is valid', done => {

        const mockNotify = jest.fn(() => true )

        validate.mockImplementation(() => true)
        TestRenderer.create(<Validator value={ 1 } constraint={ 1 } notify={ mockNotify }>Error!</Validator>)

        setTimeout(() => {

            // mockNotify will be called through a timeout of zero milliseconds, so setting up another callback will run after
            // it and check to see if the function was called or not. Yes, this does require knowledge of how Validator works,
            // but there isn't much we can do about that if we want to test the results.

            expect(mockNotify).not.toHaveBeenCalled()
            done()

        }, 0)
    })

    it('fails when value is not provided', () => {

        throwPropertyMessages()
        validate.mockImplementation(() => true)
        expect(() => { TestRenderer.create(<Validator constraint={ 1 } notify={ mockNotify }>Error!</Validator>) }).toThrowError()
    })

    it('fails when constraint is not provided', () => {

        throwPropertyMessages()
        validate.mockImplementation(() => true)
        expect(() => { TestRenderer.create(<Validator value={ 1 } notify={ mockNotify }>Error!</Validator>) }).toThrowError()
    })
})