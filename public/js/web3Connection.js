App = {
    web3: null,
    web3Provider: null,
    assets: null,

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

            App.makeRequest(ethereum.selectedAddress);
        }
    },

    makeRequest: async (address) => {
        const request = "https://api.opensea.io/api/v1/assets?owner=0x974A344968786201A5f2E282014098f1333aA73b";
        const response = await fetch(request);

        const myJson = await response.json();

        // console.log(myJson.assets)
        if (myJson.assets.length == 0) {
            // case when no NFTs yet
            // link to some places to buy NFTs
        }

        App.processAssets(myJson.assets);
    },

    processAssets: (assets) => {
        var imageTable = document.getElementById('image-table');

        // Otherwise, create image
        for (let i = 0; i < assets.length; i++) {
            let asset = assets[i];
            
            let img = document.createElement("img");
            img.id = asset.token_id;
            img.className = "nft-image";
            img.src = asset.image_thumbnail_url;

            let a = document.createElement("a");
            a.href="/"
            a.appendChild(img)
            
            let span = document.createElement("span")
            span.textContent = asset.name;

            let div = document.createElement("div")
            div.appendChild(a)
            div.appendChild(span)

            imageTable.appendChild(div);
        }
    }
}

async function getAccount(){
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    console.log(accounts[0]);
}

window.onload = () => {
    // If a user has connected before, don't bother again
    App.init();
    App.bindEvents();
}