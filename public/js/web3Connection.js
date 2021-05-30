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
        let link = document.getElementById("connect-link");
        let addr = document.getElementById("address");

        ethereum.on("accountsChanged", (accounts) => {
            // Reconnect and reload NFT data for account address
            console.log("Change accounts event fired");
            console.log(accounts);
            localStorage.clear();
            ethereum.selectedAddress = null;
            addr.textContent = "";

            // Get rid of any loaded NFT data from a different address
            let imageTable = document.getElementById('image-list');
            if (imageTable) imageTable.innerHTML = "";
        });

        if (localStorage["address"]) {
            console.log("Address read through localStorage")
            console.log(`${localStorage["address"]}`)
            addr.textContent = localStorage["address"];
            App.makeRequest(localStorage["address"]);
        } else {
            link.onclick = async () => {
                console.log("click");
                ethereum.selectedAddress = await ethereum.request({ method: 'eth_requestAccounts' });
                console.log(ethereum.selectedAddress);

                // Show address visually
                localStorage["address"] = ethereum.selectedAddress
                addr.textContent = ethereum.selectedAddress;
                App.makeRequest(ethereum.selectedAddress);
            }
        }

        fetchModelsbutton = document.getElementById("fetchModels");
        fetchModelsbutton.onclick = async () => {
            dropshipConnection();
        }
    },

    makeRequest: async (address) => {
        const request = `https://api.opensea.io/api/v1/assets?owner=${address}`;
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
        var imageList = document.getElementById('image-list');

        // Otherwise, create image
        for (let i = 0; i < assets.length; i++) {
            let asset = assets[i];

            let img = document.createElement("img");
            img.id = asset.id;
            img.className = "nft-image";
            img.src = asset.image_thumbnail_url;

            let a = document.createElement("a");
            a.href = `javascript:showStats(${asset.id})`;
            a.append(img)

            imageList.appendChild(a) // error
        }
    }
}

function dropshipConnection() {
    var myHeaders = new Headers();
    // unencoded key ucdk02c6-xwgi-nb71:ej2m-nde0nv3zbnp1
    myHeaders.append("Authorization", "Basic dWNkazAyYzYteHdnaS1uYjcxOmVqMm0tbmRlMG52M3pibnAx");
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    myHeaders.append("Cookie", "__cf_bm=5172949d9e4beb3484d32203bdd3fb6b57f40310-1622329543-1800-AVyYnMmjiseFvG1zqMf0KDhKcIZx4cdL2LQgWfv/FJ4h/GI+1CH9Q2jyaX7d6yRAVye5LcEDrCNk/SH52hNl+VY=");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://api.printful.com/store/products", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    // const prodJson = prodResponse.body;
    // console.log(prodJson);
}

function showStats(asset_id) {
    let infoTable = document.getElementById("nft-stats")
    let nftUrl = "";
    for (let i = 0; i < App.assets.length; i++) {
        let asset = App.assets[i];
        if (asset.id == asset_id) {
            let address = document.getElementById("contract-address")
            address.textContent = asset.asset_contract.address;

            let assetId = document.getElementById("asset-id")
            assetId.textContent = asset.id;

            let assetName = document.getElementById("asset-name")
            assetName.textContent = asset.name;

            let description = document.getElementById("asset-description")
            description.textContent = asset.description;

            let permalink = document.getElementById("permalink")
            permalink.textContent = asset.permalink;

            // Set in preview
            nftUrl = asset.image_thumbnail_url;

            let tshirt = document.getElementById("tshirt-preview");
            tshirt.src = nftUrl;
            tshirt.srcset = nftUrl;

            let hoodie = document.getElementById("hoodie-preview");
            hoodie.src = nftUrl;
            hoodie.srcset = nftUrl;
        }
    }
    infoTable.style.display = "block";
}

window.onload = () => {
    // If a user has connected before, don't bother again
    App.init();
    App.bindEvents();
}