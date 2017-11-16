package br.com.sb.service;

import br.com.sb.Application;
import br.com.sb.model.Person;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.util.Assert;

@RunWith(SpringJUnit4ClassRunner.class)
@TestPropertySource(locations = "classpath:test.properties")
@SpringBootTest(classes = Application.class)
@WebAppConfiguration
public class PersonServiceTest {

    @Autowired
    private PersonService personService;

    @Test
    public void createPerson() {
        Person person = personService.create("123456789", "Company 1", "Company Fantasy");

        Person person2 = personService.findById(person.getId());
        Assert.notNull(person2, "");
    }
}
