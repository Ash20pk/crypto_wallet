console.log('Script started'); // Debug: Check if script is loaded at all

document.addEventListener("DOMContentLoaded", function() {
    console.log('DOMContentLoaded fired'); // Debug: Check if event fires
    
    // Debug: Log all important elements at startup
    console.log('Initial elements check:', {
        settingsIcon: document.getElementById('settings_menu_icon'),
        settingsMenu: document.getElementById('settings_menu'),
        headerMenu: document.querySelector('.header_menu')
    });

    // Your existing event listeners
    document.getElementById("userAddress").addEventListener("click", copyAddress);
    document.getElementById("transferFund").addEventListener("click", handler);
    document.getElementById("header_network").addEventListener("click", getOpenNetwork);
    
    // ... (keep all your existing event listeners) ...

    // Debug: Add test click handler to document
    document.addEventListener('click', function(e) {
        console.log('Click detected on:', {
            element: e.target,
            tagName: e.target.tagName,
            id: e.target.id,
            parent: e.target.parentElement
        });
    });

    // Your existing settings icon code with added debugging
    const settingsIcon = document.getElementById('settings_menu_icon');
    console.log('Settings icon element:', settingsIcon);

    if (settingsIcon) {
        console.log('Adding click listener to settings icon');
        settingsIcon.addEventListener('click', function(e) {
            console.log('Settings icon clicked!', {
                target: e.target,
                currentTarget: e.currentTarget
            });
            e.preventDefault();
            e.stopPropagation();
            openDropdownMenu();
        });

        // Debug: Add mouseover listener
        settingsIcon.addEventListener('mouseover', function() {
            console.log('Mouse over settings icon');
        });
    } else {
        console.error('Settings icon not found');
    }

    // Your existing document click handler with debug
    document.addEventListener('click', function(e) {
        const menu = document.getElementById('settings_menu');
        const icon = document.getElementById('settings_menu_icon');
        console.log('Document click:', {
            target: e.target,
            menuContains: menu ? menu.contains(e.target) : false,
            iconContains: icon ? icon.contains(e.target) : false
        });
        if (!menu.contains(e.target) && !icon.contains(e.target)) {
            menu.style.display = 'none';
        }
    });

    // Your existing openDropdownMenu function with debug
    function openDropdownMenu() {
        console.log('openDropdownMenu called');
        const menuElement = document.getElementById("settings_menu");
        console.log('Menu element:', menuElement);
        console.log('Current display:', menuElement.style.display);
        
        if (menuElement.style.display === "block") {
            menuElement.style.display = "none";
        } else {
            menuElement.style.display = "block";
        }
        console.log('New display:', menuElement.style.display);
    }

    // Fix the close button handler
    const closeBtn = document.getElementById("close_network");
    if (closeBtn) {
        console.log('Close button found, adding listener');
        closeBtn.addEventListener("click", function(e) {
            console.log('Close button clicked');
            e.preventDefault();
            e.stopPropagation();
            
            // Directly manipulate the display properties
            document.getElementById("network").style.display = "none";
            document.getElementById("userAddress").style.display = "block";
            
            console.log('Network display:', document.getElementById("network").style.display);
            console.log('UserAddress display:', document.getElementById("userAddress").style.display);
        });
    } else {
        console.error('Close button not found');
    }

    // Update network item click handler
    const networkList = document.getElementById("network_item");
    if (networkList) {
        console.log('Network list found, adding listeners');
        networkList.addEventListener("click", function(e) {
            console.log('Network item clicked:', e.target);
            
            // Find the closest network_item parent or the element itself
            const networkItem = e.target.closest('.network_item') || e.target;
            
            // Get the span text regardless of what was clicked
            const span = networkItem.querySelector('span');
            if (span) {
                console.log('Network text found:', span.textContent);
                
                // Create a new event with the correct target
                const newEvent = {
                    target: networkItem,
                    preventDefault: () => {},
                    stopPropagation: () => {}
                };
                
                getSelectedNetwork(newEvent);
            } else {
                console.log('No span found in network item');
            }
        });
    } else {
        console.error('Network list not found');
    }

    // Fix the send button click handler
    const transferButton = document.getElementById("open_Transfer");
    if (transferButton) {
        console.log('Transfer button found');
        
        // Add click handler to both the div and its child image
        transferButton.addEventListener("click", function(e) {
            console.log('Transfer button clicked');
            e.preventDefault();
            e.stopPropagation();
            openTransfer();
        });

        // Also handle clicks on the image
        const transferImage = transferButton.querySelector('.home_features_img');
        if (transferImage) {
            transferImage.addEventListener("click", function(e) {
                console.log('Transfer image clicked');
                e.preventDefault();
                e.stopPropagation();
                openTransfer();
            });
        }
    } else {
        console.error('Transfer button not found');
    }

    // Fix back button handler
    const backBtn = document.getElementById("goBack");
    if (backBtn) {
        console.log('Back button found');
        backBtn.addEventListener("click", function(e) {
            console.log('Back button clicked');
            e.preventDefault();
            e.stopPropagation();
            goBack();
        });
    } else {
        console.error('Back button not found');
    }
});

// Keep all your existing code below this point
let POLYGON = "https://rpc.ankr.com/polygon";
let POLYGON_AMOY = "https://rpc.ankr.com/polygon_amoy";
let ETHEREUM = "https://rpc.ankr.com/eth";
let SEPOLIA_TEST = "https://rpc.ankr.com/eth_sepolia";
let BNB_Smart_chain = "https://rpc.ankr.com/bsc";

let providerURL = "https://rpc.ankr.com/eth";

let privateKey;
let address;

let allToken = 
[
  {
    name: "MATIC",
    address: "0x0000000000000000000000000000000000001010",
    symbol: "MATIC",
  }
];

//_______________________________________________________________________________________________________________________________________

let Activity_History = ()=>
{
  let str = localStorage.getItem("userWallet");
  let parsedObj = JSON.parse(str);
  let connect_account_address = parsedObj.address;

  fetch("http://localhost:3000/api/v1/transactions/")
  .then((response) => response.json())
  .then((data) => 
  {

      let transactions = data.data.Transaction_;

      if (!Array.isArray(transactions)) 
      {
          throw new Error("Expected an array but got: " + typeof transactions);
      }

      let activityContainer = document.getElementById("activity");
      activityContainer.innerHTML = ''; // Clear any existing content


      let filteredTransactions = transactions.filter(transaction =>    // Filter transactions by the given address
      {  
          return(
                  transaction.Network.toLowerCase() == providerURL.toLowerCase() 
                  && ( 
                          transaction.Sender_address.toLowerCase() === address.toLowerCase() 
                        || transaction.Receiver_address.toLowerCase() === address.toLowerCase() 
                       )
                    );
      });
      
      filteredTransactions.forEach(transaction => // Display each transaction dynamically
      {
          let j =" ";
          if     (transaction.Network == POLYGON)          {j = `https://polygonscan.com/tx/${transaction.Hash}`;}
          else if(transaction.Network == POLYGON_AMOY)     {j = `https://amoy.polygonscan.com/tx/${transaction.Hash}`;}
          else if(transaction.Network == ETHEREUM)         {j = `https://etherscan.io/tx/${transaction.Hash}`;}
          else if(transaction.Network == SEPOLIA_TEST)     {j = `https://sepolia.etherscan.io//tx/${transaction.Hash}`;}
          else if(transaction.Network == BNB_Smart_chain)  {j = `https://bscscan.com/tx/${transaction.Hash}`;}
            
          let transactionElement = document.createElement('div');
          transactionElement.classList.add('assets_item');

          transactionElement.innerHTML = `
                                            <img class="assets_item_img" src="./assets/link1.png" alt="Transaction Image" />
                                            <span>${transaction.Sender_address.toLowerCase() === address.toLowerCase() ? "Sent" : "Received"} </span>
                                            <span>${transaction.amount} tokens</span>
                                        `;
        
          let imgElement = transactionElement.querySelector('.assets_item_img'); // Add click event to the image
          imgElement.onclick = () => 
          {
              window.open(j, '_blank'); // Open the URL in a new tab
          };
          activityContainer.appendChild(transactionElement);
      });

      // Handle cases where no transactions are found
      if (filteredTransactions.length === 0) 
      {
          activityContainer.innerHTML = '<p>No transactions found for this address.</p>';
      }
      document.getElementById("activity").style.display = "block";
      document.getElementById("assets").style.display = "none";

  })
  .catch((error) => {
      console.error('Error fetching transactions:', error);
  });
}

//_______________________________________________________________________________________________________________________________________

function handler() 
{
    document.getElementById("transfer_center").style.display = "flex";
  
    let amount = document.getElementById("amount").value;
    let address = document.getElementById("address").value;
    let provider = new ethers.providers.JsonRpcProvider(providerURL);
  
    // console.log("privateKey= ",privateKey);
    let wallet = new ethers.Wallet(privateKey, provider);
  
    let tx = 
    {
      to: address,
      value: ethers.utils.parseEther(amount),
      gasLimit: ethers.utils.hexlify(21000), 
    };
  
    var a = document.getElementById("link");
    a.href = "somelink url";
  
    wallet.sendTransaction(tx).then((txObj) => 
    {
        // console.log("txHash", txObj.hash);
        document.getElementById("transfer_center").style.display = "none";
        let a = document.getElementById("link");
    
        if     (providerURL == POLYGON)          {a.href = `https://polygonscan.com/tx/${txObj.hash}`;}
        else if(providerURL == POLYGON_AMOY)     {a.href = `https://amoy.polygonscan.com/tx/${txObj.hash}`;}
        else if(providerURL == ETHEREUM)         {a.href = `https://etherscan.io/tx/${txObj.hash}`;}
        else if(providerURL == SEPOLIA_TEST)     {a.href = `https://sepolia.etherscan.io/tx/${txObj.hash}`;}
        else if(providerURL == BNB_Smart_chain)  {a.href = `https://bscscan.com/tx${txObj.hash}`;}
    
        document.getElementById("link").style.display = "block";
    
        let url = "http://localhost:3000/api/v1/transactions/log";
        // console.log("providerurl==",providerURL)
        let data = 
        {
            Sender_address   : wallet.address,
            Receiver_address : address,
            amount           : amount ,
            Network          : providerURL,
            Hash             : txObj.hash
        };
        // console.log("amount type=",typeof(amount));
        // console.log("data=",data,)
        // console.log(providerURL);
    
        fetch(url, 
        {
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((result) => 
        {
            // console.log("sendTransaction",result);
            window.location.reload();
        });
    });
}

//_______________________________________________________________________________________________________________________________________

function checkBlance(address) 
{
    let provider = new ethers.providers.JsonRpcProvider(providerURL);
    provider.getBalance(address).then((balance) => 
    {
        let balanceInEth = ethers.utils.formatEther(balance);
  
        let symbol = "symbol";
        if     (providerURL == POLYGON)               {symbol = "POL";}
        else if(providerURL == POLYGON_AMOY)          {symbol = "POL";}
        else if(providerURL == ETHEREUM)              {symbol = "ETH";}
        else if(providerURL == SEPOLIA_TEST)          {symbol = "SepoliaETH";}
        else if(providerURL == BNB_Smart_chain)       {symbol = "BNB";}
        else                                          {symbol = "symbol";}
  
        document.getElementById("accountBlance").innerHTML = `${balanceInEth} ${symbol}`;
        document.getElementById("userAddress").innerHTML = `${address.slice(0,6)}...${address.slice(36,42)}`;
    });
}

//_______________________________________________________________________________________________________________________________________

function getOpenNetwork() 
{
    let networkElement = document.getElementById("network");
    // Toggle the display
    if (networkElement.style.display === "block") {
        networkElement.style.display = "none";
        document.getElementById("userAddress").style.display = "block";
    } else {
        networkElement.style.display = "block";
        document.getElementById("userAddress").style.display = "none";
    }
}

function openDropdownMenu() 
{
    let menuElement = document.getElementById("settings_menu");
    // Toggle the display
    if (menuElement.style.display === "block") {
        menuElement.style.display = "none";
    } else {
        menuElement.style.display = "block";
    }
}

//_______________________________________________________________________________________________________________________________________
  
function getSelectedNetwork(e) {
    console.log('getSelectedNetwork called', e.target);
    
    // Get the network item text, handling clicks on either the p element or its children
    let networkText;
    const targetElement = e.target;
    
    // Try to find the text content in this order:
    // 1. Direct span content
    // 2. Parent network_item's span content
    // 3. Direct text content if it's a span
    const span = targetElement.querySelector('span') || 
                targetElement.closest('.network_item')?.querySelector('span') ||
                (targetElement.tagName === 'SPAN' ? targetElement : null);

    if (span) {
        networkText = span.textContent.trim();
        console.log('Found network text:', networkText);
    } else {
        console.log('No network text found');
        return;
    }

    let element = document.getElementById("selected_network");
    if (element) {
        element.innerHTML = networkText;
    }

    // Update provider URL based on selection
    switch (networkText) {
        case "Ethereum Mainnet":
            providerURL = ETHEREUM;
            localStorage.setItem("ACTIVE_NETWORK", "Ethereum Mainnet");
            break;
        case "Polygon Mainnet":
            providerURL = POLYGON;
            localStorage.setItem("ACTIVE_NETWORK", "Polygon Mainnet");
            break;
        case "Polygon Amoy":
            providerURL = POLYGON_AMOY;
            localStorage.setItem("ACTIVE_NETWORK", "Polygon Amoy");
            break;
        case "Sepolia test network":
            providerURL = SEPOLIA_TEST;
            localStorage.setItem("ACTIVE_NETWORK", "Sepolia test network");
            break;
        case "BNB Smart Chain":
            providerURL = BNB_Smart_chain;
            localStorage.setItem("ACTIVE_NETWORK", "BNB Smart Chain");
            break;
        default:
            console.log('Unknown network:', networkText);
            return;
    }

    // Hide network selector and show address
    const networkElement = document.getElementById("network");
    const userAddressElement = document.getElementById("userAddress");
    
    if (networkElement) networkElement.style.display = "none";
    if (userAddressElement) userAddressElement.style.display = "block";

    // Update balance
    let str = localStorage.getItem("userWallet");
    let parsedObj = JSON.parse(str);
    if (parsedObj?.address) {
        checkBlance(parsedObj.address);
    }
    
    myFunction();
}
  

//_______________________________________________________________________________________________________________________________________
    
function loginUser() {
    document.getElementById("createAccount").style.display = "none";
    document.getElementById("LoginUser").style.display = "block";
}
  
function createUser() {
    document.getElementById("createAccount").style.display = "block";
    document.getElementById("LoginUser").style.display = "none";
}
  
function openCreate() {
    document.getElementById("createAccount").style.display = "none";
    document.getElementById("create_popUp").style.display = "block";
}
  
function signUp() {
    let name = document.getElementById("sign_up_name").value;
    let email = document.getElementById("sign_up_email").value;
    let password = document.getElementById("sign_up_password").value;
    let passwordConfirm = document.getElementById(
      "sign_up_passwordConfirm"
    ).value;
    document.getElementById("field").style.display = "none";
    document.getElementById("center").style.display = "block";
    // console.log(name, email, password, passwordConfirm);
  
    let wallet = ethers.Wallet.createRandom();
  
    if (wallet.address) {
      console.log("address:", wallet.address);
      console.log("mnemonic:", wallet.mnemonic.phrase);
      console.log("privateKey:", wallet.privateKey);
      //API CALL
      let url = "http://localhost:3000/api/v1/user/signup";
      let data = {
        name: name,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm, 
        address: wallet.address,
        private_key: wallet.privateKey,
        mnemonic: wallet.mnemonic.phrase,
      };
  
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          document.getElementById("createdAddress").innerHTML = wallet.address;
          document.getElementById("createdPrivateKey").innerHTML =
            wallet.privateKey;
          document.getElementById("createdMnmonic").innerHTML =
            wallet.mnemonic.phrase;
          document.getElementById("center").style.display = "none";
          document.getElementById("accountData").style.display = "block";
          document.getElementById("sign_up").style.display = "none";
  
          let userWallet = {
            address: wallet.address,
            private_key: wallet.privateKey,
            mnemonic: wallet.mnemonic.phrase,
          };
          let jsonObj = JSON.stringify(userWallet);
          localStorage.setItem("userWallet", jsonObj);
          document.getElementById("goHomePage").style.display = "block";
  
          window.location.reload();
        })
        .catch((error) => {
          // Handle any errors
          console.error("Error:", error);
        });
      //END OF API CALL
    }
}
  
function login() {
    document.getElementById("login_form").style.display = "none";
    document.getElementById("center").style.display = "block";
    let email = document.getElementById("login_email").value;
    let password = document.getElementById("login_password").value;
  
    //API CALL
    let url = "http://localhost:3000/api/v1/user/login";
    let data = {
      email: email,
      password: password,
    };
  
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        // Handle the response data
        console.log(result.data.user);
        let userWallet = {
          address: result.data.user.address,
          private_key: result.data.user.private_key,
          mnemonic: result.data.user.mnemonic,
        };
        let jsonObj = JSON.stringify(userWallet);
        localStorage.setItem("userWallet", jsonObj);
        window.location.reload();
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error:", error);
      });
    //END OF API CALL
}
  
//_______________________________________________________________________________________________________________________________________
function logout() 
{
    localStorage.removeItem("userWallet");
    window.location.reload();
}
//_______________________________________________________________________________________________________________________________________  
function openTransfer() 
{
    console.log('openTransfer called');
    const transferForm = document.getElementById("transfer_form");
    const home = document.getElementById("home");
    
    if (transferForm && home) {
        console.log('Showing transfer form, hiding home');
        transferForm.style.display = "block";
        home.style.display = "none";
    } else {
        console.error('Transfer form or home element not found');
    }
}
//_______________________________________________________________________________________________________________________________________  
function goBack() {
    console.log('goBack called');
    const transferForm = document.getElementById("transfer_form");
    const home = document.getElementById("home");
    
    if (transferForm && home) {
        console.log('Hiding transfer form, showing home');
        transferForm.style.display = "none";
        home.style.display = "block";
        
        // Clear the form fields
        document.getElementById("amount").value = "";
        document.getElementById("address").value = "";
        document.getElementById("link").style.display = "none";
    } else {
        console.error('Transfer form or home element not found');
    }
}
//_______________________________________________________________________________________________________________________________________  
function openImport() 
{
    document.getElementById("import_token").style.display = "block";
    document.getElementById("home").style.display = "none";
}
//_______________________________________________________________________________________________________________________________________  
function importGoBack() 
{
    document.getElementById("import_token").style.display = "none";
    document.getElementById("home").style.display = "block";
}
//_______________________________________________________________________________________________________________________________________  
function openActivity() 
{
    document.getElementById("activity").style.display = "block";
    document.getElementById("assets").style.display = "none";
}
//_______________________________________________________________________________________________________________________________________  
function openAssets() 
{
    document.getElementById("activity").style.display = "none";
    document.getElementById("assets").style.display = "block";
}
//_______________________________________________________________________________________________________________________________________
function goHomePage() 
{
    document.getElementById("create_popUp").style.display = "none";
    document.getElementById("home").style.display = "block";
}
//_______________________________________________________________________________________________________________________________________  
function openImportModel() 
{
    document.getElementById("import_account").style.display = "block";
    document.getElementById("home").style.display = "none";
}
//_______________________________________________________________________________________________________________________________________
function closeImportModel() 
{
    document.getElementById("import_account").style.display = "none";
    document.getElementById("home").style.display = "block";
}
//_______________________________________________________________________________________________________________________________________
function addToken() 
{
  let address = document.getElementById("token_address").value;
  let name = document.getElementById("token_name").value;
  let symbol = document.getElementById("token_symbol").value;
  let str = localStorage.getItem("userWallet");
  let parsedObj = JSON.parse(str);
  
  let url = "http://localhost:3000/api/v1/tokens/createtoken";
  let data = 
  {
    name              : name,
    address           : address,
    symbol            : symbol,
    provider          :providerURL,
    connected_account :parsedObj.address
  };

  fetch(url, 
  {
      method: "POST",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify(data),
  })
  .then((response) => response.json())
  .then((result) => 
  {
        // Handle the response data
        console.log(result.data.createToken);
        window.location.reload();
  })
  .catch((error) => 
    {
        console.error("Error:", error);
    });
  //END OF API CALL
}

//_______________________________________________________________________________________________________________________________________
  
function addAcount() 
{
    let privateKey = document.getElementById("add_account_private_key").value;
    let provider = new ethers.providers.JsonRpcProvider(providerURL);
    let wallet = new ethers.Wallet(privateKey, provider);
    // console.log(wallet.address);
  
    //API CALL
    let url = "http://localhost:3000/api/v1/account/createaccount";
    let data = 
    {
        privateKey: privateKey,
        address   : wallet.address,
    };
  
    fetch(url, 
    {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((result) => 
    {
        console.log(result);
        closeImportModel();
        // window.location.reload();
    })
    .catch((error) => {
        // Handle any errors
        console.error("Error:", error);
    });
    //END OF API CALL
}
  
//_______________________________________________________________________________________________________________________________________
    
let fetchTokenBalance = async(tokenAddress,accountAddress) =>
{
    try 
    {
        let provider = new ethers.providers.JsonRpcProvider(providerURL);
        let ERC20_ABI = 
        [
          "function balanceOf(address account) view returns (uint256)",
          "function decimals() view returns (uint8)"
        ];
      
        let tokenContract = new ethers.Contract(tokenAddress,ERC20_ABI ,provider);
      
        // Fetch the token balance
        let balance = await tokenContract.balanceOf(accountAddress)
        let decimals = await tokenContract.decimals();
        let humanReadableBalance = ethers.utils.formatUnits(balance, decimals);
      
        // console.log(`Token Balance: ${humanReadableBalance}`);
        return humanReadableBalance;
    } 
    catch (error) 
    {
      console.error("Error fetching token balance:", error);
      return 0;
    }
}
    
//_______________________________________________________________________________________________________________________________________
    
async function myFunction() 
{
    let str = localStorage.getItem("userWallet");
    let parsedObj = JSON.parse(str);
    // console.log(parsedObj);
  
    if (parsedObj?.address) 
    {
        document.getElementById("LoginUser").style.display = "none";
        document.getElementById("home").style.display = "block";
        privateKey = parsedObj.private_key;
        address = parsedObj.address;
        checkBlance(parsedObj.address);
    }
  
    let tokenRender = document.querySelector(".assets");
    let accountRender = document.querySelector(".accountList");
    tokenRender.innerHTML ="";
  
    try 
    {
      // Fetch all tokens
      let tokenResponse = await fetch("http://localhost:3000/api/v1/tokens/alltoken");
      let tokenData = await tokenResponse.json();
      let tokens = tokenData.data.tokens;
  
      if (!Array.isArray(tokens)) 
      {
          throw new Error("Expected an array but got: " + typeof tokens);
      }
  
      let filteredAsset = tokens.filter(i => 
      {
          return (i.provider.toLowerCase() == providerURL.toLowerCase() )
      });
      // console.log("filteredAsset",filteredAsset);

      if (filteredAsset.length == 0) 
      {
          console.log("No matching Assets found for this address.");
          tokenRender.innerHTML = '<p>No Assets found for this address.</p>';
      }

      if(filteredAsset.length != 0)
      {
          let tokenElements = "";
          for (let token of filteredAsset) 
          {
              let balance = await fetchTokenBalance(token.address, parsedObj.address); //connected_account
              console.log("fetchTokenBalance", balance);
        
              tokenElements += `
                <div class="assets_item">
                  <img class="assets_item_img" src="./assets/metaschool_icon.png" alt=""/>
                  <span>${balance}</span>
                  <span>${token.symbol}</span>
                </div>
              `;
          }
          tokenRender.innerHTML = tokenElements;
      }
  
    } 
    catch (error) 
    {
      console.error("Error fetching tokens:", error);
    }

    try 
    {
      // Fetch all accounts
      let accountResponse = await fetch("http://localhost:3000/api/v1/account/allaccount");
      let accountData = await accountResponse.json();
  
      let accounts = "";
      accountData.data.accounts.map((account, i) => 
      {
        accounts += `
          <div class="lists">
            <p>${i + 1}</p>
            <p class="accountValue" data-address="${account.address}" data-privateKey="${account.privateKey}">
            ${address.slice(0,6)}...${address.slice(36,42)}
            </p>
          </div>
        `;
      });
  
      accountRender.innerHTML = accounts;
      
      let accountElements = document.querySelectorAll(".lists"); // Add event listeners to each account after rendering
      accountElements.forEach((element) => 
      {
          element.addEventListener("click", function () 
          {
            changeAccount(element);
          });
      });
  
    } 
    catch (error) 
    {
      console.error("Error fetching accounts:", error);
    }

    // console.log(privateKey);
}
  
//_______________________________________________________________________________________________________________________________________
  
function copyAddress() 
{
    let tooltip = document.getElementById("userAddress");
    //navigator.clipboard.writeText(address);
    // Copy address to clipboard
    navigator.clipboard.writeText(address)
      .then(() => 
      {
        // Change tooltip text to "Address copied"
        tooltip.setAttribute("data-hover-text", "Address copied");
    
        // Reset tooltip text to "Copy to clipboard" after 2 seconds
        setTimeout(() => 
        {
          tooltip.setAttribute("data-hover-text", "Copy to clipboard");
        }, 5000);
      })
      .catch((error) => 
      {
        console.error("Failed to copy address:", error);
      });
}
  
//_______________________________________________________________________________________________________________________________________
  
function changeAccount(element) 
{
    let data = element.querySelector(".accountValue");
    let address = data.getAttribute("data-address");
    let privateKey = data.getAttribute("data-privateKey");
  
    console.log(privateKey, address);
    let userWallet = 
    {
      address    : address,
      private_key: privateKey,
      mnemonic   : "Changed",
    };
  
    console.log(userWallet);
    let jsonObj = JSON.stringify(userWallet);
    localStorage.setItem("userWallet", jsonObj);
    window.location.reload();
}
//_______________________________________________________________________________________________________________________________________
  
window.onload = myFunction;
//_______________________________________________________________________________________________________________________________________
  
document.addEventListener('DOMContentLoaded', function() 
{
    let assetsButton = document.getElementById('open_assets'); // Set the "Assets" button as active by default
    assetsButton.classList.add('active');
    handleTabSwitch('open_assets'); // Show the "Assets" section by default
});

//_______________________________________________________________________________________________________________________________________
  
document.querySelectorAll('.home_tabs p').forEach(button => 
{
    button.addEventListener('click', function() 
    {
        document.querySelectorAll('.home_tabs p').forEach(b => b.classList.remove('active'));// Remove 'active' class from all buttons
        this.classList.add('active');// Add 'active' class to the clicked button
        let id = this.id;// Now display the corresponding data (Assets, Logout, Activity)
        handleTabSwitch(id);
    });
});


//_______________________________________________________________________________________________________________________________________
  
// function setNetwork() { document.getElementById("network").style.display = "none";}

//_______________________________________________________________________________________________________________________________________
  

// function handleTabSwitch(tabId) {
//   let assetsDiv = document.getElementById('assets');
//   let activityDiv = document.querySelector('.activity');
//   let logoutDiv = document.querySelector('.logout'); // Assuming there's a logout div
  
//   // Hide all sections
//   assetsDiv.style.display = 'none';
//   activityDiv.style.display = 'none';
//   logoutDiv.style.display = 'none';
  
//   // Show the appropriate section based on the tab clicked
//   if (tabId === 'open_assets') {
//     assetsDiv.style.display = 'block';
//   } else if (tabId === 'open_activity') {
//     activityDiv.style.display = 'block';
//   } else if (tabId === 'logout') {
//     logoutDiv.style.display = 'block';
//   }
// }


//_______________________________________________________________________________________________________________________________________
  
