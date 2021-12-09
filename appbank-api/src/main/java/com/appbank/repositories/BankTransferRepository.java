package com.appbank.repositories;

import org.springframework.data.repository.CrudRepository;
import com.appbank.models.BankTransfer;

public interface BankTransferRepository extends CrudRepository<BankTransfer, Integer> {

}