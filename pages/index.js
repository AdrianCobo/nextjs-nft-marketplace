import Image from "next/image"
import styles from "../styles/Home.module.css"
import { useMoralisQuery, useMoralis } from "react-moralis"
import NFTBox from "../components/NFTBox"

export default function Home() {
    // How do we show the recently listed NFTs?

    // We will index the events off-chain and then read from our database.
    // Setup a server to listen those events to be fires, and we will add them to a query.

    //Whoa, isnt that centralized?
    //Moralis does this in a centralized way and comes with a ton of other features.
    //TheGraph does this in a decentralized way

    /* 
        All our logic is still 100% on chain.
        Speed & Development time.
        Its really hard to start a prod blockcahin project 100% decentralized.
        They are working on open sourcing their code.
        Feature richness
        We cann create more features with a centralized back end to start
        As more decentralized tools are bein created.
        Local developments
    */

    const { isWeb3Enabled } = useMoralis()
    const { data: listedNfts, isFetching: fetchingListedNfts } = useMoralisQuery(
        //TableName
        //Function for the query
        "ActiveItem",
        (query) => query.limit(10).descending("tokenId")
    )
    return (
        <div className="container mx-auto">
            <h1 className="py-4 px-4 font-bold text-2xl">Recently Listed</h1>
            <div className="flex flex-wrap">
                {isWeb3Enabled ? (
                    fetchingListedNfts ? (
                        <div>Loading...</div>
                    ) : (
                        listedNfts.map((nft) => {
                            const { price, nftAddress, tokenId, marketplaceAddress, seller } =
                                nft.attributes
                            return (
                                <div>
                                    <NFTBox
                                        price={price}
                                        nftAddress={nftAddress}
                                        tokenId={tokenId}
                                        marketplaceAddress={marketplaceAddress}
                                        seller={seller}
                                        key={`${nftAddress}${tokenId}`}
                                    />
                                </div>
                            )
                        })
                    )
                ) : (
                    <div>Web3 Currently Not Enabled</div>
                )}
            </div>
        </div>
    )
}
