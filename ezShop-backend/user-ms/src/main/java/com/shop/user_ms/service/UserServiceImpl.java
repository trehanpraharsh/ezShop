package com.shop.user_ms.service;

import com.shop.user_ms.dto.AddressDTO;
import com.shop.user_ms.dto.ContactDetailsDTO;
import com.shop.user_ms.exception.AddressNotFoundException;
import com.shop.user_ms.exception.UserNotFoundException;
import com.shop.user_ms.model.Address;
import com.shop.user_ms.model.ContactDetails;
import com.shop.user_ms.repository.AddressRepo;
import com.shop.user_ms.repository.ContactDetailsRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final ContactDetailsRepo contactDetailsRepo;
    private final AddressRepo addressRepo;

    @Override
    public ContactDetails addUser(ContactDetailsDTO contactDetailsDTO) {
        ContactDetails details = new ContactDetails(
                contactDetailsDTO.getContactName(),
                contactDetailsDTO.getContactEmail(),
                contactDetailsDTO.getContactNumber()
        );

        List<Address> addressList = contactDetailsDTO.getAddresses().stream()
                .map(addressDTO -> {
                    Address address = new Address(
                            addressDTO.getAddressFlatNoAndName(),
                            addressDTO.getAddressStreet(),
                            addressDTO.getAddressCity(),
                            addressDTO.getAddressState(),
                            addressDTO.getAddressCountry(),
                            addressDTO.getAddressPincode()
                    );
                    address.setContactDetails(details); // Set the ContactDetails for each Address
                    return address;
                })
                .toList();

        details.setAddresses(addressList);

        return contactDetailsRepo.save(details);
    }

    @Override
    public List<ContactDetails> getAllUsers() {
        return contactDetailsRepo.findAll();
    }

    @Override
    public ContactDetails addAddressByContactID(int contactID, AddressDTO addressDTO) throws UserNotFoundException {
        ContactDetails contactDetails = contactDetailsRepo.findById(contactID).orElseThrow(
                () -> new UserNotFoundException("No Users found with ID: " + contactID));

        Address address = new Address(
                addressDTO.getAddressFlatNoAndName(),
                addressDTO.getAddressStreet(),
                addressDTO.getAddressCity(),
                addressDTO.getAddressState(),
                addressDTO.getAddressCountry(),
                addressDTO.getAddressPincode()
        );
        address.setContactDetails(contactDetails);

        addressRepo.save(address);
        return contactDetails;

    }

    @Override
    public ContactDetails updateAddressByContactID(int contactID, int addressID, AddressDTO addressDTO)
            throws UserNotFoundException, AddressNotFoundException {
        ContactDetails contactDetails = contactDetailsRepo.findById(contactID).orElseThrow(
                () -> new UserNotFoundException("No users found with ID: " + contactID));

        Address address = addressRepo.findById(addressID).orElseThrow(
                () -> new AddressNotFoundException(
                        "User with ID: " + contactID + " has no Address with ID: " + addressID));

        address.setAddressFlatNoAndName(addressDTO.getAddressFlatNoAndName());
        address.setAddressStreet(addressDTO.getAddressStreet());
        address.setAddressCity(addressDTO.getAddressCity());
        address.setAddressState(addressDTO.getAddressState());
        address.setAddressCountry(addressDTO.getAddressCountry());
        address.setAddressPincode(addressDTO.getAddressPincode());

        addressRepo.save(address);
        return contactDetails;
    }

    @Override
    public String deleteAddressByContactID(int contactID, int addressID) throws AddressNotFoundException,
            UserNotFoundException {
        ContactDetails contactDetails = contactDetailsRepo.findById(contactID).orElseThrow(
                () -> new UserNotFoundException("No users found with ID: " + contactID));

        Address address = addressRepo.findById(addressID).orElseThrow(() ->
                new AddressNotFoundException(
                        "User with ID: " + contactID + " has no Address with ID: " + addressID));

        addressRepo.delete(address);
        return "User with ID : " + contactID + "'s Address with ID: " + addressID + " deleted successfully";
    }

    @Override
    public List<Address> getAllAddressesByContactID(int contactID) throws AddressNotFoundException,
            UserNotFoundException {
        ContactDetails contactDetails = contactDetailsRepo.findById(contactID).orElseThrow(
                () -> new UserNotFoundException("No users found with ID: " + contactID));

        List<Address> addresses = contactDetails.getAddresses();
        if (addresses == null) {
            throw new AddressNotFoundException("No Address found for User with ID: " + contactID);
        }
        return addresses;
    }

    //! Add a method to validateLogin
    //! Add a method to validateLogin
    //! Add a method to validateLogin


}
