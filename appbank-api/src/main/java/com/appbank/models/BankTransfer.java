package com.appbank.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity // This tells Hibernate to make a table out of this class
public class BankTransfer {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int id;
    private int idUserSrc;
    /**
     * accountIdSrc : The account that we will remove the money
     */
    private Integer accountIdSrc;
    /**
     * accountIdDst : The account that we will add the money
     */   
    private Integer accountIdDst;
    private int amount;

    public BankTransfer() {}

    public BankTransfer (int idUserSrc, Integer accountIdSrc, Integer accountIdDst, int amount) {
        this.idUserSrc = idUserSrc;
        this.accountIdDst = accountIdDst;
        this.accountIdSrc = accountIdSrc;
        this.amount = amount;
    }

    public int getIdUserSrc() {
        return idUserSrc;
    }

    public void setIdUserSrc(int idUserSrc) {
        this.idUserSrc = idUserSrc;
    }

    public Integer getAccountIdSrc() {
        return accountIdSrc;
    }
    
    public Integer getAccountIdDst() {
        return accountIdDst;
    }

    public int getAmount() {
        return amount;
    }

    public int getId() {
        return id;
    }

    public void setAccountIdSrc(Integer accountIdSrc) {
        this.accountIdSrc = accountIdSrc;
    }

    public void setAccountIdDst(Integer accountIdDst) {
        this.accountIdDst=accountIdDst;
    }

    public void setAmount(int amount) {
        this.amount=amount;
    }
}


