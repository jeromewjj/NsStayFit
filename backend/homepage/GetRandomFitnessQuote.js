import { Component } from "react/cjs/react.production.min";

export default class FitnessQuote extends Component {

    getRandomFitnessQuoteAuthor = () => {
        const quotes = require('../../data/homepage/fitnessQuotes.json');
        var quoteSize = Object.keys(quotes).length;
        var RandomNumber = Math.floor(Math.random() * quoteSize -1) + 0;

        // console.log(quotes[RandomNumber]);
        
        return [quotes[RandomNumber]["text"], quotes[RandomNumber]["author"]];
    }

    testRandomFitnessQuote = () => {
        console.log("")
    }
}
