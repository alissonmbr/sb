package br.com.sb.service;

import br.com.sb.model.Person;
import br.com.sb.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

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

}
