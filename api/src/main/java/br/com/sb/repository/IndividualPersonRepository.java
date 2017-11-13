package br.com.sb.repository;

import br.com.sb.model.IndividualPerson;
import org.springframework.data.repository.CrudRepository;

public interface IndividualPersonRepository extends CrudRepository<IndividualPerson, Long> {
}
