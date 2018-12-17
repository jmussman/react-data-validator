
<p align="center"><img src="logo.png" /></p>

---

This module was built to handle form field validation within the React paradigm.
The module provides a very simple Validator component that may be rendered as a child of any other component.
Validators validate data, not other elements, and may display a message and execute a callback if validation fails.

**Warning: How the notify function is used changed in version 2 of this module.**

### List of features

* May be used to validate any data, regardless of the source
* As a React component, validation takes place whenever the component is rendered
* May be used to render a message, and apply CSS
* Validation constraints may be values, ranges, lists, regular expressions, and functions
* The validator may force the value to exist and not be null (isRequired)
* Failed validation may invoke a callback function
* Validators may be placed anywhere: grouped at the top of a form, placed next to fields, etc.
* More than one validator may check the same data

### Demonstration Project

<a href="https://github.com/jmussman/react-data-validator-demo.git">Field Validator Demo Project</a>

### Code Demo

```javascript
<Validator
    className="validation"
    value={ this.state.password }
    isRequired={ true }
    constraint={ /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/ }
    notify={ () => this.valid = false }
    renderOnEmpty={ true }>
    Password does not meet constraints
</Validator>
```

Look to the code demo for a full example of using Validator within a form.

### Download, Installation, &amp; Use

```shell
$ npm i react-field-validator --save
```

```javascript
import Validator from 'react-data-validator'
import { Validator } from 'react-data-validator'
```

|Prop|Description|
|---|---|
|className|A CSS class or classes to apply to the message. The message appears in a &lt;span&gt; tag with this class or classes.|
|value:|The data to check. If an input field is validated, this should be the same prop or state value the field is bound to.| 
|isRequired|set to true if the value must exist. Zero is a legitimate value, null is not. The default value is false.|
|renderOnEmpty|Render the error message if the field is empty and does not pass validation. This allows empty fields to be marked as required instead of ignored. The default value is false.|
|constraint|A single constraint or a list of constraints to check. Each constraint is an absolute value, a list of absolute values, an object with a range of numbers as { min: 0, max: 9 }, a regular expression, or a callback function that receives the data and returns true or false.|
|notify|Optional: a callback function that will be executed after validation with true or false.|
|currentState|Optional: if set helps short-circuit the notify function, it will not be called if the validation state did not actually change.

Validators do not validate other components, they validate a piece of data.
That data may come from a prop or component state, most likely state.
Validators do not need to be adjacent to the input fields they are "validating," if they appear to be validating an
input field at all.
They can be grouped together at the top or the bottom of a view if desired.
They may also be duplicated, for instance putting one Validator in a group
at the top of the view, and another Validator for the same data adjacent to the input field being validated.
Multiple Validators in a form next to input fields may look something like this fragment from the demonstration project:

```javascript
<form onSubmit={ this.onSubmit } >

    <label>Name:</label>
        <input type="text" required={ true } value={ this.state.name }
            onChange={ (event) => this.setState( { name: event.target.value } ) } />

    <Validator className="validation"
        value={ this.state.name }
        isRequired={ true }
        currentState={ this.state.nameIsValid }
        notify={ this.setValidationState }
        renderOnEmpty={ true }>
        Required
    </Validator><br />

    <label>New Password:</label>
        <input type="password"
            onChange={ (event) => this.setState( { password: event.target.value } ) } />

    <Validator className="validation"
        value={ this.state.password }
        isRequired={ true }
        renderOnEmpty={ true }
        constraint={ /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/ }
        currentState={ this.state.passwordIsValid }
        notify={ this.setValidationState }>
        Password is not valid
    </Validator><br />

    <label></label>

    <input type="button" value="Post" disabled={ !this.state.valid } onClick={ this.alert } />&nbsp;
    <input type="submit" value="Submit" onClick={ this.alert } />
</form>
```

The *notify* callback is executed asynchronously, so it is safe to call *this.setState* from it.
The caveat is that calling setState always renders, even if the state did not change. Calling setState when the validation does not change will cause an infinite loop, and that could also happen if two validators validating the same data. Two validators for the same data could happen if you want a validation message list above the form, and messages alongside to the input fields.

Either check the new value returned to this function against the current state, or pass the current state as the *currentState* prop, or do both to to make sure.

How the parent component using Validator chooses to handle invalid data, or change the data before it is pushed somewhere, is strictly up to the parent component.

### Helpers

These helper functions may be imported from the package:

|Helper|Description|
|---|---|
|cardNumberValidator|This function uses the Luhn algorithm to verify that a cart number is a valid (but not necessarily real) card number, i.e. the checksum matches the digits. This function may be used as a constraint.|
|cardNumberParser|This function returns an object with the card information broken down: { mii, iin_bin, account, checksum }.|
|cardInfo|This asynchronous function reaches out to https://lookup.binlist.net and returns a JSON object with the card provider information.|

### Contributing

We are always looking for ways to make the module better. But remember: Keep it simple. Keep it minimal. Don't add every single feature just because you can, and a feature when a feature is required.

### Authors or Acknowledgments

* Joel Mussman

### License

This project is licensed under the MIT License.