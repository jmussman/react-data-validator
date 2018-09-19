// propertyMessages.js
// Copyright © 2018 Joel Mussman. All rights reserved.
//

const originalConsoleError = console.error;

function throwPropertyMessages() {

    // Override the console error message so that if a prop type failure is noticed it will throw an error
    // that Jest will see. The original function is called so that the message still appears on the console.

    console.error = message => {

        if (/Failed prop type/.test(message)) {

            throw new Error(message)
        }

        originalConsoleError(message)
    }
}

function consumePropertyMessages() {

    // Consume the console error messages for a prop failure.

    console.error = message => {

        if (!/Failed prop type/.test(message)) {

            originalConsoleError(message)
        }            
    }
}

function resetPropertyMessages() {

    console.error = originalConsoleError
}

export { consumePropertyMessages, resetPropertyMessages, throwPropertyMessages }
