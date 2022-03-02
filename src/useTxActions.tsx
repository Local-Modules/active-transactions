import { useContext } from 'react'

import { ActionsContext } from './TxProvider'


const useTxActions = () => useContext(ActionsContext)


export default useTxActions
