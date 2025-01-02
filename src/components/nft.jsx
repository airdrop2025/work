import React from 'react'

const NFT = ({data,i}) => {
  return (
    <div key={i} style={{margin:'15px'}} class="card">
    <div>    
        <img class="card-image" src={data?.meta?.content[0]?.url}/>
         <p class="heading">{data?.meta?.name}</p>
    </div>
    </div>
  )
}

export default NFT
