package br.com.sb.service;

import br.com.sb.model.Account;
import br.com.sb.model.AccountTransaction;
import br.com.sb.model.AccountTransactionType;
import br.com.sb.repository.AccountTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class AccountTransactionService {

    @Autowired
    private AccountTransactionRepository accountTransactionRepository;

    @Transactional
    public Iterable<AccountTransaction> findAll() {
        return accountTransactionRepository.findAll();
    }

    @Transactional
    public AccountTransaction findById(Long id) {
        return accountTransactionRepository.findOne(id);
    }

    @Transactional
    public AccountTransaction save(AccountTransaction accountTransaction) {
        return accountTransactionRepository.save(accountTransaction);
    }

    @Transactional AccountTransaction create(Account fromAccount, Account toAccount, Double value, String code, AccountTransactionType type) {
        AccountTransaction accountTransaction = new AccountTransaction();
        accountTransaction.setFromAccount(fromAccount);
        accountTransaction.setToAccount(toAccount);
        accountTransaction.setAmount(value);
        accountTransaction.setCode(code);
        accountTransaction.setAccountTransactionType(type);

        return save(accountTransaction);
    }
}
