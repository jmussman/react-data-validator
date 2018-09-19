// ValidatorWithCallback.spec.js
// Copyright © 2018 Joel Mussman. All rights reserved.
//

import React from 'react';
import TestRenderer from 'react-test-renderer';

import Validator from '../../main/Validator'

describe('Validator WithCallback Tests', () => {

    it('it calls the callback with the correct value', () => {

        const func = jest.fn(value => true)
        const value = true
        const currentView = JSON.stringify(TestRenderer.create(<Validator value={ value } constraint={ func }>Error!</Validator>).toJSON())

        expect(func).toBeCalledWith(value)
    })

    it('is valid when it calls the callback sees true', () => {

        const func = jest.fn(value => true)
        const currentView = JSON.stringify(TestRenderer.create(<Validator value={ true } constraint={ func }>Error!</Validator>).toJSON())

        expect(currentView.indexOf('Error!')).toBe(-1)
    })

    it('is invalid when it calls the callback and sees false', () => {

        const func = jest.fn(value => false)
        const currentView = JSON.stringify(TestRenderer.create(<Validator value={ true } constraint={ func }>Error!</Validator>).toJSON())

        expect(currentView.indexOf('Error!')).toBeGreaterThanOrEqual(0)
    })
})