import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import 'bulma/css/bulma.css';
import VMContract from './vending-machine';

const Home = () => {
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [donutsAvailable, setDonutsAvailable] = useState(0);

  useEffect(() => {
    getVendingMachineBalance();
  }, []);

  const connectWalletHandler = async () => {
    if (!window.ethereum) {
      alert('Please install metamask!');
      return;
    }
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (err) {
      setError(err.message);
    }
  };

  const getVendingMachineBalance = async () => {
    const res = await VMContract.methods.getVendingMachineBalance().call();
    setDonutsAvailable(Number.parseInt(res));
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
            <button
              onClick={connectWalletHandler}
              className="button is-primary"
            >
              Connect Wallet
            </button>
          </div>
        </nav>

        <h2>Donuts available: {donutsAvailable}</h2>
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
