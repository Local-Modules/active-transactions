import { useTransactionsState } from './useTransactionsState'
import { createContext } from 'react'
import type { Tx, ActionsState } from './types'


export const StateContext = createContext<Tx[]>(null)
export const ActionsContext = createContext<ActionsState>(null)

export const TxContext = ({ children, state, actions }) => (
  <StateContext.Provider value={state}>
    <ActionsContext.Provider value={actions}>
      {children}
    </ActionsContext.Provider>
  </StateContext.Provider>
)

export default ({ children }) => {
  const [ state, actions ] = useTransactionsState()

  return (
    <TxContext state={state} actions={actions}>
      {children}
    </TxContext>
  )
}
