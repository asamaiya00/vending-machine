import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import 'bulma/css/bulma.css';

const Home = () => {
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

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
  return (
    <div className={styles.main}>
      <Head>
        <title>VendingMachine App</title>
        <meta name="description" content="A blockchain vending app" />
      </Head>
      <nav className="navbar mt-4 mb-4">
        <div className="container">
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
        </div>
      </nav>
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
