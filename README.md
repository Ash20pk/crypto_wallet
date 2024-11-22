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
    - **Create a Cluster:** Once logged in, click on "Build a Cluster". Choose an AWS cloud provider, select a region, and pick a cluster tier, then click "Create Cluster".
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
      - Open the config.env and server.js files.
      - Replace the placeholders for MongoDB username and password with your actual credentials.

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
    <td><img src="https://github.com/user-attachments/assets/aff72ed9-d4f6-4de4-828b-e335d1a0d519" alt="Screenshot 1" width="150"></td>
    <td><img src="https://github.com/user-attachments/assets/9434899a-269f-494f-b131-222817b3cfba" alt="Screenshot 2" width="150"></td>
    <td><img src="https://github.com/user-attachments/assets/1d50448b-6cb1-41b8-bf0e-fdbe72be3816" alt="Screenshot 3" width="150"></td>
    <td><img src="https://github.com/user-attachments/assets/084886f3-32b3-4e21-9e47-20f1550fb5b2" alt="Screenshot 9" width="150"></td>
    <td><img src="https://github.com/user-attachments/assets/ca7afda5-cd0b-41cb-bc74-1a478733fd3a" alt="Screenshot 7" width="150"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/77d88cf8-9d9f-48ca-93f7-dbe7d0e3681a" alt="Screenshot 4" width="150"></td>
    <td><img src="https://github.com/user-attachments/assets/292c83f8-8d8c-4681-ab52-fb73f374fba4" alt="Screenshot 5" width="150"></td>
    <td><img src="https://github.com/user-attachments/assets/fbce9cf5-6fb2-4d47-adec-9b36d2c80cc0" alt="Screenshot 6" width="150"></td>
    <td><img src="https://github.com/user-attachments/assets/8ab7cbc9-08e4-4c85-b717-1a6b23d4bc0b" alt="Screenshot 8" width="150"></td>
      <td><img src="https://github.com/user-attachments/assets/24257266-3e1d-43e3-98f9-c71c9454b1c3" alt="Screenshot 9" width="150"></td>

  </tr>

</table>














## Contributing

We love contributions! Here's how you can help make the Crypto Wallet even better:

1. Fork the project (`git repo fork https://github.com/jatinmeta/crypto_wallet.git`)
2. Create your feature branch (`git checkout -b New_Feature`)
3. Commit your changes (`git commit -m 'Added New Feature'`)

## Contact

Please open an issue in the GitHub repository for any queries or support.
