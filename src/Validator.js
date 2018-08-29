// Validator.js
// Copyright © 2018 Smallrock Internet. All rights reserved.
//
// <Validator className='' value={} constraint={} notify={} renderOnEmpty={}>message</Validator>
//

import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Validator extends Component {

    static get defaultProps() {

        // This acts as a class property defining the default values for the props.

        return {
            
            isRequired: false,
            renderOnEmpty: false
        }
    }

    static get propTypes() {

        // This acts as a class property defining the expected properties. isRequired is our
        // own property, and is not itself required.

        return {

            className: PropTypes.string,
            isRequired: PropTypes.bool,
            notify: PropTypes.func,
            renderOnEmpty: PropTypes.bool,
            value: PropTypes.string
        }
    }

    render() {

        // Perform validation and notify whoever is listening about the results on failure.

        const valid = this._validate(this.props.value, this.props.constraint)

        if (!valid && this.props.notify) {

            this.props.notify()
        }
        
        // Render failed validation message (the children).

        let rendered = null;

        if (this.props.children && !valid && (this.props.value || this.props.renderOnEmpty)) {

            rendered = <span className={ this.props.className }>{ this.props.children }</span>
        }

        return rendered
    }

    _validate(value, constraint) {

        // This method is a controller that decides how to perform validation based on the information given
        // to the constraints prop. The default result is false, which is a best-practice for security,
        // so if a constraint is not found the result will still be false.

        let result = false

        // Check required flag.

        if (this.props.isRequired) {

            result = this._validateIsRequired(value)
        }

        // We can continue only if the value and constraint are actually defined

        if (result && typeof value !== "undefined" && typeof constraint !== "undefined") {

            // Handle the validation if a regular expression is provided.

            if (constraint instanceof RegExp) {

                result = this._validateRegex(value, constraint)
            }

            // An object may be one of several types, but this only expects a "range" object with a min and max constraint.

            if (typeof constraint === 'object') {

                // See if this is a "range" object
                
                if (constraint.min && !isNaN(constraint.min) && constraint.max && !isNaN(constraint.max)) {

                    result = this._validateRange(value, constraint.min, constraint.max)
                }
            }

            // If it is an array, validate against the members of the array.
            
            if (Array.isArray(constraint)) {

                result = this._validateList(value, constraint)
            }

            // If it is a string, look for an exact match.
            
            if (typeof constraint === 'string') {

                result = this._validateExact(value, constraint)
            }

            // If it is a function-object reference (including an arrow function) execute the function.

            if (typeof constraint === 'function') {

                result = this.v_alidateWithCallback(value, constraint)
            }
        }

        return result
    }

    _validateExact(value, exact) {

        // Valid if the value is an exact match, both in type and value.

        let result = value === exact

        return result
    }

    _validateIsRequired(value) {

        // Is required, but zero is a valid value.

        let result = false

        if (value || value === 0) {

            result = true
        }

        return result
    }

    _validateList(value, list) {

        // Valid if the value exists in the list.

        let result = false

        for (let i = 0; i < list.length; i++) {

            if (list[i] === value) {

                result = true
                break
            }
        }

        return result
    }

    _validateRange(value, min, max) {

        // Check the value against a minimum and maximum range.

        let result = false

        value = parseFloat(value);
        result = (value >= min && value <= max)

        return result
    }

    _validateRegex(value, expression) {

        // Valid if the value matches the regular expression.

        let result = expression.test(value)

        return result
    }

    _validateWithCallback(value, callback) {

        // Execute a function to check the value.

        let result = callback(value)

        return result
    }
}

export { Validator }
export default Validator