package br.com.sb.restcontroller;

import br.com.sb.exception.AccountException;
import br.com.sb.model.Account;
import br.com.sb.model.AccountTransaction;
import br.com.sb.restcontroller.model.*;
import br.com.sb.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/account")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @PostMapping("/transfer")
    public ResponseEntity transfer(@RequestBody TransferModel transfer) {
        try {
            accountService.transfer(transfer.getFromAccountId(), transfer.getToAccountId(), transfer.getValue());
            return ResponseEntity.ok(true);
        } catch (AccountException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResult(e.getMessage(), Result.ERROR));
        }
    }

    @PostMapping("/create")
    public ResponseEntity create(@RequestBody AccountModel accountModel) {
        try {
            Account account = accountService.createAccount(accountModel.getName(), accountModel.isParent(), accountModel.getParentId(), accountModel.getPersonId());
            return ResponseEntity.ok(account);
        } catch (AccountException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResult(e.getMessage(), Result.ERROR));
        }
    }

    @PostMapping("/activate/{id}")
    public ResponseEntity activate(@PathVariable Long id) {
        return ResponseEntity.ok(accountService.activateAccount(id));
    }

    @PostMapping("/block/{id}")
    public ResponseEntity block(@PathVariable Long id) {
        return ResponseEntity.ok(accountService.blockAccount(id));
    }

    @PostMapping("/cancel/{id}")
    public ResponseEntity cancel(@PathVariable Long id) {
        return ResponseEntity.ok(accountService.cancelAccount(id));
    }

    @PostMapping("/charge/{id}")
    public ResponseEntity charge(@PathVariable Long id, @RequestBody ChargeModel charge) {
        return ResponseEntity.ok(accountService.charge(id, charge.getValue()));
    }

    @GetMapping("/all")
    public ResponseEntity findAll() {
        return ResponseEntity.ok(accountService.findAll());
    }

}
