package com.appbank.models;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity // This tells Hibernate to make a table out of this class
//@IdClass (UserId.class) // When an entity has multiple primary key fields (requiered!)
@Table (name="user", uniqueConstraints = {@UniqueConstraint(columnNames={"email"})})
public class User {
    /**
     * id : primary key genere automatiquement
     */
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id; 
    /**
     * email : unique
     */
    @Column(name="email", unique=true)
    private String email; 

    @Column(name="isAdmin")
    private boolean isAdmin;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean getIsAdmin () {
        return isAdmin;
    }
    
    public void setIsAdmin (boolean isAdmin) {
        this.isAdmin = isAdmin;
    }
    
}


