import React from 'react';

const BurnStatsContainer = ({ statsSupplies, suppliesChain, allSupplies, openChainModal, tokenAddress, numberWithCommas, walletChain }) => {
    

    const executeBurn = async () => {
        if (!isWalletConnected) {
          openConnectModal();
        }
        if (burnAmount === "") {
          console.log("Enter amount to migrate");
          showToast("Enter amount to migrate", ToastSeverity.warning);
          return;
        }
        const newTokenAddress = fetchAddressForChain(walletChain?.id, "newToken");
        const oftTokenContract = new Contract(
          newTokenAddress,
          oftAbi,
          ethersSigner
        );
        let amount = parseEther(burnAmount);
        setTxButton(BurnTxProgress.burning);
        setTxProgress(true);
        try {
          const burnTx = await oftTokenContract.burn(
            //tokenAddress,
            amount
          );
          setBurnTxHash(burnTx.hash);
          console.log(burnTx, burnTx.hash);
          await burnTx.wait();
          setTxButton(BurnTxProgress.default);
          setTxProgress(false);
          refetchTransactions();
          fetchSupplies();
        } catch (err) {
          console.log(err);
          setTxButton(BurnTxProgress.default);
          setTxProgress(false);
          showToast("Burn Failed!", ToastSeverity.error);
          return;
        }
      };
    
    
    return (
        <div className="top_bar">
            <AppIcon
                url="/images/token/App_new.svg"
                size={2}
                margin={0}
                fill={IconFilter.unset}
            />
            <p className="label">App SUPPLY</p>
            <AppChip
                onClick={openChainModal}
                title={walletChain?.name || "---"}
                endIcon={"/icons/expand_more.svg"}
                startIcon={`/images/token/${walletChain?.nativeCurrency?.symbol}.svg`}
            ></AppChip>
            <AppExtLink
                className=" supply_label"
                url={`${suppliesChain?.blockExplorers?.default?.url}/address/${tokenAddress}`}
            >
                View Contract
            </AppExtLink>
          
        </div>
    );
};

export default BurnStatsContainer