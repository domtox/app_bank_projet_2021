package com.appbank.models;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

// A faire plus tard... D'abord le login administrator / user +
// lien avec le react.

@Entity // This tells Hibernate to make a table out of this class
public class Account {
    /** 
     * id : primary key, numero de compte
    */
    private Integer proprietaireID;

    @Id    
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    private boolean canBeOverdraft = false; //Autorisation de decouvert

    private int solde;

    public Integer getProprietaireID() {
        return proprietaireID;
    }
    
    public Integer getId() {
        return id;
    }

    public int getSolde() {
        return solde;
    }

    public void setProprietaireID(Integer id) {
        this.proprietaireID = id;
    }

    public void setId(Integer id) {
        this.id=id;
    }

    public void setSolde(int solde) {
        this.solde=solde;
    }

    public boolean getCanBeOverdraft() {
        return canBeOverdraft;
    }

    public void setCanBeOverdraft(boolean canBeOverdraft) {
        this.canBeOverdraft=canBeOverdraft;
    }

}

