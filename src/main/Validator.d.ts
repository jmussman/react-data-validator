// Validator.d.ts
// Copyright © 2018 Joel Mussman. All rights reserved.
//

import React, { Component, ReactNode } from 'react';

export interface ValidatorProps {

    className?: string;
    constraint: boolean | number | string | [] | object;
    isRequired?: boolean;
    notify?(): void;
    renderOnEmpty?: boolean;
    value: boolean | number | string | object;
}

export default class Validator extends Component<ValidatorProps> {

    constructor(props: ValidatorProps);
    render(): ReactNode;
}

declare interface CardNumberParsed {

    mii: string;
    iin_bin: string;
    account: string;
    checksum: string;
}

export function cardInfo(cardNumber: string): Promise<JSON>;
export function cardNumberParser(cardNumber: string): CardNumberParsed | null;
export function cardNumberValidator(cardNumber: string): boolean;