let jwt = require("jsonwebtoken");
let User = require("../Model/userModel");
let Token = require("../Model/tokenModel");
let Account = require("../Model/accountModel");
let Transaction = require("../Model/transactionModel");



let signToken = (id) => 
{
  return jwt.sign(
                      { id }, 
                      process.env.JWT_SECRET, 
                      {expiresIn: process.env.JWT_EXPIRES_IN }
                  );
};

let createSendToken = (user, statusCode, req, res) => 
{
    let token = signToken(user._id);

    res.cookie(
                "jwt", 
                token, 
                {
                    expires: new Date( Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
                    httpOnly: true,
                    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
                }
             );

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
                                    status: "success",
                                    token,
                                    data: {user}
                              });
};

exports.signUp = async (req, res, next) => 
{
    let newUser = await User.create({
                                          name           : req.body.name,
                                          email          : req.body.email,
                                          password       : req.body.password,
                                          passwordConfirm: req.body.passwordConfirm,
                                          address        : req.body.address,
                                          private_key    : req.body.private_key,
                                          mnemonic       : req.body.mnemonic,
                                    });
  createSendToken(newUser, 201, req, res);
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide email and password!",
      });
    }

    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect email or password",
      });
    }

    // 3) If everything ok, send token to client
    createSendToken(user, 200, req, res);
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "An error occurred during login",
      error: error.message
    });
  }
};

exports.allToken = async (req, res, next) => {
  let tokens = await Token.find();

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    data: {
      tokens,
    },
  });
};

exports.addToken = async (req, res, next) => {
  let createToken = await Token.create({
    name: req.body.name,
    address: req.body.address,
    symbol: req.body.symbol,
    provider : req.body.provider ,
    connected_account : req.body.connected_account
  });

  // SEND RESPONSE
  res.status(201).json({
    status: "success",
    data: {
      createToken,
    },
  });
};

exports.allAccount = async (req, res, next) => {
  let accounts = await Account.find();

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    data: {
      accounts,
    },
  });
};

exports.createAccount = async (req, res, next) => 
{
  let account = await Account.create({
                                            privateKey: req.body.privateKey,
                                            address:    req.body.address,
                                      });

  // SEND RESPONSE
  res.status(201).json({
                          status: "success",
                          data: {account},
                      });
};



exports.logTransaction = async (req, res, next) => 
  {
    try {
    console.log("A2");
    // const { senderAddress, receiverAddress, amount, network, hash } = req.body;
    let Transaction_log = await Transaction.create(
    {
      Sender_address  : req.body.Sender_address,
      Receiver_address: req.body.Receiver_address,
      amount          : req.body.amount,
      Network         : req.body.Network,
      Hash            : req.body.Hash
 
    });
  
                                        // Sender_address: wallet.address,
                                        // Receiver_address : address,
                                        // amount : amount ,
                                        // Network : providerURL,
                                        // Hash :txObj.hash
  console.log(`Values: ${req.body.Sender_address}, ${req.body.Receiver_address}, ${req.body.amount}, ${req.body.Network},${req.body.Hash}`);
  console.log("Values: ",  typeof(req.body.Sender_addres),   typeof(req.body.Receiver_address),   typeof(req.body.amount),   typeof(req.body.Network),   typeof(req.body.Hash));
    // SEND RESPONSE
    res.status(201).json({
                            status: "success",
                            data: {Transaction_log},
                        });


                        if (Transaction_log && Transaction_log._id) {
                          // Log the values received in the request and their types
                          console.log(`Transaction successfully created with ID: ${Transaction_log._id}`);
                          console.log("TE",Transaction_log);
                        }
  }
catch (error) {
    // Log the error with detailed information
    console.error('Error while logging transaction:', error.message);

    // Send error response with a proper status and error message
    res.status(500).json({
      status: "error",
      message: error.message || 'An error occurred while logging the transaction'
    });
  }
}



exports.getTransactions = async (req, res,next) =>
{
    let Transaction_ = await Transaction.find();
    console.log("A1");

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      data: {
        Transaction_,
      },
    });
}