package br.com.sb.service;

import br.com.sb.exception.AccountException;
import br.com.sb.model.Account;
import br.com.sb.model.AccountStatus;
import br.com.sb.model.AccountTransactionType;
import br.com.sb.model.Person;
import br.com.sb.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private PersonService personService;

    @Autowired
    private AccountTransactionService accountTransactionService;

    @Transactional
    public Iterable<Account> findAll() {
        return accountRepository.findAll();
    }

    @Transactional
    public Account findById(Long id) {
        return accountRepository.findOne(id);
    }

    @Transactional
    public Account saveAccount(Account account) {
        return accountRepository.save(account);
    }

    @Transactional
    public Account createAccount(String name, boolean parent, Long parentId, Long personId) throws AccountException {
        Person person = personService.findById(personId);
        if (person == null) {
            throw new AccountException("Pessoa não encontrada!");
        }

        Account parentAccount = null;
        if (parent) {
            parentAccount = accountRepository.findOne(parentId);
            if (parentAccount == null) {
                throw new AccountException("Conta não encontrada!");
            }
        }

        Account account = new Account();
        account.setName(name);
        account.setParent(parent);
        account.setParentAccount(parentAccount);
        account.setPerson(person);
        account.setCreationDate(new Date());
        account.setAmount(0.0);
        account.setAccountStatus(AccountStatus.ACTIVE);

        return saveAccount(account);
    }

    @Transactional
    public Account activateAccount(Long id) {
        Account account = findById(id);
        account.setAccountStatus(AccountStatus.ACTIVE);
        return saveAccount(account);
    }

    @Transactional
    public Account blockAccount(Long id) {
        Account account = findById(id);
        account.setAccountStatus(AccountStatus.BLOCKED);
        return saveAccount(account);
    }

    @Transactional
    public Account cancelAccount(Long id) {
        Account account = findById(id);
        account.setAccountStatus(AccountStatus.CANCELED);
        return saveAccount(account);
    }

    @Transactional
    public Account charge(Long id, Double value) {
        Account account = findById(id);
        account.setAmount(account.getAmount() + value);
        accountTransactionService.create(null, account, value, null, AccountTransactionType.CHARGE);
        return saveAccount(account);
    }

    @Transactional
    public void transfer(Long fromAccountId, Long toAccountId, Double value) throws AccountException {
        Account fromAccount = accountRepository.findOne(fromAccountId);
        Account toAccount = accountRepository.findOne(toAccountId);

        if (!fromAccount.getAccountStatus().equals(AccountStatus.ACTIVE) || !toAccount.getAccountStatus().equals(AccountStatus.ACTIVE)) {
            throw new AccountException("Conta deve estar ativa!");
        }

        if (isAncestral(toAccount, fromAccountId)) {
            if (value >= fromAccount.getAmount()) {
                fromAccount.setAmount(fromAccount.getAmount() - value);
                toAccount.setAmount(toAccount.getAmount() + value);
                accountTransactionService.create(fromAccount, toAccount, value, null, AccountTransactionType.CHARGE);
            }
        } else {
            throw new AccountException("A conta deve estar na mesma hierarquia!");
        }
    }

    private boolean isAncestral(Account parent, long ancestralId) {
        if (parent.getId().equals(ancestralId)) {
            return true;
        } else if (parent.isParent()) {
            return false;
        } else {
            return isAncestral(parent.getParentAccount(), ancestralId);
        }
    }

}
