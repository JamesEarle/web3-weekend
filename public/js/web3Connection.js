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
        button = document.getElementById("connect");
        button.onclick = async() => {
            //ethereum.request({ method: 'eth_requestAccounts' });
            await ethereum.request({ method: 'eth_requestAccounts' });
            console.log(ethereum.selectedAddress);
            button.textContent = ethereum.selectedAddress;

            App.processAssets(ethereum.selectedAddress);
        }
    },

    processAssets: async (address) => {
        const request = "https://api.opensea.io/api/v1/assets?owner=0x974A344968786201A5f2E282014098f1333aA73b";
        const response = await fetch(request);

        const myJson = await response.json();

        var imgContainer = document.getElementById('image-table');

        if (myJson.assets.length == 0) {
            // case when no NFTs yet
            // link to some places to buy NFTs
        }

        // Otherwise, create image
        for (var i = 0; i < myJson.assets.length; i++) {
            // Format with some CSS to be nice and uniform
            var img = document.createElement("img");
            img.className = "nft-image";
            img.src = myJson.assets[i].image_thumbnail_url;
            imgContainer.appendChild(img);
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