package com.shop.user_ms.service;

import com.shop.user_ms.dto.AddressDTO;
import com.shop.user_ms.dto.ContactDetailsDTO;
import com.shop.user_ms.exception.AddressNotFoundException;
import com.shop.user_ms.exception.UserNotFoundException;
import com.shop.user_ms.model.Address;
import com.shop.user_ms.model.ContactDetails;

import java.util.List;

public interface UserService {

    public ContactDetails addUser(ContactDetailsDTO contactDetailsDTO);

    public List<ContactDetails> getAllUsers();

    public ContactDetails addAddressByContactID(int contactID, AddressDTO addressDTO) throws UserNotFoundException;

    public ContactDetails updateAddressByContactID(int contactID, int addressID, AddressDTO addressDTO) throws UserNotFoundException, AddressNotFoundException;

    public String deleteAddressByContactID(int contactID, int addressID) throws AddressNotFoundException, UserNotFoundException;

    public List<Address> getAllAddressesByContactID(int contactID) throws AddressNotFoundException, UserNotFoundException;

    //! Add a method to validateLogin
    //! Add a method to validateLogin
    //! Add a method to validateLogin

}
