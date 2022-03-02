import { useTransactionsState } from './useTransactionsState'
import React, { FC, createContext } from 'react'
import type { Tx, ActionsState } from './types'

export const TxContext: FC<{ state: Tx[], actions: ActionsState }> = ({ children, state, actions }) => (
  <StateContext.Provider value={state}>
    <ActionsContext.Provider value={actions}>
      {children}
    </ActionsContext.Provider>
  </StateContext.Provider>
)

const Wrapper: FC = ({ children }) => {
  const [ state, actions ] = useTransactionsState()

  return (
    <TxContext state={state} actions={actions}>
      {children}
    </TxContext>
  )
}

export const StateContext = createContext<Tx[]>([])
export const ActionsContext = createContext<ActionsState>(null as unknown as ActionsState)

export default Wrapper
