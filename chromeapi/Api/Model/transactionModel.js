const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    Sender_address:       String,     
    Receiver_address:     String,     
  amount:              String,     
  Network:             String,     
  Hash:                String,     
  timestamp:   { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);



// Sender_address: wallet.address,
// Receiver_address : address,
// amount : amount ,
// Network : providerURL,
// Hash :txObj.hash