import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import 'bulma/css/bulma.css';
import getContract from './vending-machine';
import Web3 from 'web3';

const Home = () => {
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [donutsAvailable, setDonutsAvailable] = useState(0);
  const [donutsInWallet, setDonutsInWallet] = useState(0);
  const [address, setAddress] = useState('');
  const [web3, setWeb3] = useState('');
  const [contract, setContract] = useState(null);
  const [numberOfDonuts, setNumberOfDonuts] = useState(0);

  useEffect(() => {
    if (contract) getVendingMachineBalance();
    if (contract && address) getDonutsInWallet();
  }, [contract, address]);

  const connectWalletHandler = async () => {
    if (!window.ethereum) {
      alert('Please install metamask!');
      return;
    }
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);
      const contract = getContract(web3);
      setContract(contract);
      const accounts = await web3.eth.getAccounts();
      setAddress(accounts[0]);
    } catch (err) {
      setError(err.message);
    }
  };

  const getVendingMachineBalance = async () => {
    const res = await contract.methods.getVendingMachineBalance().call();
    setDonutsAvailable(Number.parseInt(res));
  };

  const getDonutsInWallet = async () => {
    const res = await contract.methods.donutBalances(address).call();
    setDonutsInWallet(Number.parseInt(res));
  };

  const purchaseDonuts = async () => {
    try {
      await contract.methods.purchase(numberOfDonuts).send({
        from: address,
        value: web3.utils.toWei('0.5', 'ether') * numberOfDonuts,
      });

      getVendingMachineBalance();
      getDonutsInWallet();
      setSuccessMsg(`${numberOfDonuts} donuts purchased successfully`);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.main}>
      <Head>
        <title>Vending Machine App</title>
        <meta name="description" content="A blockchain vending app" />
      </Head>
      <div className="container">
        <nav className="navbar mt-4 mb-4">
          <div className="navbar-brand">
            <h1>Vending Machine</h1>
          </div>
          <div className="navbar-end">
            {!address && (
              <button
                onClick={connectWalletHandler}
                className="button is-primary"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </nav>

        {address && (
          <>
            <h2>Donuts available: {donutsAvailable}</h2>
            <h2>Donuts in wallet: {donutsInWallet}</h2>

            <div className="mt-5 columns">
              <div className="label column is-6">
                Enter amount of donuts to buy (0.5 Rinkeby ether / donut)
              </div>
              <input
                onChange={(e) => setNumberOfDonuts(e.target.value)}
                type="number"
                className="input column is-4"
                placeholder="Enter no. of donuts"
                min={1}
              />
              <button
                onClick={purchaseDonuts}
                className="button is-primary is-2 ml-2"
              >
                Buy
              </button>
            </div>
          </>
        )}
      </div>
      <section>
        <div className="container has-text-danger">
          <p>{error}</p>
        </div>
      </section>
      <section>
        <div className="container has-text-success">
          <p>{successMsg}</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
