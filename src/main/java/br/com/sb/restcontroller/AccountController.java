package br.com.sb.restcontroller;

import br.com.sb.exception.AccountException;
import br.com.sb.model.Account;
import br.com.sb.restcontroller.model.*;
import br.com.sb.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/account")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @RequestMapping("/greeting")
    public HashMap<String, Object> greeting(@RequestParam(value = "name", defaultValue = "World") String name) {
        HashMap<String, Object> test = new HashMap<>();
        test.put("account", accountService.findAll());
        return test;
    }

    @PostMapping("/transfer")
    public Result transfer(@ModelAttribute TransferModel transfer) {
        try {
            accountService.transfer(transfer.getFromAccountId(), transfer.getToAccountId(), transfer.getValue());
            return new SuccessResult<Boolean>(true, Result.SUCCESS);
        } catch (AccountException e) {
            return new ErrorResult(e.getMessage(), Result.ERROR);
        }
    }

    @PostMapping("/create")
    public Result create(@ModelAttribute AccountModel account) {
        try {
            accountService.createAccount(account.getName(), account.isParent(), account.getParentId(), account.getPersonId());
            return new SuccessResult<Boolean>(true, Result.SUCCESS);
        } catch (AccountException e) {
            return new ErrorResult(e.getMessage(), Result.ERROR);
        }
    }

    @PostMapping("/activate/{id}")
    public Result activate(@PathVariable Long id) {
        return new SuccessResult<Account>(accountService.activateAccount(id), Result.SUCCESS);
    }

    @PostMapping("/block/{id}")
    public Result block(@PathVariable Long id) {
        return new SuccessResult<Account>(accountService.blockAccount(id), Result.SUCCESS);
    }

    @PostMapping("/cancel/{id}")
    public Result cancel(@PathVariable Long id) {
        return new SuccessResult<Account>(accountService.cancelAccount(id), Result.SUCCESS);
    }

    @PostMapping("/charge/{id}")
    public Result charge(@PathVariable Long id, @ModelAttribute ChargeModel charge) {
        return new SuccessResult<Account>(accountService.charge(id, charge.getValue()), Result.SUCCESS);
    }

}
