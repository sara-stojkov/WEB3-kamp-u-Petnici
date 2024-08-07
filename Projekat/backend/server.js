require('dotenv').config();
import pdfRoutes from '/routes/pdfRoutes.js';


const express = require('express');
//const Web3 = require('web3');
const app = express();
const port = 3000;


// Initialize Web3 with Remiks
//ubaciti u env!
// const web3 = new Web3(process.env.REMIKS_URL);

// // Route to get the latest block number
// app.get('/latest-block', async (req, res) => {
//   try {
//     const latestBlock = await web3.eth.getBlockNumber();
//     res.json({ latestBlock });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Route to deploy a smart contract
// app.get('/deploy-contract', async (req, res) => {
//   try {
//     const contractABI = []; // Replace with your contract ABI
//     const contractBytecode = ''; // Replace with your contract bytecode

//     const contract = new web3.eth.Contract(contractABI);

//     const deployTx = contract.deploy({ data: contractBytecode });

//     const gas = await deployTx.estimateGas();
//     const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
//     const signedTx = await web3.eth.accounts.signTransaction({
//       data: deployTx.encodeABI(),
//       gas,
//       from: account.address
//     }, process.env.PRIVATE_KEY);

//     const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
//     res.json({ contractAddress: receipt.contractAddress });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });




app.use('/upload',pdfRoutes);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});




