[//]: # (README.md)
[//]: # (Copyright © 2018 Joel Mussman. All rights reserved.)

<p align="center"><img src="logo.png" /></p>

---

This module was built to handle form field validation within the React paradigm.
The module provides a very simple Validator component that may be rendered as a child of any other component.
Validators validate data, not other elements, and may display a message and execute a callback if validation fails.

### List of features

* May be used to validate any data, regardless of the source
* As a React component, validation takes place whenever the component is rendered
* May be used to render a message, and apply CSS
* Validation constraints may be values, ranges, lists, regular expressions, and functions
* The validator may force the value to exist and not be null or an empty string or array (isRequired)
* Failed validation may invoke a callback function
* Validators may be placed anywhere: grouped at the top of a form, placed next to fields, etc.
* More than one validator may check the same data

The Validator is intentionally set up so that failure on a required value does not render a message by default.
This is so the notify callback may be used to change the visual appearance of an input field (maybe putting a red
box around it), but not show a message detailing a more complex constraint that may have been missed.
Use renderOnEmpty to turn off this feature.

Version 1.1 includes a full suite of unit and integration tests under Jest.
Adding these was a good idea, they exposed several bugs.
We should have started with TDD!

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
|value:|The data to check. If an input field is validated, this should be the same prop or state value the field is bound to. This may be a boolean, a number, a string, or an object reference. *value* is required| 
|isRequired|set to true if the value must exist. Zero is a legitimate value, null is not. The default value is false.|
|renderOnEmpty|Render the error message if the field is empty and does not pass validation. This allows empty fields to be marked as required instead of ignored, but does not show a message. The default value is false.|
|constraint|A single value, a list of values, an object with a range of numbers as { min: 0, max: 9 }, a regular expression, or a callback function. The function must return true or false. If the *constraint* is an object references are checked. *constraint* is required.|
|notify|A callback function that will be executed only if the validation fails. The *notify* callback is executed asynchronously after the validation is performed, by scheduling through the event queue immediately using setTimeout. It is safe to call setState from the *notify* callback.|

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
        notify={ this.setInvalid }
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
        notify={ this.setInvalid }>
        Password is not valid
    </Validator><br />

    <label></label>

    <input type="button" value="Post" disabled={ !this.state.valid } onClick={ this.alert } />&nbsp;
    <input type="submit" value="Submit" onClick={ this.alert } />
</form>
```

How the parent component using Validator chooses to handle invalid data, or change the data before it is
pushed somewhere, is strictly up to the parent component.

### Contributing

We are always looking for ways to make the module better. But remember: Keep it simple. Keep it minimal. Don't add every single feature just because you can, and a feature when a feature is required.

### Authors or Acknowledgments

* Joel Mussman

### License

This project is licensed under the MIT License.