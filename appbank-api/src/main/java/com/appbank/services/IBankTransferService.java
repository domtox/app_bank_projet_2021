package com.appbank.services;

import com.appbank.models.BankTransfer;
import java.util.List;

public interface IBankTransferService {
    Iterable <BankTransfer> getAllBankTransfer ();
    /**
     * It will remove the transfer from the table BankTransfert
     * @param bankTransfertId
     * @param validate
     * @return validate
     */
    boolean validateBankTransfer (int bankTransferId, boolean validate);
    BankTransfer getBankTransferFromId(int bankTransferId);
    BankTransfer addNewBankTransfer (int idUserSrc, Integer accountIdSrc, Integer accountIdDst, int amount);
    List <BankTransfer> getAllBankTransfersFromUserId (int userId);
}
