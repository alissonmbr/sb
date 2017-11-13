package br.com.sb.repository;

import br.com.sb.model.CompanyPerson;
import org.springframework.data.repository.CrudRepository;

public interface CompanyPersonRepository extends CrudRepository<CompanyPerson, Long> {
}
