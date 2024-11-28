# MetaSchool Crypto Wallet
The MetaSchool Crypto Wallet is a user-friendly Chrome extension that allows users to securely send crypto between wallets, switch between blockchain networks, manage digital assets, import accounts using private keys, add ERC-20 tokens, ensure robust authentication, and track a comprehensive account history.

## Table of Contents

- [Tech-Stack](tech-stack)
- [Features](#features)
- [Getting Started](getting-started)
    - [Prerequisites](#prerequisites)
    - [How to Run the Crypto Wallet](#how-to-run-the-crypto-wallet)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [Contact](#contact)

## Tech-Stack
- Solidity
- MongoDB
- Ether.js
- Express.js

## Features
This Crypto Wallet application includes the following features:

- **User Authentication:** Users can sign up, log in, and log out of their accounts.
- **Choose Blockchain Network:** Select the blockchain network (e.g., Ethereum, BNB, Polygon) you want to interact with.
- **Send Crypto:** Transfer cryptocurrency to another wallet.
- **Import Account Using Private Key:** Securely import a crypto wallet using the private key.
- **Import ERC-20 Tokens:** Add tokens (e.g., DAI, USDT, USDC, etc.) using their token address.
- **Account History:** Track transaction history within the wallet.

## Getting Started
### Prerequisites
- #### Setting Up MongoDB Cluster
    Follow these steps to set up your MongoDB cluster:
    
    - **Sign Up/Login:** Visit [MongoDB Website](https://www.mongodb.com/), and sign up or log in.
    - **Create a Cluster:** Once logged in, click on "Build a Cluster". Choose an AWS cloud provider, select a region, and make sure you choose a connection method :Connecting with MongoDB for VS Code, then click "Create Cluster".
    - **Database Access:** Go to the "Database Access" section to find your MongoDB username and password. Copy these credentials for use in the next steps.
    - **Connection String:** You will need these credentials to connect to your MongoDB cluster, which will be used in your configuration files.

### How to Run the Crypto Wallet
1. Clone the repository:
    ```bash
    git clone https://github.com/jatinmeta/crypto_wallet.git
    ```
2. Install Dependencies: Navigate to the project directory and install the necessary dependencies:
    ```bash
    cd crypto_wallet/chromeapi
    npm install --y
    ```
3. Configure MongoDB:
      - Open the config.env files.
      - Replace the placeholders for MONGODB_URI and MONGODB_DB_NAME with your actual credentials.

4. Start the Development Server: Run the following command to launch the app locally:
    ```bash
    npm run start
    ```
5. Load MetaSchool Crypto Wallet Extension in Chrome:
    - Open Chrome and go to Extensions (three dots > More Tools > Extensions).
    - Enable Developer mode (toggle at the top).
    - Click Load unpacked, and select the folder where the MetaSchool Crypto Wallet project is located.
    - The extension will now appear in your Chrome toolbar.
    - Now you can use the Crypto Wallet

## Screenshots


<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/6c5b612f-9c6e-4890-9b73-2ab7dccf42c0" alt="Screenshot 1" width="150"></td>
    <td><img src="https://github.com/user-attachments/assets/f9c8137f-e8e6-4cb2-ae3b-27b5c6c9590a" alt="Screenshot 2" width="150"></td>
    <td><img src="https://github.com/user-attachments/assets/5baaaa1f-61ee-4789-8b98-619de61c182c" alt="Screenshot 3" width="150"></td>
    <td><img src="https://github.com/user-attachments/assets/d9b8aba9-eae2-4262-bd5d-3bace9fb4154" alt="Screenshot 9" width="150"></td>
    <td><img src="https://github.com/user-attachments/assets/0fc21ee0-b666-4000-b762-8f0cbf25f82d" alt="Screenshot 7" width="150"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/a5241808-6880-4a1a-9454-3f3460b0c40da" alt="Screenshot 4" width="150"></td>
    <td><img src="https://github.com/user-attachments/assets/1f4bd4e9-083e-4a1e-aa7b-a31c3579ed32" alt="Screenshot 5" width="150"></td>
    <td><img src="https://github.com/user-attachments/assets/1f4bd4e9-083e-4a1e-aa7b-a31c3579ed32" alt="Screenshot 6" width="150"></td>
    <td><img src="https://github.com/user-attachments/assets/342d6a11-e26e-4105-9413-b2b3843cef5d" alt="Screenshot 8" width="150"></td>
      <td><img src="https://github.com/user-attachments/assets/8e315bde-3394-46c2-98c9-d68b2433df6d" alt="Screenshot 9" width="150"></td>

  </tr>

</table>














## Contributing

We love contributions! Here's how you can help make the Crypto Wallet even better:

1. Fork the project (`git repo fork https://github.com/jatinmeta/crypto_wallet.git`)
2. Create your feature branch (`git checkout -b New_Feature`)
3. Commit your changes (`git commit -m 'Added New Feature'`)

## Contact

Please open an issue in the GitHub repository for any queries or support.
