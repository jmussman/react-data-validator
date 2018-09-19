// cardNumberValidator.js
// Copyright © 2018 Joel Mussman. All rights reserved.
//
// Run the Luhn algorithm and make sure that the card number checksums.
//

function cardNumberValidator(cardNumber) {

    let evenOrOdd = (cardNumber.length - 2) % 2
    let sum = 0

    for (let i = cardNumber.length - 1; i >= 0; --i) {

        let number = parseInt(cardNumber.charAt(i), 10)

        if (i % 2 === evenOrOdd) {

            number *= 2

            if (number > 9) {

                number -= 9
            }
        }

        sum += number
    }

    return sum % 10 === 0
}

export default cardNumberValidator