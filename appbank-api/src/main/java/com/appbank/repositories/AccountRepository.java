package com.appbank.repositories;

import org.springframework.data.repository.CrudRepository;
import com.appbank.models.Account;

public interface AccountRepository extends CrudRepository<Account, Integer> {

}
