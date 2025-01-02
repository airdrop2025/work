import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import {sepolia, mainnet, polygon} from 'wagmi/chains'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { alchemyProvider } from 'wagmi/providers/alchemy';

const chains = [sepolia, mainnet, polygon]
const projectId = '75c776ba53928c0b1d3607024f7490b0';
const alchemyNetwork  = {
  apiKey:'OsbfrhxwBeo866Hcu7UYhTcR8472L14i',
  network: 137,
};
const { publicClient } = configureChains(chains, [alchemyProvider(alchemyNetwork)])

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <WagmiConfig config={wagmiConfig} defaultChain={polygon}>
  <Web3Modal
    themeVariables={{
  '--w3m-background-color': '#363636',
}}
   themeMode='dark' projectId={projectId} ethereumClient={ethereumClient} defaultChain={polygon} />
    <App />
    </WagmiConfig>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
