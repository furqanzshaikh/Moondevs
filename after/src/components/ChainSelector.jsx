
const ChainSelector = () => {


    const {
        walletAddress,
        isWalletConnected,
        walletBalance,
        isBalanceError,
        openChainModal,
        walletChain,
        chains,
        openConnectModal,
      } = useWallet();
    const { openChainSelector, setOpenChainSelector, openChainSelectorModal } =
    useChainSelector();
    const { chains: receiveChains } = useWallet();


    const {
    supplies,
    allSupplies,
    setSuppliesChain,
    suppliesChain,
    fetchSupplies,
  } = useAppSupplies(true);



  return (

    <div>
        
      <ChainSelector
        title={"Switch Token Chain"}
        openChainSelector={openChainSelector}
        setOpenChainSelector={setOpenChainSelector}
        chains={receiveChains}
        selectedChain={suppliesChain}
        setSelectedChain={setSuppliesChain}
      />
    </div>
  )
}

export default ChainSelector




