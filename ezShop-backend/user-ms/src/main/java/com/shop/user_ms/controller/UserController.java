package com.shop.user_ms.controller;

import com.shop.user_ms.dto.AddressDTO;
import com.shop.user_ms.dto.ContactDetailsDTO;
import com.shop.user_ms.exception.AddressNotFoundException;
import com.shop.user_ms.exception.UserNotFoundException;
import com.shop.user_ms.model.Address;
import com.shop.user_ms.model.ContactDetails;
import com.shop.user_ms.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    //* Will be used by USER(customer) and ADMIN
    @PostMapping("/")
    public ResponseEntity<ContactDetails> createUser(@RequestBody @Valid ContactDetailsDTO contactDetailsDTO){
        return new ResponseEntity<>(userService.addUser(contactDetailsDTO), HttpStatus.CREATED);
    }

    //* Will be used by ADMIN
    @GetMapping("/")
    public ResponseEntity<List<ContactDetails>> getAllUsers(){
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    //* Will be used by USER(customer) and SELLER
    @PostMapping("/{contactID}/address")
    public ResponseEntity<ContactDetails> addAddressByContactID(@PathVariable @Valid int contactID,
                                                                @RequestBody @Valid AddressDTO addressDTO)
            throws UserNotFoundException {
        return new ResponseEntity<>(userService.addAddressByContactID(contactID, addressDTO), HttpStatus.CREATED);
    }

    //* Will be used by USER(customer) and SELLER
    @PutMapping("/{contactID}/address/{addressID}")
    public ResponseEntity<ContactDetails> updateAddressByContactID(@PathVariable @Valid int contactID,
                                                                   @PathVariable @Valid int addressID,
                                                                   @RequestBody @Valid AddressDTO addressDTO)
            throws UserNotFoundException, AddressNotFoundException {
        return new ResponseEntity<>(userService.updateAddressByContactID(contactID, addressID, addressDTO),
                HttpStatus.OK);
    }

    //* Will be used by USER(customer) and SELLER
    @DeleteMapping("/{contactID}/address/{addressID}")
    public ResponseEntity<String> deleteAddressByContactID(@PathVariable @Valid int contactID,
                                                           @PathVariable @Valid int addressID)
            throws UserNotFoundException, AddressNotFoundException {
        return new ResponseEntity<>(userService.deleteAddressByContactID(contactID, addressID), HttpStatus.OK);
    }

    //* Will be used by USER(customer) and SELLER
    @GetMapping("/{contactID}/address")
    public ResponseEntity<List<Address>> getAllAddressesByContactID(@PathVariable @Valid int contactID)
            throws UserNotFoundException, AddressNotFoundException {
        return new ResponseEntity<>(userService.getAllAddressesByContactID(contactID), HttpStatus.OK);
    }

    //! Add a method to validateLogin
    //! Add a method to validateLogin
    //! Add a method to validateLogin

}
