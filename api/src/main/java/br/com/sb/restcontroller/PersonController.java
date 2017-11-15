package br.com.sb.restcontroller;

import br.com.sb.model.CompanyPerson;
import br.com.sb.model.IndividualPerson;
import br.com.sb.model.Person;
import br.com.sb.restcontroller.model.ErrorResult;
import br.com.sb.restcontroller.model.PersonModel;
import br.com.sb.restcontroller.model.Result;
import br.com.sb.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/person")
public class PersonController {

    @Autowired
    private PersonService personService;

    @PostMapping("/create")
    public ResponseEntity create(@RequestBody PersonModel personModel) {
        if (IndividualPerson.TYPE.equalsIgnoreCase(personModel.getPersonType())) {
            Person person = personService.create(personModel.getName(), personModel.getCpf(), personModel.getBirthDate());
            return ResponseEntity.ok(person);
        } else if (CompanyPerson.TYPE.equalsIgnoreCase(personModel.getPersonType())) {
            Person person = personService.create(personModel.getCnpj(), personModel.getCompanyName(), personModel.getFantasyName());
            return ResponseEntity.ok(person);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResult("O campo tipo é obrigatório!", Result.ERROR));
        }

    }

    @GetMapping("/all")
    public ResponseEntity findAll() {
        return ResponseEntity.ok(personService.findAll());
    }
}
