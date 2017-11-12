package br.com.sb.service;

import br.com.sb.model.Account;
import br.com.sb.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Transactional
    public Account createAccount(Account account) {
        return accountRepository.save(account);
    }

    @Transactional
    public void deleteAccount(Long id) {
        accountRepository.delete(id);
    }

    /*
    Toda Conta Filial pode efetuar transferências desde que a conta que receberá a transferência esteja debaixo da mesma árvore e não seja uma conta Matriz.
    A Conta Matriz não pode receber transferências de outras contas, apenas Aportes que devem possuir um código alfanumérico único.
    Toda transação pode ser estornada (no caso de um estorno de um Aporte é necessário informar o código alfanumérico para que a transação possa ser estornada).
    Apenas as Contas Ativas podem receber Cargas ou Transferências
     */
    @Transactional
    public void transfer(Long fromAccountId, Long toAccountId, Double value) {
        Account fromAccount = accountRepository.findOne(fromAccountId);
        Account toAccount = accountRepository.findOne(fromAccountId);

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
