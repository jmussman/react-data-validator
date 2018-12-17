// Validator.js
// Copyright © 2018 Joel Mussman. All rights reserved.
//
// <Validator className='' value={} constraint={} notify={} renderOnEmpty={}>message</Validator>
//

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import cardInfo from './cardInfo'
import cardNumberParser from './cardNumberParser'
import cardNumberValidator from './cardNumberValidator'
import validate from './validate'
import validateIsRequired from './validateIsRequired'

class Validator extends Component {

    static get defaultProps() {

        // This acts as a class property defining the default values for the props.

        return {
            
            className: '',
            isRequired: false,
            renderOnEmpty: false
        }
    }

    static get propTypes() {

        // This acts as a class property defining the expected properties. isRequired is our
        // own property, and is not itself required.

        return {

            className: PropTypes.string,
            constraint: PropTypes.oneOfType( [
                PropTypes.bool,
                PropTypes.number,
                PropTypes.string,
                PropTypes.array,
                PropTypes.object,
                PropTypes.func,
                PropTypes.arrayOf( PropTypes.oneOfType( [
                    PropTypes.bool,
                    PropTypes.number,
                    PropTypes.string,
                    PropTypes.array,
                    PropTypes.object,
                    PropTypes.func
                ]))
            ]).isRequired,
            currentState: PropTypes.bool,
            isRequired: PropTypes.bool,
            notify: PropTypes.func,
            renderOnEmpty: PropTypes.bool,
            value: PropTypes.oneOfType( [
                PropTypes.bool,
                PropTypes.number,
                PropTypes.string,
                PropTypes.object
            ]).isRequired
        }
    }

    render() {

        // Perform validation and notify whoever is listening about the results on failure.

        const valid = validate(this.props.isRequired, this.props.value, this.props.constraint)

        if ((typeof this.props.currentState == 'undefined' || valid != this.props.currentState) && this.props.notify) {

            // Push the notification into the event queue so that it runs after render,
            // allowing setState to be used in the callback.

            setTimeout(() => this.props.notify(valid), 0)
        }
        
        // Render failed validation message (the children). The validation message is tricky: the value may be required and invalid, but if
        // it is empty and renderOnEmpty is true, then the message is not rendered.

        let rendered = null;

        if (this.props.children && !valid && (!this.props.isRequired || this.props.renderOnEmpty || validateIsRequired(this.props.value))) {

            rendered = <span className={ this.props.className }>{ this.props.children }</span>
        }

        return rendered
    }
}

export { Validator, cardInfo, cardNumberParser, cardNumberValidator }
export default Validator