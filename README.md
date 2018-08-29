
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
|constraint|A single value, a list of values, an object with a range of numbers as { min: 0, max: 9 }, a regular expression, or a callback function. The function must return true or false.|
|notify|A callback function that will be executed only if the validation fails. Do not call setState from notify.|

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

The *notify* callback is executed synchronously while the validation is being performed, but validation is only performed when the Validator is rendered.
For that reason, *setState* may not be used in the notify callback.
Props are set for children when the parent is rendered, but before any children are rendered.
Because the values are set, changing a variable using *notify* called from one Validator that is the source of a prop for subsequent component will not change the original value of the prop that component will receive.

If sequential children depend on the validation state, then they have to be re-rendered after the validators have run.
An example of using this would be to diable a button because validation failed.
This can be handled by making the button dependent on a state value, but remember that *setState* cannot be called from within
the *notify* callback because it is called from *render.*
The solution is to have *notify* set a class instance variable to indicate the state of validation. Then update the component state later in the cycle using *componentDidMount* and *componentDidUpdate*.
Both events are necessary, the first happens after the initial creation and mount, and the second on every update.
Do this with care, because *setState* is simple and does not check to see if state has changed.
Calling *setState* within these two methods when the state has not changed will cause an infinite recursion.
Always check that the state actually changed before calling *setState.*
The state set in this method links back to the *Post* button in the previous example:

```javascript
componentDidUpdate() {

    if (this.valid !== this.state.valid) {

        this.setState({ valid: this.valid })
    }
}
```

How the parent component using Validator chooses to handle invalid data, or change the data before it is
pushed somewhere, is strictly up to the parent component.

### Contributing

We are always looking for ways to make the module better. But remember: Keep it simple. Keep it minimal. Don't add every single feature just because you can, and a feature when a feature is required.

### Authors or Acknowledgments

* Joel Mussman

### License

This project is licensed under the MIT License.