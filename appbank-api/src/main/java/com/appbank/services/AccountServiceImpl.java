package com.appbank.services;

import com.appbank.models.Account;
import com.appbank.repositories.AccountRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;

@Service
public class AccountServiceImpl implements IAccountService {
    
    private AccountRepository accountRepository;

    public AccountServiceImpl (AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public Iterable <Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    @Override
    public List <Account> getAccountsFromUserid (Integer userid) {
        List <Account> accounts = new ArrayList <> ();
        for (Account account : accountRepository.findAll()) {
            if (account.getProprietaireID().equals(userid)) {
                accounts.add(account);
            }
        }
        return accounts;
    }

    @Override
    public Account addAccountFromUserid (Integer userid) {
        Account account = new Account();
        account.setProprietaireID(userid);
        return accountRepository.save(account);
    }

    @Override
    public Account getAccountFromAccountId (Integer accountId) {
        return accountRepository.findById(accountId).get();

    }

    @Override
    public boolean addMoneyToAccount (Integer accountId, int moneyToAdd) {
        Account account = accountRepository.findById(accountId).get();
        if (account == null) {
            return false;
        }
        account.setSolde(account.getSolde()+moneyToAdd);
        accountRepository.save(account);
        return true;
    }

    @Override
    public boolean removeMoneyToAccount (Integer accountId, int moneyToRemove) {
        Account account = accountRepository.findById(accountId).get();
        if (account == null) {
            return false;
        }
        if (moneyToRemove > account.getSolde() && !account.getCanBeOverdraft()) {
            return false;
        }
        account.setSolde(account.getSolde()-moneyToRemove);
        accountRepository.save(account);
        return true;
    }

    @Override
    public boolean removeAccountFromAccountId (Integer accountId) {
        Account account = accountRepository.findById(accountId).get();
        if (account != null) {
            accountRepository.delete(account);
            return true;
        }
        return false;
    }

    public boolean bankTransfer (Integer accountIdSrc, Integer accountIdDst, int moneyToTransfer) {
        //Verfier si les comptes sont bien enregistres dans la bdd
        //A faire : la gestion des virements par l'administrateur ?
        //Pas besoin de verifier si le nombre est positif : sera fait dans les fonctions a appeler
        if (!removeMoneyToAccount(accountIdSrc, moneyToTransfer)) {
            return false;
        }
        return addMoneyToAccount(accountIdDst, moneyToTransfer);
    }

    @Override
    public Integer getProprietaireId (Integer accountId) {
        Account account = getAccountFromAccountId(accountId);
        return account.getProprietaireID();
    }

}
