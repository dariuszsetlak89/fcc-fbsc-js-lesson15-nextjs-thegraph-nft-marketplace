import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useMoralisQuery, useMoralis } from "react-moralis";
import NFTBox from "../components/NFTBox";

export default function Home() {
    // How do we show the recently listed NFTs?
    // const value = await useApiContract.getListing(""); // normal way

    // We will index the events off-chain and then read from our database.
    // Setup a server to listen for those events to be fired, and we will add them to a ???

    //TheGraph does this in a decentralized way
    // Moralis does it in a centralized way and comes with a ton of other features.

    // All our logic is still 100% on chain.
    // Speed & Development time.
    // Its really hard to start a prod blockchair project 100% decentralized
    // Moralis are working on open sourcing their code.
    // Feature richness
    // We can create more features with a centralized back end to start
    // As more decentralized tools are being created.
    // Local development

    const { isWeb3Enabled } = useMoralis();
    const { data: listedNfts, isFetching: fetchingListedNfts } = useMoralisQuery(
        // TableName, Function for the query
        // How it works: Grab from database useMoralisQuery only ActiveItem table and grab only the first 10 in descending order of the tokenIds (from 9 to 0)
        // Save the results of fetching in 'listedNfts' section
        "ActiveItem",
        (query) => query.limit(10).descending("tokenId")
    );
    console.log(listedNfts);

    return (
        <div className="container mx-auto">
            <h1 className="py-4 px-4 font-bold text-2xl">Recently Listed</h1>
            <div className="flex flex-wrap">
                {isWeb3Enabled ? (
                    fetchingListedNfts ? (
                        <div>Loading...</div>
                    ) : (
                        listedNfts.map((nft) => {
                            console.log(nft.attributes);
                            const { price, nftAddress, tokenId, marketplaceAddress, seller } =
                                nft.attributes;
                            return (
                                <NFTBox
                                    price={price}
                                    nftAddress={nftAddress}
                                    tokenId={tokenId}
                                    marketplaceAddress={marketplaceAddress}
                                    seller={seller}
                                    key={`${nftAddress}${tokenId}`}
                                />
                            );
                        })
                    )
                ) : (
                    <div>Web3 Currently Not Enabled</div>
                )}
            </div>
        </div>
    );
}
