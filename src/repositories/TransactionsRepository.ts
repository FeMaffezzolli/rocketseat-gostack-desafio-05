import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateData {
  title: string;
  value: number;
  type: 'outcome' | 'income';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((acc, transaction) => {
      if (transaction.type === 'income') {
        return acc + transaction.value;
      }
      return acc;
    }, 0);

    const outcome = this.transactions.reduce((acc, transaction) => {
      if (transaction.type === 'outcome') {
        return acc + transaction.value;
      }
      return acc;
    }, 0);

    const total = income - outcome;

    return { total, income, outcome };
  }

  public create(data: CreateData): Transaction {
    const transaction = new Transaction(data);

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
