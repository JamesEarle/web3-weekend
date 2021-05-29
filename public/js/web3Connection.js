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
        App.assets = myJson.assets; // make a k/v mapping?
        console.log(App.assets)

        // console.log(myJson.assets)
        if (myJson.assets.length == 0) {
            // case when no NFTs yet
            // link to some places to buy NFTs
        }

        App.processAssets(App.assets);
    },

    processAssets: (assets) => {
        var imageTable = document.getElementById('image-table');

        // Otherwise, create image
        for (let i = 0; i < assets.length; i++) {
            let asset = assets[i];
            
            let img = document.createElement("img");
            img.id = asset.id;
            img.className = "nft-image";
            img.src = asset.image_thumbnail_url;

            let a = document.createElement("a");
            a.href=`javascript:showStats(${asset.id})`
            a.append(img)

            imageTable.append(a)
        }
    }
}

function showStats(asset_id) {
    for (let i = 0; i < App.assets.length; i++) {
        let asset = App.assets[i];
        if (asset.id == asset_id) {
            console.log(asset.asset_contract.address)
            console.log(asset.id)
            console.log(asset.name)
            console.log(asset.description)
            console.log(asset.permalink)
        }
    }
}

window.onload = () => {
    // If a user has connected before, don't bother again
    App.init();
    App.bindEvents();
}