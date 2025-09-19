package com.shop.offers_ms.service;

import com.shop.offers_ms.dto.OfferDTO;
import com.shop.offers_ms.exception.OfferNotFoundException;
import com.shop.offers_ms.model.Offer;
import com.shop.offers_ms.repository.OfferRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OfferServiceImpl implements OfferService {

    private final OfferRepo offerRepo;

    @Override
    public Offer createOffer(OfferDTO offerDTO) {

        Offer offer = new Offer(offerDTO.getOfferCode(), offerDTO.getOfferDescription(),
                offerDTO.getOfferDiscountPercentage(), offerDTO.getOfferStartDate(), offerDTO.getOfferEndDate());

        return offerRepo.save(offer);
    }

    @Override
    public Offer getOfferByID(int offerID) throws OfferNotFoundException {
        return offerRepo.findById(offerID).orElseThrow(
                () -> new OfferNotFoundException("No offers found with ID: " + offerID));
    }

    @Override
    public List<Offer> getValidOffers() throws OfferNotFoundException {
        List<Offer> offerList = offerRepo.findAll();
        if(offerList.isEmpty()) {
            throw new OfferNotFoundException("No offers found");
        }
        return offerList;
    }

    @Override
    public Offer updateOffer(int offerID, OfferDTO offerDTO) throws OfferNotFoundException {
        Offer offer = offerRepo.findById(offerID).orElseThrow(
                () -> new OfferNotFoundException("No offers found with ID: " + offerID));
        offer.setOfferCode(offerDTO.getOfferCode());
        offer.setOfferDescription(offerDTO.getOfferDescription());
        offer.setOfferDiscountPercentage(offerDTO.getOfferDiscountPercentage());
        offer.setOfferStartDate(offerDTO.getOfferStartDate());
        offer.setOfferEndDate(offerDTO.getOfferEndDate());

        return offerRepo.save(offer);
    }

    @Override
    public String deleteOffer(int offerID) throws OfferNotFoundException {
        Offer offer = offerRepo.findById(offerID).orElseThrow(
                () -> new OfferNotFoundException("No offers found with ID: " + offerID));
        offerRepo.delete(offer);
        return "Offer with ID : " + offerID + " deleted successfully!";
    }
}
