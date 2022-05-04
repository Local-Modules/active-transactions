import React, { createContext, useContext, useState, useMemo } from 'react'
import type { ContractTransaction } from 'ethers'


type Tx = {
  name: string
  hash: string
  receipt: ContractTransaction
}

type ActionsState = {
  addTransaction: (name: string, receipt: ContractTransaction) => void
}

export const StateContext = createContext<Tx[]>([])
export const ActionsContext = createContext<ActionsState>(null as unknown as ActionsState)

export const useTx = () => useContext(StateContext)
export const useTxActions = () => useContext(ActionsContext)

type TxProviderProps = {
  children: any
}

export const TxProvider: React.FC<TxProviderProps> = ({ children }) => {
  const [ transactions, setTransactions ] = useState<Tx[]>([])

  const actions: ActionsState = useMemo(() => {
    const removeTransaction = (hash: string) => {
      setTransactions(transactions.filter((tx) => tx.hash !== hash))
    }

    const addTransaction: ActionsState['addTransaction'] = async (name, receipt) => {
      try {
        setTransactions((state) => [
          ...state,
          {
            name,
            receipt,
            hash: receipt.hash,
          },
        ])

        await receipt.wait()
      }
      finally {
        removeTransaction(receipt.hash)
      }
    }

    return {
      addTransaction,
    }
  }, [])

  return (
    <StateContext.Provider value={transactions}>
      <ActionsContext.Provider value={actions}>
        {children}
      </ActionsContext.Provider>
    </StateContext.Provider>
  )
}
