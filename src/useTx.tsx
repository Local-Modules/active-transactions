import { useContext } from 'react'

import { StateContext } from './TxProvider'


const useTx = () => useContext(StateContext)


export default useTx
