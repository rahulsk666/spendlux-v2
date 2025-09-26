export interface transactionType {
  id: number;
  title: string;
  description: string;
  amount: number;
  type: string;
  category_id: number;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface getTransactionsType {
  transactions: transactionType[];
  totalItems: number;
}

export interface SemiCircleProgressBarProps {
  totalAmount: number;
  spentAmount: number;
  safeToSpend: number;
  className?: string;
}

export interface ChartDataItem {
  name: string;
  safeToSpend: number;
  spentAmount: number;
}