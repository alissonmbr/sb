package br.com.sb.restcontroller;

import br.com.sb.repository.AccountRepository;
import br.com.sb.repository.CompanyPersonRepository;
import br.com.sb.repository.IndividualPersonRepository;
import br.com.sb.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
public class AccountController {

    @Autowired
    private CompanyPersonRepository companyPersonRepository;

    @Autowired
    private IndividualPersonRepository individualPersonRepository;

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private AccountRepository accountRepository;


    @RequestMapping("/greeting")
    public HashMap<String, Object> greeting(@RequestParam(value = "name", defaultValue = "World") String name) {
        HashMap<String, Object> test = new HashMap<>();
        test.put("person", personRepository.findAll());
        test.put("company", companyPersonRepository.findAll());
        test.put("individual", individualPersonRepository.findAll());
        test.put("account", accountRepository.findAll());
        return test;
    }

}
