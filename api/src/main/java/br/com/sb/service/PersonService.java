package br.com.sb.service;

import br.com.sb.model.CompanyPerson;
import br.com.sb.model.IndividualPerson;
import br.com.sb.model.Person;
import br.com.sb.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;

@Service
public class PersonService {

    @Autowired
    private PersonRepository personRepository;

    @Transactional
    public Iterable<Person> findAll() {
        return personRepository.findAll();
    }

    @Transactional
    public Person findById(Long id) {
        return personRepository.findOne(id);
    }

    @Transactional
    public Person save(Person person) {
        return personRepository.save(person);
    }

    @Transactional
    public Person create(String name, String cpf, Date birthDate) {
        IndividualPerson person = new IndividualPerson();
        person.setType(IndividualPerson.TYPE);
        person.setName(name);
        person.setCpf(cpf);
        person.setBirthDate(birthDate);
        return save(person);
    }

    @Transactional
    public Person create(String cnpj, String companyName, String fantasyName) {
        CompanyPerson person = new CompanyPerson();
        person.setType(IndividualPerson.TYPE);
        person.setCnpj(cnpj);
        person.setCompanyName(companyName);
        person.setFantasyName(fantasyName);
        return save(person);
    }

}
