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
            console.log("Please install Metamask");
            App.web3Provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545")
            web3 = new Web3(App.web3Provider);
        }
    },

    bindEvents: () => {
        // Bind any web3 related events
        elem = document.getElementById("connect");
        elem.onclick = async() => {
            //ethereum.request({ method: 'eth_requestAccounts' });
            await ethereum.request({ method: 'eth_requestAccounts' });
            console.log(ethereum.selectedAddress);
            elem.textContent = ethereum.selectedAddress;
            //const apiRequest = "https://api.opensea.io/api/v1/assets?owner=" + ethereum.selectedAddress;
            const apiRequest = "https://api.opensea.io/api/v1/assets?owner=0x974A344968786201A5f2E282014098f1333aA73b";
            const response = await fetch(apiRequest);
            const myJson = await response.json();
            console.log(myJson);
            var imageContainer = document.getElementById('image-container');
            for (var i = 0; i<myJson.assets.length; i++){
                var elemImage = document.createElement("IMG");
                elemImage.src = myJson.assets[i].image_thumbnail_url;
                imageContainer.appendChild(elemImage);
            }
        }
    }

}

async function getAccount(){
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    console.log(accounts[0]);
}

window.onload = () => {
    App.init();
    App.bindEvents();
}