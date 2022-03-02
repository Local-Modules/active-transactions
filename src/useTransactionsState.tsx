import { useState, useMemo } from 'react'
import type { Tx, ActionsState } from './types'


export const useTransactionsState = (): [ Tx[], ActionsState] => {
  const [ transactions, setTransactions ] = useState<Tx[]>([])

  const state: Tx[] = useMemo(() => transactions, [ transactions ])

  const removeTransaction = (hash: string) => {
    const filtered = transactions.filter(tx => tx.hash !== hash)
    setTransactions(filtered)
  }

  const addTransaction: ActionsState['addTransaction'] = async (name, receipt) => {
    setTransactions(prevState => [ ...prevState, { name, receipt, hash: receipt.hash } ])
    try {
      await receipt.wait()
    }
    finally {
      removeTransaction(receipt.hash)
    }
  }

  const actions: ActionsState = useMemo(() => ({ addTransaction }), [])

  return useMemo(() => ([
    state,
    actions,
  ]), [ state, actions ])
}
