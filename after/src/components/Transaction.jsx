import { useState } from "react";


const Transaction = () => {



    const [isOldToken, setIsOldToken] = useState(false);
    const [burnTransactions, setBurnTransactions] = useState([]);
    const [approveTxHash, setApproveTxHash] = useState<string | null>(null);

    const [coinData, setCoinData] = useState({});
    useEffect(() => {
      CoinGeckoApi.fetchCoinData()
        .then((data) => {
          //console.log("coin stats", data);
          setCoinData(data?.market_data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);




    const statsSupplies = supplies;
    const tokenAddress = fetchAddressForChain(
      suppliesChain?.id,
      isOldToken ? "oldToken" : "newToken"
    );
  
    const refetchTransactions = () => {
      Promise.all(
          ChainScanner.fetchAllTxPromises(isChainTestnet(walletChain?.id))
      )
      .then((results) => {
          let res = results.flat();
          res = ChainScanner.sortOnlyBurnTransactions(res);
          res = res.sort((a, b) => b.timeStamp - a.timeStamp);
          setBurnTransactions(res);
      })
      .catch((err) => {
          console.log(err);
      });
  };


  useEffect(() => {
    if (!walletChain) return;
    //console.log(suppliesChain);
    let isSubscribed = true;
    // const newTokenAddress = fetchAddressForChain(
    //   walletChain?.id,
    //   isOldToken ? "oldToken" : "newToken"
    // );
    if (isSubscribed) setBurnTransactions([]);
    const isTestnet = isChainTestnet(walletChain?.id);
    let _chainObjects= [mainnet, avalanche, fantom];
    if (isTestnet) _chainObjects = [sepolia, avalancheFuji, fantomTestnet];
    Promise.all(ChainScanner.fetchAllTxPromises(isTestnet))
      .then((results) => {
        //console.log(results, isTestnet);
        if (isSubscribed) {
          let new_chain_results= [];
          results.forEach((results_a, index) => {
            new_chain_results.push(
              results_a.map((tx) => ({
                ...tx,
                chain: _chainObjects[index],
              }))
            );
          });
          let res = new_chain_results.flat();
          console.log(res, isTestnet);
          res = ChainScanner.sortOnlyBurnTransactions(res);
          res = res.sort((a, b) => b.timeStamp - a.timeStamp);
          setBurnTransactions(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      isSubscribed = false;
    };
  }, [walletChain, isOldToken]);

  return (

  
    <div>
        <TransactionTableStyled>
    <div className="header">
      <p className="header_label">Burn Transactions</p>
    </div>
    <BurnTxTable
      data={burnTransactions}
      priceUSD={coinData?.current_price?.usd}
    />
    </TransactionTableStyled>
    </div>
  )
}

export default Transaction