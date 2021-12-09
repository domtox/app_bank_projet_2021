package com.appbank.services;

import java.util.List;

import com.appbank.models.Account;

public interface IAccountService {
    /**
     * Get all accounts
     * @param userid 
     * @return
     */
    Iterable <Account> getAllAccounts ();
     /**
     * Get all accounts associate to the proprietaire id.
     * @param userid 
     * @return
     */
    List <Account> getAccountsFromUserid (Integer userid);
    /**
     * Add account with the proprietaire id user id.
     * @param userid
     */
    Account addAccountFromUserid (Integer userid); 
    /**
     * Get account with its id. 
     * @param accountId
     * @return the account if it exists, else null.
     */
    Account getAccountFromAccountId (Integer accountId);
    /**
     * Add money to account. 
     * If the account associate with accountId doesnt exist, it will return false, else true.
     * @param accountId
     * @param moneyToAdd : has to be >= 0
     * @return : True if the money has been added, else false.
     */
    boolean addMoneyToAccount (Integer accountId, int moneyToAdd);
    /**
     * Remove money to account. 
     * It depends on if the user has the rights to remove money.
     * If the account associate with accoutId doesnt exist, of if it doesnt have rights to remove money,
     * then it will return false, true else.
     * @param accountId
     * @param moneyToAdd : has to be >= 0
     * @return : True if the money has been removed, else false.
     */
    boolean removeMoneyToAccount (Integer accountId, int moneyToRemove);
    /**
     * Remove the account with the accountId.
     * @param accountId 
     * @return false if there is no account from accountid, else true.
     */
    boolean removeAccountFromAccountId (Integer accountId);
    Integer getProprietaireId (Integer accountId);
    

}
