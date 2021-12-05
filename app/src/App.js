import React, { useEffect, useState } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  // STATE

  const [wallet, setWallet] = useState(null);


  // METHODS

  // This will check if the user has a Solana object, if the Solana object is 
  // a Phantom wallet, and if there's authorization to the Phantom wallet.
  const walletConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log("Phantom wallet is found!");

          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            'Connected with Public Key:',
            response.publicKey.toString()
          );

          setWallet(response.publicKey.toString());
        }
      } else {
        alert('Solana object is not found! Get a phantom wallet 👻');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWallet(response.publicKey.toString());
    }
  };

  const disconnected = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      CONNECT PHANTOM WALLET
    </button>
  );

  // USEEFFECTS

  // This will check if there's a connected phantom wallet as soon as the 
  // component mounts.
  useEffect(() => {
    const onLoad = async () => {
      await walletConnected();
    };
    window.addEventListener("load", onLoad);
    return () => {
      window.removeEventListener("load", onLoad);
    }
  }, []);



  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🍭 Candy Drop</p>
          <p className="sub-text">NFT drop machine with fair mint</p>
          {!wallet && disconnected()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
