package com.appbank.controllers;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;

import com.appbank.services.IAccountService;
import com.appbank.services.IBankTransferService;
import com.appbank.models.BankTransfer;

// A faire : sécuriser l'API

/**
 * 1- GET /api/banktransfer : get all transfers (admin only)
 * 3- POST /api/banktransfer : add new banktransfer
 * 
 * Get /api/banktransfer/iduser => get all banktransfer in wainting  of a user
 * 
 * 3- DELETE /api/banktransfer/{bankTransferId} : validate or not a transfer (admin only)
 */

@CrossOrigin(origins={ "http://localhost:3000"})
@RestController
@RequestMapping(path="/api/banktransfer")
public class BankTransferController {

    private IBankTransferService bankTransferService;
    private IAccountService accountService;

    public BankTransferController (IBankTransferService bankTransferService, IAccountService accountService) {
        this.bankTransferService=bankTransferService;
        this.accountService=accountService;
    }

    @GetMapping
    public ResponseEntity <Iterable<BankTransfer>> getAllBankTransfer () {
        return ResponseEntity.ok().body(bankTransferService.getAllBankTransfer());
    }

    @PostMapping
    public ResponseEntity <BankTransfer> addNewBankTransfer (@RequestParam Integer accountIdSrc, @RequestParam Integer accountIdDst, @RequestParam int amount) {
        BankTransfer bankTransfer = bankTransferService.addNewBankTransfer(accountService.getProprietaireId(accountIdSrc), accountIdSrc, accountIdDst, amount);
        if (bankTransfer == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(bankTransfer);
    }

    @GetMapping(path="/{userId}")
    public ResponseEntity <Iterable<BankTransfer>> getAllBankTransfersFromUserId (@PathVariable("userId") int userId) {

        return ResponseEntity.ok().body(bankTransferService.getAllBankTransfer());
    }


    /**
     * * If validate==true => apply the changes on the accounts.
     * Even if the administrator validate the transfer, if the transfer can't be do (because of the deletion of
     * the accounts, or if the account doesnt have the right to be overdraft), the function will return false.
     * @param bankTransferId
     * @return true if the tranfer is a success.Z
     */
    @DeleteMapping(path="/{bankTransferId}")
    public ResponseEntity<Boolean> validateBankTransfer (@PathVariable("bankTransferId") int bankTransferId, @RequestParam String validate) {
        BankTransfer bankTransfer = bankTransferService.getBankTransferFromId (bankTransferId);   
        if (bankTransfer == null) {
            return ResponseEntity.notFound().build();
        }
        boolean booleanValidate = Boolean.parseBoolean(validate);
        if (!booleanValidate) {
            return ResponseEntity.ok().body(false);
        }

        if (! accountService.addMoneyToAccount(bankTransfer.getAccountIdDst(), bankTransfer.getAmount())
            ||! accountService.removeMoneyToAccount(bankTransfer.getAccountIdSrc(), bankTransfer.getAmount()) ) {
            return ResponseEntity.ok().body(false);
        }
        boolean ret =  bankTransferService.validateBankTransfer (bankTransferId, booleanValidate);

        return ResponseEntity.ok().body(ret);
    }
    

   
}
