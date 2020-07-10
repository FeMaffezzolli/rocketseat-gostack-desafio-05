import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateData {
  title: string;
  value: number;
  type: 'outcome' | 'income';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(data: CreateData): Transaction {
    const { total } = this.transactionsRepository.getBalance();

    if (data.type === 'outcome' && data.value > total) {
      throw new Error('Balance insuficient');
    }

    const transaction = this.transactionsRepository.create(data);
    return transaction;
  }
}

export default CreateTransactionService;
