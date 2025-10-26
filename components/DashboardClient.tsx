"use client";

import Link from "next/link";
import TransactionCard from "@/components/TransactionCard";
import { use, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddTransactionDialog } from "@/components/AddTransactionDialog";
import { transactionType } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SemiCircleProgressBar } from "@/components/SemiCircleProgressBar";

type DashboardPageProps = {
  data: Promise<{
    transactions: transactionType[];
    totalIncome: number;
    totalExpense: number;
    safeToSpend: number;
  }>;
};

export default function DashboardClient({ data }: DashboardPageProps) {
  const { transactions, totalIncome, totalExpense, safeToSpend } = use(data);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <div className="mx-4">
        <SemiCircleProgressBar
          totalAmount={totalIncome || 0}
          spentAmount={totalExpense || 0}
          safeToSpend={safeToSpend || 0}
        />
      </div>

      <div className="grid grid-cols-2 m-2 p-3 text-xs font-normal">
        <div>Recent Transactions</div>
        <div className="text-right underline decoration-white/25">
          <Link href="/transactions">View All</Link>
        </div>
      </div>

      <ScrollArea className="">
        <div>
          {transactions && transactions.length > 0 ? (
            transactions.map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))
          ) : (
            <div className="text-white text-center py-4">
              No transactions found.
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="fixed bottom-24 right-4">
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="rounded-full bg-appbar-blue hover:bg-appbar-blue/90 text-white h-14 w-14"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      <AddTransactionDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        className="transition-transform duration-300 ease-in-out transform"
      />
    </>
  );
}
