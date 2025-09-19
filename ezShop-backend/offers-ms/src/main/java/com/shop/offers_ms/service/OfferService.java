package com.shop.offers_ms.service;

import com.shop.offers_ms.dto.OfferDTO;
import com.shop.offers_ms.exception.OfferNotFoundException;
import com.shop.offers_ms.model.Offer;

import java.util.List;

public interface OfferService {

    public Offer createOffer(OfferDTO offerDTO);

    public Offer getOfferByID(int offerID) throws OfferNotFoundException;

    public List<Offer> getValidOffers() throws OfferNotFoundException;

    public Offer updateOffer(int offerID, OfferDTO offerDTO) throws OfferNotFoundException;

    public String deleteOffer(int offerID) throws OfferNotFoundException;

}
