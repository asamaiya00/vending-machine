const abi = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'donutBalances',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getVendingMachineBalance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_numberOfDonuts', type: 'uint256' },
    ],
    name: 'purchase',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_amount', type: 'uint256' }],
    name: 'restock',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

const contractAddress = '0xe521174f3ba253215577fb19502F4B2e12B0c15f';

const getContract = (web3) => new web3.eth.Contract(abi, contractAddress);

export default getContract;
