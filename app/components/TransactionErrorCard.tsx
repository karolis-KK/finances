import { Transaction } from "@/types/finance"

type TransactionErroCardProps = {
  handleIsOpenTransactionErrorCard: (transactionId: string) => void,
  transaction: Transaction
}

export default function TransactionErrorCard({handleIsOpenTransactionErrorCard, transaction}: TransactionErroCardProps) {
  return (
    <div className="h-screen fixed flex justify-center items-center inset-0 bg-black/40 z-100">
      <div className="bg-[#252422] rounded-md flex flex-col gap-2 p-4 md:w-auto mr-3 ml-3 md:mr-0 md:ml-0 w-full">
        <h1 className="md:text-2xl text-lg font-bold text-[#fffcf2]">Error!</h1>
        <h1 className="text-[#fffcf2] md:text-lg text-sm pb-2 flex items-center md:justify-center justify-start">Transaction is {} overbudget</h1>
        <button onClick={() => handleIsOpenTransactionErrorCard(transaction.id)} className="bg-[#fffcf2] text-[#403d39] hover:bg-[#fffcf2]/70 hover:cursor-pointer rounded-md p-2">Close</button>
      </div>
    </div>
  )
}