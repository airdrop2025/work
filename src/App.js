import { Web3Button } from '@web3modal/react'
import { useAccount, useBalance, useNetwork } from 'wagmi'
import Assets from './components/assets'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { polygon } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy';
import NFT from './components/nft'
function App() {
  const [toekns, setTokns] = useState([]);
  const { chain, chains } = useNetwork()
  console.log("🚀 ~ file: App.js:14 ~ App ~ chain:", chain)
  const [nftsData, seNftsData] = useState([])
  console.log("🚀 ~ file: App.js:14 ~ App ~ nftsData:", nftsData)
  const {address}=useAccount()
  const alchemyNetwork  = {
    apiKey:'OsbfrhxwBeo866Hcu7UYhTcR8472L14i',
    network: 137,
  };
  console.log("🚀 ~ file: App.js:10 ~ App ~ toekns:", toekns)
  const TokenData =async()=>{
    try {
      var config = {
        method: 'get',
        url: 'https://raw.githubusercontent.com/Sensifia/tokens/main/tokens.json',
      };
      const response = await axios(config);
      setTokns(response.data.tokens)
      console.log("response:", response)
    } catch (error) {
      console.error(error);
    }
  }
  const provider = alchemyProvider(alchemyNetwork)
  const loadNFTs = async () => {
    try {
      var config = {
        method: 'get',
        url: `https://api.rarible.org/v0.1/items/byOwner/?blockchains=${chain?.name?.toUpperCase()}&owner=ETHEREUM:${address}&size=100`,
      };
      const response = await axios(config);
      const nfts = response?.data?.items;
      console.log("🚀 ~ file: App.js:36 ~ loadNFTs ~ nfts:", response)
      seNftsData(nfts)
    } catch (error) {
      console.error('Error retrieving NFTs:', error);
    }
  }
  
  


  useEffect(() => {
    TokenData();
    loadNFTs();
  }, [address,chain]);
  return (
    <>
     <Web3Button />
     {!address?<div className='ConnectWallet'>Connect Your Wallet Please</div>:
     <>
     <div style={{display:'flex',flexWrap:'wrap',marginTop:'30px'}}>
     {toekns?.slice(0,20)?.map((data,i)=>
      address&&<Assets token={data} i={i}/>
      )
      }
      </div>
      <div style={{display:'flex',flexWrap:'wrap'}}>
      {nftsData?.map((data,i)=>

      <NFT data={data} />
      )
      }  
      </div>
      </>}
    </>
  )
}
export default App;
