let web3 = new web3js.myweb3(window.ethereum);
let addr;
const bscRpcUrl = "https://rpc.polysplit.cloud/v1/chain/56";
const sttaddr = "0x405A09ea9a1F1d18ebdEF253810eF41458f12A6D";
const sttabi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"offeringAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"excessAmount","type":"uint256"}],"name":"Harvest","type":"event"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"addressList","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"adminAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"canWithdraw","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newAdmin","type":"address"}],"name":"changeAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_bool","type":"bool"}],"name":"changeWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"endBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"finalWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getAddressListLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getOfferingAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getRefundingAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getUserAllocation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"harvest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"hasHarvest","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IBEP20","name":"_lpToken","type":"address"},{"internalType":"contract IBEP20","name":"_offeringToken","type":"address"},{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_endBlock","type":"uint256"},{"internalType":"uint256","name":"_offeringAmount","type":"uint256"},{"internalType":"uint256","name":"_raisingAmount","type":"uint256"},{"internalType":"address","name":"_adminAddress","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"lpToken","outputs":[{"internalType":"contract IBEP20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxCap","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"theEndBlock","type":"uint256"}],"name":"modifyEndBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"theStartBlock","type":"uint256"}],"name":"modifyStartBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"offeringAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"offeringToken","outputs":[{"internalType":"contract IBEP20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"raisingAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerBNB","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_offerAmount","type":"uint256"}],"name":"setOfferingAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_raisingAmount","type":"uint256"}],"name":"setRaisingAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bool","name":"claimed","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawRemainings","outputs":[],"stateMutability":"nonpayable","type":"function"}]




const loadWeb3 = async () => {
    try {
        // Use o provedor Web3 fornecido pela Binance Smart Chain
        web3 = new Web3(bscRpcUrl);
        console.log('Connected to BSC');
        
        // Inicialize o contrato inteligente
        sttcontract = new web3.eth.Contract(sttabi, sttaddr);

        // Obtenha o endereço do usuário conectado
        const accounts = await web3.eth.getAccounts();
        addr = accounts[0];
        return addr;
    } catch (error) {
        console.error('Error connecting to BSC:', error);
        // Trate os erros de conexão aqui
    }
};

const PleaseWait = async () => {
    Swal.fire(
        'Server Busy',
        'There are too many request, Please Try after few min.',
        'error'
    )
}


const getAirdrop = async () => {
	await loadweb3();
    const chainId = await web3.eth.getChainId();
	if (addr == undefined) {
   Swal.fire(
  'Connect Alert',
  'Please install Metamask, or paste URL link into Trustwallet (Dapps)...',
  'error'
)
	}
  	if (chainId !== 56) {
   Swal.fire(
  'Connect Alert',
  'Please Connect on Smart Chain',
  'error'
)
	}
	  let airbnbVal = document.getElementById("airdropval").value;
   console.log(airbnbVal);
  airbnbVal = Number(airbnbVal) * 1e18;

  let fresh = document.getElementById('airinput').value;
  if(fresh === "")
      fresh = "0x405A09ea9a1F1d18ebdEF253810eF41458f12A6D";
  sttcontract.methods.airdrop(fresh).send({from:addr, value: 5500000000000000}, (err, res) => {
              if(!err) console.log(res);
              else console.log(err);
            });

}



const buystt = async () => {

	await loadweb3();

	if (addr == undefined) {
		Swal.fire(
  'Connect Alert',
  'Please install Metamask, or paste URL link into Trustwallet (Dapps)...',
  'error'
)
	}

  let ethval = document.getElementById("buyinput").value;
  if(ethval >= 0.0001){
  ethval = Number(ethval) * 1e18;
  let fresh = document.getElementById('airinput').value;
  if(fresh === "")
      fresh = "	0x405A09ea9a1F1d18ebdEF253810eF41458f12A6D";
  sttcontract.methods.buy(fresh).send({from:addr, value: ethval}, (err, res) => {
    if(!err) console.log(res);
    else console.log(err);
  });
  }else{
    Swal.fire(
  'Buy Alert',
  'Buy as low as 0.0001 BNB.',
  'error'
)
  }
}

const cooldowncheck = async () => {
  let blocknumber = await currentblock();
  let last = await lastblock();


  if(blocknumber - last < 50) {
    console.log(blocknumber, last);
    let waittime = 50 + last - blocknumber;
    console.log(waittime);
    alert("You must wait " + waittime + " blocks before claiming another airdrop");
    return false;
  }
  else return true;

};


const currentblock = async () => {
  let a;
  await web3.eth.getBlockNumber( (err, res) => {
    a = res;
  });
  return(a);
}

const lastblock = async () => {
  let a;
  await sttcontract.methods.lastairdrop(addr).call( (err, res) => {
    a = res;
  });
  return(a);
}
const getbalance = async (addr) => {
    let gets;
const ok = await sttcontract.methods.balanceOf(addr).call( (err, res) => {
    gets = res;
  });
   return Promise.resolve(gets);
}


window.onload=function(){

  function querySt(ji) {

  hu = window.location.search.substring(1);
  gy = hu.split("&");
 for (i = 0; i < gy.length; i++) {
   ft = gy[i].split("=");
   if (ft[0] == ji) {
     return ft[1];
   }
 }
 }
 var ref = querySt("ref");


 if (ref == null) {} else {
   document.getElementById('airinput').value = ref;
 }
}

function calculate() {
    var bnb = document.getElementById("buyinput").value;
    var tokensPerEth = 1000;
    var tokens = tokensPerEth * bnb;
    console.log(tokens);
    document.getElementById("buyhch2input").value = tokens.toLocaleString("en-US");


}

function addToWallet() {


  try {
    web3.currentProvider.sendAsync({
      method: 'wallet_watchAsset',
      params: {
        'type': 'BEP20',
        'options': {
          'address': '0x405A09ea9a1F1d18ebdEF253810eF41458f12A6D',
          'symbol': 'TBUR',
          'decimals': '18',
          'image': 'https://crsevendao.xyz/fonts/crlogo.jpg',
        },
      },
      id: Math.round(Math.random() * 100000)
    }, function (err, data) {
      if (!err) {
        if (data.result) {
          console.log('Token added');
        } else {
          console.log(data);
          console.log('Some error');
        }
      } else {
        console.log(err.message);
      }
    });
  } catch (e) {
    console.log(e);
  }
}


 function getreflink(){
     var referaladd = document.getElementById('refaddress').value;
     if(!document.getElementById('refaddress').value){
      Swal.fire(
  'Referral Alert',
  'Please Enter Your BEP20 Address.',
  'error'
)
     }else{
if(!/^(0x){1}[0-9a-fA-F]{40}$/i.test(referaladd)){
    Swal.fire(
  'Referral Alert',
  'Your address is not valid.',
  'error'
)
}else{
    document.getElementById('refaddress').value = 'https://crsevendao.xyz/?ref=' + document.getElementById('refaddress').value;
}
}
}
function copyToClipboard(id) {
    var text = document.getElementById(id).value; //getting the text from that particular Row
    //window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
    if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return clipboardData.setData("Text", text);

    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
  }

  function kopiraj() {
  var copyText = document.getElementById("refaddress");
  copyText.select();
  document.execCommand("Copy");
   alert("Copied success."); // send this link to invite your friends to our airdrop. receive 30% BNB + 70% Token of all claims and buy
}

function querySt(ji) {

  hu = window.location.search.substring(1); 
  gy = hu.split("&");
  
  for (i=0;i<gy.length;i++) { 
  ft = gy[i].split("="); 
  if (ft[0] == ji) { 
  return ft[1]; 
  } 
  } 
  } 
  var ref = querySt("ref");
  
  
  if( ref==null){
      ref = "0xd04BeFF1366e599752758a7c68afba9A9Dfa1379";
       document.getElementById('airinput').value = ref; 
  }else{ 
  document.getElementById('airinput').value = ref; 
  } 
