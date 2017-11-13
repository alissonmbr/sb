package br.com.sb.repository;

import br.com.sb.model.AccountTransaction;
import org.springframework.data.repository.CrudRepository;

public interface AccountTransactionRepository extends CrudRepository<AccountTransaction, Long> {
}
