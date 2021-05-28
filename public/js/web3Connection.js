// const express = require("express");

App = {
    web3: null,
    web3Provider: null,
    contracts: {},

    init: () => {
        // Establish web3 connection
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            web3 = new Web3(window.ethereum);
        } else {
            console.log("Debug");
            App.web3Provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545")
            web3 = new Web3(App.web3Provider);
        }
    },

    bindEvents: () => {
        // Bind any web3 related events
        // elem = document.getElementById("connect")
        // elem.onclick = () => {
        //     alert("asd")
        // }
    }
}

window.onload = () => {
    App.init();
    // App.bindEvents();
}