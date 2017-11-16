package br.com.sb.service;

import br.com.sb.Application;
import br.com.sb.exception.AccountException;
import br.com.sb.model.Account;
import br.com.sb.model.Person;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.util.Assert;

import javax.annotation.PostConstruct;

@RunWith(SpringJUnit4ClassRunner.class)
@TestPropertySource(locations = "classpath:test.properties")
@SpringBootTest(classes = Application.class)
@WebAppConfiguration
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class AccountServiceTest {

    @Autowired
    private AccountService accountService;

    @Autowired
    private PersonService personService;

    private Person personTest;
    private Account parentAccount;
    private Account childrenAccount;

    @PostConstruct
    public void init() throws AccountException {
        personTest = personService.create("123456789", "Company Account test", "Company Account test Fantasy");
        parentAccount = accountService.createAccount("Account Parent", true, null, this.personTest.getId());
        childrenAccount = accountService.createAccount("Account Children", false, this.parentAccount.getId(), this.personTest.getId());
        parentAccount = accountService.charge(this.parentAccount.getId(), 100.0);
    }

    @Test
    public void test1_accountCreate() throws AccountException {
        Account account = accountService.createAccount("Account Test", true, null, this.personTest.getId());
        Assert.notNull(account);
        Assert.notNull(account.getId());
    }

    @Test
    public void test2_childrenAccountCreate() throws AccountException {
        Account account = accountService.createAccount("Account Test", false, this.parentAccount.getId(), this.personTest.getId());
        Assert.notNull(account);
        Assert.notNull(account.getId());
    }

    @Test
    public void test3_parentAccountCharge() {
        Account account = accountService.charge(this.parentAccount.getId(), 100.0);
        Assert.isTrue(account.getAmount().equals(200.0));
    }

    @Test
    public void test4_transferFromParentToChildren() throws AccountException {
        Account parentAccount = accountService.findById(this.parentAccount.getId());
        Account childrenAccount = accountService.findById(this.childrenAccount.getId());

        accountService.transfer(parentAccount.getId(), childrenAccount.getId(), 20.0);
        parentAccount = accountService.findById(this.parentAccount.getId());
        childrenAccount = accountService.findById(this.childrenAccount.getId());
        Assert.isTrue(parentAccount.getAmount().equals(80.0));
        Assert.isTrue(childrenAccount.getAmount().equals(20.0));
    }
}
