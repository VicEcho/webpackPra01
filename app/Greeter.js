// var config = require('./config.json');
// function hello() {
//     var greet = document.createElement('div');
//     greet.textContent = config.greetText;
//     return greet;
// }
// module.exports = hello;
import React from 'react';
import config from './config.json';
import style from './Greeter.css';

export default class Greeter extends React.Component {

    render() {
        return(
            <div className={style.root}>
                {config.greetText}
            </div>
        )
    }
}
