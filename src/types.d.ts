import type { ContractTransaction } from 'ethers'

export type Tx = {
  name: string
  hash: string
  receipt: ContractTransaction
}

export type ActionsState = {
  addTransaction: (name: string, receipt: ContractTransaction) => void
}
