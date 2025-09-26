import React from "react";
import Image from "next/image";
import { formatRelativeDate } from "@/lib/formatDate";

export interface transactionCardTypes {
  transaction: {
    id: number;
    title: string;
    description: string;
    amount: number;
    type: string;
    category_id: number;
    user_id: string;
    created_at: string;
    updated_at: string;
  };
}

export default function transactionCard({ transaction }: transactionCardTypes) {
  const backgroundColor =
    transaction.type == "income"
      ? "from-transaction-card-background-1 from-30% to-transaction-card-background-2 to-80%"
      : "from-transaction-card-background-1 from-30% to-transaction-card-background-3 to-90%";
  const textColor =
    transaction.type == "income"
      ? "text-font-transaction-green"
      : "text-font-transaction-red";
  return (
    <div
      className={`shadow-2xl border-none rounded-full bg-gradient-to-r ${backgroundColor} justify-self-center w-full max-w-sm text-white mt-3`}
    >
      <div className="p-0 py-0 m-0 h-auto">
        <div className="flex flex-row">
          <div className="rounded-full justify-start align-middle p-4 bg-gradient-to-r from-transaction-card-symbol-background-1 to-transaction-card-symbol-background-2">
            <Image
              src={`/currency_rupee.svg`}
              alt="rupee"
              width={30}
              height={30}
            />
          </div>
          <div className="w-full max-w-56 flex flex-col pl-7 pt-1.5">
            <span className="font-bold text-xs">{transaction.title}</span>
            <span className="font-light text-[10px]">
              {transaction.description}
            </span>
            <span className="font-extralight text-[8px]">
              {formatRelativeDate(transaction.created_at)}
            </span>
          </div>
          <div className="content-center p-2">
            <span className={`${textColor} font-light text-lg`}>
              &#8377; {transaction.amount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
