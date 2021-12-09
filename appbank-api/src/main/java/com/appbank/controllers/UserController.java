package com.appbank.controllers;

import java.util.List;

import com.appbank.models.User;
import com.appbank.services.IUserService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 * GET /api/users : getAllUsers -> Return all users filtered by lastname with pagination (to do)
 * POST /api/users : addNewUser -> Create new user 
 * 
 * GET /api/users/{id} : getUserFromId -> Find single user that matched {id}
 * PUT /api/users/{id} : updateUserFromId -> Update user with the id {id}
 * DELETE /api/users/{id} : deleteUserFromId -> delete the user associate with the {id}
 * 
 * PUT /api/users/login : synchronizeDatabaseWithKeycloak -> synchronize keycloak and our database with the
 * email of the user that log in 
 */
@CrossOrigin(origins={ "http://localhost:3000"})
@RestController
@RequestMapping(path="/api/users")
public class UserController {

    /*@Autowired
    private UserRepository userRepository;*/
    private IUserService userService;

    public UserController (IUserService userService) {
        this.userService=userService;
    }

     /**
     * Avoir la liste des utilisateurs filtre par nom de famille.
     * Si aucun nom de famille n'est précisé, renvoie la liste de tous les
     * users.
     * Ne peut etre appelee que depuis un compte administrateur.
     * @return 200 OK + la liste des utilisateurs
     */
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers(
        @RequestParam(value="page", defaultValue="1") int pageNumber,
        @RequestParam(required = false) String lastName) {
        return ResponseEntity.ok().body(userService.getAllUsers());
    }

    @PutMapping(path="/synchronize")
    public ResponseEntity<User> synchronizeDatabaseWithKeycloak (@RequestParam (value="email") String email, @RequestParam (value="isAdmin") String isAdmin) {
        //Si le user n'est pas dans la base de donnees de appbank mais est dans keycloak
        boolean booleanIsAdmin = Boolean.parseBoolean(isAdmin);
        User user = userService.getUserFromEmail(email);
        if (user==null) {
            //Il faut le rajouter dans la bdd de appbank
            user = userService.addUserFromEmail(email,booleanIsAdmin);
        }
        if (booleanIsAdmin && !user.getIsAdmin()) {
            System.out.println("synchronize "+booleanIsAdmin);
            user.setIsAdmin(booleanIsAdmin);
            userService.saveUser(user); // n'est pas sensé en recréer un nouveau
        }
        return ResponseEntity.ok().body(user); 
    }

    // /**
    //  * Recuperer un utilisateur à partir de son id.
    //  * @param userid
    //  * @return 200 OK si l'utilisateur existe + l'utilisateur, 404 not found sinon.
    //  */
    // @GetMapping(path="/{email}")
    // public ResponseEntity<User> getUserFromEmail (@PathVariable("email") String email) {
    //     return ResponseEntity.of(userService.getUserFromEmail()); 
    //     //findById : Optional<User> : may content or not a user
    //     //of : 200 OK if it has a body, 404 else
    // }

    // /**
    //  * Ajouter un nouvel utilisateur dans la base de donnees.
    //  * Ne peut etre appelee que depuis un compte administrateur.
    //  * @param firstName : le prenom de l'utilisateur
    //  * @param lastName : le nom de famille de l'utilisateur
    //  * @param email : l'adresse mail (ne doit pas etre deja presente dans la base de donnees)
    //  * @return "Saved" si successful, error sinon
    //  */
    // @PostMapping
    // public @ResponseBody ResponseEntity<User> addNewUser (@RequestParam String firstName , @RequestParam String lastName, @RequestParam String email) {
    //     User newUser = new User();
    //     newUser.setEmail(email);
    //     userRepository.save(newUser);

    //     URI location = ServletUriComponentsBuilder.fromCurrentRequest()
    //         .path("/{id}")
    //         .buildAndExpand(newUser.getId())
    //         .toUri();

    //     return ResponseEntity.created(location).body(newUser); //200 
    // }  
    // /**
    //  * Met a jour tous les champs de l'utilisateur à partir de son id.
    //  * Si l'utilisateur n'existe pas dans la base de donnees, on le crée
    //  * avec l'id correspondant à {id}
    //  * (Ne met pas à jour son id)
    //  */
    // @PutMapping(path="/{id}")
    // public ResponseEntity<User> updateUserFromId (@PathVariable("id") Integer userid, @RequestParam String firstName,
    // @RequestParam String lastName, @RequestParam String email) {
    //     Optional<User> optUser = userRepository.findById(userid)
    //         .map(oldUser -> {
    //             oldUser.setEmail(email);
    //             return userRepository.save(oldUser);
    //         });
    //     return optUser.map(value -> ResponseEntity.ok().body(value))
    //         .orElseGet(() -> {
    //             User newUser = new User();
    //             newUser.setId(userid);
    //             newUser.setEmail(email);
    //             URI location = ServletUriComponentsBuilder.fromCurrentRequest()
    //                 .path("/{id}")
    //                 .buildAndExpand(newUser.getId())
    //                 .toUri();
    //             return ResponseEntity.created(location).body(newUser);

    //         });
    // }

    // @DeleteMapping(path="/{id}")
    // public ResponseEntity<User> deleteUserFromId (@PathVariable("id") Integer userid) {
    //     userRepository.deleteById(userid);
    //     return ResponseEntity.noContent().build();
    // }

   
    
}
