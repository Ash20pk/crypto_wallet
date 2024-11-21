# MetaSchool Crypto Wallet
The MetaSchool Crypto Wallet is a user-friendly cryptocurrency wallet that allows users to manage digital assets securely. Key features include importing accounts using private keys, adding ERC-20 tokens, sending crypto between wallets, and selecting blockchain networks. It also supports user authentication and tracks account history.


## Table of Contents

- [Prerequisites](#prerequisites)
- [Features](#features)
- [How to Run the Crypto Wallet](#how-to-run-the-crypto-wallet)
- [Contributing](#contributing)
- [Contact](#contact)

## Prerequisites
- Solidity
- Javascript
- API Developement 
- MongoDB

## Features
This Crypto Wallet application includes the following features:

- Import Account Using Private Key: Securely import a crypto wallet using the private key.
- Import ERC-20 Tokens: Add tokens (e.g., DAI, USDT, USDC, etc.) using their token address.
- Send Crypto: Transfer cryptocurrency to another wallet.
- Choose Blockchain Network: Select the blockchain network (e.g., Ethereum, Binance Smart Chain) you want to interact with.
- User Authentication: Users can sign up, log in, and log out of their accounts.
- Account History: Track transaction history within the wallet.


## Setting Up MongoDB Cluster
Follow these steps to set up your MongoDB cluster:

- Sign Up/Login: Visit [MongoDB Website](https://www.mongodb.com/), and sign up or log in.
- Create a Cluster: Once logged in, click on "Build a Cluster". Choose an AWS cloud provider, select a region, and pick a cluster tier, then click "Create Cluster".
- Database Access: Go to the "Database Access" section to find your MongoDB username and password. Copy these credentials for use in the next steps.
- Connection String: You will need these credentials to connect to your MongoDB cluster, which will be used in your configuration files.


## How to Run the Crypto Wallet
1. Clone the repository:
    ```bash
    git clone https://github.com/jatinmeta/crypto_wallet.git
    ```
2. Install Dependencies: Navigate to the project directory and install the necessary dependencies:
    ```bash
    cd chromeapi
    npm install --y
    ```
3. Configure MongoDB:
      - Open the config.env and server.js files.
      - Replace the placeholders for MongoDB username and password with your actual credentials.

4. Start the Development Server: Run the following command to launch the app locally:
    ```bash
    npm run start
    ```

## Contributing

We love contributions! Here's how you can help make the Flash Loan even better:

1. Fork the project (`git repo fork https://github.com/jatinmeta/crypto_wallet.git`)
2. Create your feature branch (`git checkout -b New_Feature`)
3. Commit your changes (`git commit -m 'Added New Feature'`)

## Contact

Please open an issue in the GitHub repository for any queries or support.
