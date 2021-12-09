package com.appbank.services;

import java.util.List;
import java.util.ArrayList;

import com.appbank.models.User;
import com.appbank.repositories.UserRepository;

import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements IUserService {

    private UserRepository userRepository;

    public UserServiceImpl (UserRepository userRepository) {
        this.userRepository=userRepository;
    }

    @Override
    public List <User> getAllUsers() {
        Iterable <User> users = userRepository.findAll();
        List <User> usersList = new ArrayList<>();
        for (User user:users) {
            System.out.println("Get all users : "+user.getIsAdmin());
            if (!user.getIsAdmin()) {
                usersList.add(user);
            }
        }
        // List <User> ret = StreamSupport.stream(users.spliterator(), false) // Pas de parallele
        //     .filter(user -> !user.getIsAdmin()) // On ne rend que les utilisateurs non admin
        //     .collect(Collectors.toList());
        return usersList;
    }

    @Override
    public User getUserFromEmail(String email) {
        for (User user : userRepository.findAll()) {
            if (user.getEmail().equals(email)) {
                return user;
            }
        }
        return null;
    }

    @Override
    public User getUserFromUserid(Integer userid) {
        for (User user : userRepository.findAll()) {
            if (user.getId().equals(userid)) {
                return user;
            }
        }
        return null;
    }

    @Override
    public User addUserFromEmail (String email, boolean isAdmin) {
        User userToAdd = new User ();
        userToAdd.setEmail(email);
        userToAdd.setIsAdmin(isAdmin);
        return userRepository.save(userToAdd);
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }
}
