// ValidatorRange.spec.js
// Copyright © 2018 Joel Mussman. All rights reserved.
//

import React from 'react';
import TestRenderer from 'react-test-renderer';

import Validator from '../../main/Validator'

describe('Validator Range Tests', () => {

    it('is valid when the value is the first element of the range', () => {
        
        const currentView = JSON.stringify(TestRenderer.create(<Validator value={ 1 } constraint={ { min: 1, max: 3 } }>Error!</Validator>).toJSON())

        expect(currentView.indexOf('Error!')).toBe(-1)
    })

    it('is valid when the value is the last element in the range', () => {
        
        const currentView = JSON.stringify(TestRenderer.create(<Validator value={ 3 } constraint={ { min: 1, max: 3 } }>Error!</Validator>).toJSON())

        expect(currentView.indexOf('Error!')).toBe(-1)
    })

    it('is valid when the value exists in the range', () => {
        
        const currentView = JSON.stringify(TestRenderer.create(<Validator value={ 2 } constraint={ { min: 1, max: 3 } }>Error!</Validator>).toJSON())

        expect(currentView.indexOf('Error!')).toBe(-1)
    })

    it('is valid when the range goes negative to positive', () => {
        
        const currentView = JSON.stringify(TestRenderer.create(<Validator value={ 0 } constraint={ { min: -1, max: 1 } }>Error!</Validator>).toJSON())

        expect(currentView.indexOf('Error!')).toBe(-1)
   })

    it('is invalid when the value is before the range', () => {
        
        const currentView = JSON.stringify(TestRenderer.create(<Validator value={ 0 } constraint={ { min: 1, max: 3 } }>Error!</Validator>).toJSON())

        expect(currentView.indexOf('Error!')).toBeGreaterThanOrEqual(0)
    })

    it('is invalid when the value is greater than the range', () => {
        
        const currentView = JSON.stringify(TestRenderer.create(<Validator value={ 4 } constraint={ { min: 1, max: 3 } }>Error!</Validator>).toJSON())

        expect(currentView.indexOf('Error!')).toBeGreaterThanOrEqual(0)
    })

    it('is invalid when value is not a number', () => {
        
        const currentView = JSON.stringify(TestRenderer.create(<Validator value={ '2' } constraint={ { min: 1, max: 3 } }>Error!</Validator>).toJSON())

        expect(currentView.indexOf('Error!')).toBeGreaterThanOrEqual(0)
    })

    it('is invalid when min is not a number', () => {
        
        const currentView = JSON.stringify(TestRenderer.create(<Validator value={ 0 } constraint={ { min: '1', max: 3 } }>Error!</Validator>).toJSON())

        expect(currentView.indexOf('Error!')).toBeGreaterThanOrEqual(0)
    })

    it('is invalid when max is not a number', () => {
        
        const currentView = JSON.stringify(TestRenderer.create(<Validator value={ 0 } constraint={ { min: 1, max: '3' } }>Error!</Validator>).toJSON())

        expect(currentView.indexOf('Error!')).toBeGreaterThanOrEqual(0)
    })

    it('is invalid when min is missing', () => {
        
        const currentView = JSON.stringify(TestRenderer.create(<Validator value={ 0 } constraint={ { max: 3 } }>Error!</Validator>).toJSON())

        expect(currentView.indexOf('Error!')).toBeGreaterThanOrEqual(0)
    })

    it('is invalid when max is missing', () => {
        
        const currentView = JSON.stringify(TestRenderer.create(<Validator value={ 0 } constraint={ { min: 1 } }>Error!</Validator>).toJSON())

        expect(currentView.indexOf('Error!')).toBeGreaterThanOrEqual(0)
    })

    it('is invalid when min and max are missing', () => {
    
        const currentView = JSON.stringify(TestRenderer.create(<Validator value={ 0 } constraint={ { } }>Error!</Validator>).toJSON())

        expect(currentView.indexOf('Error!')).toBeGreaterThanOrEqual(0)
    })

    it('is valid when min and max are reversed', () => {
    
        const currentView = JSON.stringify(TestRenderer.create(<Validator value={ 2 } constraint={ { min: 3, max: 1 } }>Error!</Validator>).toJSON())

        expect(currentView.indexOf('Error!')).toBe(-1)
    })
})