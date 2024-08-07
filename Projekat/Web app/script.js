

    // document.getElementById('submitBtn').addEventListener('click', async function() {
    //     const fileInput = document.getElementById('pdfInput');
    //     const file = fileInput.files[0];

    //     if (!file) {
    //         alert('Please select a file');
    //         return;
    //     }

    //     // try {
    //     //     const fileBuffer = await file.arrayBuffer();
    //     //     const ipfs = create({ host: 'localhost', port: '5001', protocol: 'http' });
    //     //     const cids = await addPdfPagesToIpfs(fileBuffer, ipfs);
    //     //     console.log('PDF pages successfully added to IPFS:', cids);
    //     // } catch (error) {
    //     //     console.error('Error processing file:', error);
    //     // }
    // });


// function fetchCardDataAndGenerateCards() {
//     fetch('https://hasta-la-fiesta-default-rtdb.europe-west1.firebasedatabase.app/organizatoriFestivala.json')
//     .then(response => response.json())
//     .then(data => {
//         if (data) {
//             generateCardsFromData(data);
//         }
//     })
//     .catch(error => {
//         console.error('Error fetching card data:', error);
//         const errorMessage = encodeURIComponent(error.message);
//         window.location.href = `fetch_error.html?message=${errorMessage}`;
//     });
// }

// function generateCardsFromData(cardData) {
//     const container = document.getElementById('cardcontainer');
//     let cardCount = 0;

//     Object.entries(cardData).forEach(([key, value]) => {
//         if (cardCount % 3 === 0) {
//             const row = document.createElement('div');
//             row.className = 'row';
//             container.appendChild(row);
//         }
        
//         const card = document.createElement('div');
//         card.className = 'card';

//         card.innerHTML = `
//              <div class="col-md-4">
//                 <div class="card" id="paper-card">
//                     <div class="card-body">
//                         <h5 class="card-title">${value.name}</h5>
//                         <p class="card-text">Author(s): ${value.authors}</p>
//                     </div>
//                     <div class="card-footer">
//                         <button class="btn btn-primary" id="view-btn" type="button" role="button" onclick="document.getElementById('view-modal-popup-${cardCount}').style.display='block'">View</button>
//                         <button class="btn btn-primary" id="view-btn" type="button" role="button" onclick="document.getElementById('donate-modal-popup-${cardCount}').style.display='block'">Donate</button>
//                         <button class="btn btn-primary" id="view-btn" type="button" role="button" onclick="document.getElementById('cite-modal-popup-${cardCount}').style.display='block'">Cite</button>
//                     </div>
//                 </div>
//             </div>     
            
//             <div id="view-modal-popup-${cardCount}" class="modal">
//                 <span onclick="document.getElementById('view-modal-popup-${cardCount}').style.display='none'"
//                 class="close" title="Close Modal">&times;</span>
              
//                 <div class="modal-content animate" id="viewForm">
//                     <div class="modal-header">
//                         <h2>Paper preview</h2>
//                     </div>
//                     <div class="modal-body">
//                         <p>Author(s): Sizar O, Leslie SW, Unakal CG</p>
//                         <p>Abstract: Health professionals need to understand the important difference between gram-positive and gram-negative bacteria. Gram-positive bacteria are bacteria classified by the color they turn in the staining method. Hans Christian Gram developed the staining method in 1884. The staining method uses crystal violet dye, which is retained by the thick peptidoglycan cell wall found in gram-positive organisms. This reaction gives gram-positive organisms a blue color when viewed under a microscope. Although gram-negative organisms classically have an outer membrane, they have a thinner peptidoglycan layer, which does not hold the blue dye used in the initial dying process. Other information used to differentiate bacteria is the shape. Gram-positive bacteria comprise cocci, bacilli, or branching filaments.</p>
//                         <p>Keywords: Bacteria, gram positive, staining, cell wall</p>
//                     </div>
//                         <div class="modal-footer">
//                             <button type="button" class="btn btn-secondary" onclick="document.getElementById('view-modal-popup-x').style.display='none'">Close</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div id="donate-modal-popup-${cardCount}" class="modal">
//                 <span onclick="document.getElementById('donate-modal-popup-${cardCount}').style.display='none'"
//                 class="close" title="Close Modal">&times;</span>
              
//                 <div class="modal-content animate" id="donateForm">
//                     <div class="modal-header">
//                         <h2>Donate</h2>
//                     </div>
//                     <div class="modal-body">
//                     <form>
//                         <label for="donation">Donation amount(ETH):</label>
//                         <input type="number" id="donation" name="donation" min="0.00000001" max="1000">
//                         <button type="submit" class="btn btn-primary">Donate</button>
//                     </form>
//                     </div>
//                 </div>
//             </div>
//             `;
        
//         container.lastChild.appendChild(card);
//         cardCount++;
//     });
// }

// fetchCardDataAndGenerateCards();

document.getElementById('searchBtn').addEventListener('click', ()=>{  
    var searchQuery = document.getElementById('searchbar').value.trim().toLowerCase();
    
    var highlights = document.querySelectorAll('.highlight');
    highlights.forEach(function(element) {
        element.classList.remove('highlight');
    });
    
    if (searchQuery === '') return;
    
    var elements = document.querySelectorAll('.content');
    elements.forEach(function(element) {
        const targetElement = document.getElementById('sve-kartice');
        targetElement.scrollIntoView({ behavior: 'smooth' });
        highlightTextInElement(element, searchQuery);
    });
    });
    
    function highlightTextInElement(element, searchQuery) {
    var nodesToProcess = [element];
    while (nodesToProcess.length > 0) {
        var node = nodesToProcess.shift();
        if (node.nodeType === Node.TEXT_NODE) {
            var text = node.nodeValue.toLowerCase();
            var index = text.indexOf(searchQuery);
            while (index !== -1) {
                var beforeText = node.nodeValue.substring(0, index);
                var matchedText = node.nodeValue.substring(index, index + searchQuery.length);
                var afterText = node.nodeValue.substring(index + searchQuery.length);
    
                var span = document.createElement('span');
                span.classList.add('highlight');
                span.appendChild(document.createTextNode(matchedText));
    
                if (beforeText) {
                    var beforeTextNode = document.createTextNode(beforeText);
                    node.parentNode.insertBefore(beforeTextNode, node);
                }
                node.parentNode.insertBefore(span, node);
                
                node.nodeValue = afterText;
                text = node.nodeValue.toLowerCase();
                index = text.indexOf(searchQuery);
            }
        } else if (node.nodeType === Node.ELEMENT_NODE && node.childNodes.length > 0 && node.tagName.toLowerCase() !== 'button') {
            for (var i = 0; i < node.childNodes.length; i++) {
                nodesToProcess.push(node.childNodes[i]);
            }
        }
    }
    }

    
    if (window.location.pathname.includes("index.html")) {
        document.getElementById('searchbar').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
        event.preventDefault(); 
        searchPage();
        }
    });
    }


    document.addEventListener('DOMContentLoaded', () => {
        const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138'; // Replace with your contract address
        const contractABI = [
            {
                "inputs": [],
                "name": "donate",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "donor",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "name": "DonationReceived",
                "type": "event"
            },
            {
                "inputs": [],
                "name": "withdraw",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getBalance",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ];
    
        document.getElementById('donation-form-3').addEventListener('submit', async (event) => {
            event.preventDefault();
    
            var donationAmount = document.getElementById('donation-amount-3').value;
            console.log(donationAmount);

            if (!donationAmount || isNaN(donationAmount) || parseFloat(donationAmount) <= 0) {
                    alert('Please enter a valid donation amount.');
                    return;
                }       

            if (typeof window.ethereum !== 'undefined') {
                const web3 = new Web3(window.ethereum);
                try {
                    // Request account access if needed
                    await ethereum.request({ method: 'eth_requestAccounts' });
    
                    // Get the user's accounts
                    const accounts = await web3.eth.getAccounts();
                    const userAccount = accounts[0];
    
                    // Instantiate the contract
                    const donationContract = new web3.eth.Contract(contractABI, contractAddress);
    
                    // Check if the user has enough balance
                    const balance = await web3.eth.getBalance(userAccount);
                    const balanceInEth = web3.utils.fromWei(balance, 'ether');
                    if (parseFloat(balanceInEth) < parseFloat(donationAmount)) {
                        alert('Insufficient funds.');
                        return;
                    }
    
                    // Send the donation
                    await donationContract.methods.donate().send({
                        from: userAccount,
                        value: web3.utils.toWei(donationAmount, 'ether')
                    });
    
                    alert('Donation successful!');
                    document.getElementById('donate-modal-popup').style.display = 'none';
                } catch (error) {
                    console.error(error);
                    alert('An error occurred while processing the donation.');
                }
            } else {
                alert('MetaMask is not installed. Please install MetaMask to proceed.');
            }
        });
    });



    document.addEventListener('DOMContentLoaded', () => {
        const contractAddress2 = '0x358AA13c52544ECCEF6B0ADD0f801012ADAD5eE3';
        const contractABI2 = [
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "numberOfPages",
                        "type": "uint256"
                    }
                ],
                "name": "payForPages",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "withdraw",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "stateMutability": "payable",
                "type": "receive"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "numberOfPages",
                        "type": "uint256"
                    }
                ],
                "name": "calculatePayment",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "pricePerPage",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ];
    
        document.getElementById('cite-form-3').addEventListener('submit', async (event) => {
            event.preventDefault();
    
            var citationAmount = document.getElementById('cite-amount-3').value;
            console.log(citationAmount);

            if (!citationAmount || isNaN(citationAmount) || parseFloat(citationAmount) <= 0) {
                    alert('Please enter a valid donation amount.');
                    return;
                }       

            if (typeof window.ethereum !== 'undefined') {
                const web3 = new Web3(window.ethereum);
                try {
                    // Request account access if needed
                    await ethereum.request({ method: 'eth_requestAccounts' });
    
                    // Get the user's accounts
                    const accounts = await web3.eth.getAccounts();
                    const userAccount = accounts[0];
    
                    // Instantiate the contract
                    const citationContract = new web3.eth.Contract(contractABI2, contractAddress2);
    
                    // Check if the user has enough balance
                    const balance = await web3.eth.getBalance(userAccount);
                    const balanceInEth = web3.utils.fromWei(balance, 'ether');
                    if (parseFloat(balanceInEth) < parseFloat(citationAmount) * 0.0001) {
                        alert('Insufficient funds.');
                        console.log(balanceInEth);
                        console.log(citationAmount);
                        return;
                    }
    
                    // Send the donation
                    await citationContract.methods.payForPages(citationAmount).send({
                        from: userAccount,
                        value: web3.utils.toWei(citationAmount, 'ether')
                    });
    
                    alert('Citation successful!');
                    document.getElementById('cite-modal-popup-3').style.display = 'none';
                } catch (error) {
                    console.error(error);
                    alert('An error occurred while processing the donation.');
                }
            } else {
                alert('MetaMask is not installed. Please install MetaMask to proceed.');
            }
        });
    });
    
