package com.appbank.services;

import com.appbank.models.User;
import java.util.List;

public interface IUserService {
 
    List<User> getAllUsers();

    User getUserFromEmail(String email);

    User getUserFromUserid(Integer userid);

    User addUserFromEmail(String email, boolean isAdmin);

    User saveUser(User user);
    
}
