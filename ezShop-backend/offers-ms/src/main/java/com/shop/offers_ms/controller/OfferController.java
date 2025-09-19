package com.shop.offers_ms.controller;

import com.shop.offers_ms.dto.OfferDTO;
import com.shop.offers_ms.exception.OfferNotFoundException;
import com.shop.offers_ms.model.Offer;
import com.shop.offers_ms.service.OfferService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/offers")
@RequiredArgsConstructor
@CrossOrigin("*")
public class OfferController {

    private final OfferService offerService;

    //* Used by ADMIN
    @PostMapping("/")
    public ResponseEntity<Offer> createOffer(@RequestBody @Valid OfferDTO offerDTO){
        return new ResponseEntity<>(offerService.createOffer(offerDTO), HttpStatus.CREATED);
    }

    //* Might be used in the frontend and USER
    @GetMapping("/{offerID}")
    public ResponseEntity<Offer> getOfferByID(@PathVariable @Valid int offerID) throws OfferNotFoundException {
        return new ResponseEntity<>(offerService.getOfferByID(offerID), HttpStatus.FOUND);
    }

    //* Used by ADMIN and USER
    @GetMapping("/")
    public ResponseEntity<List<Offer>> getValidOffers() throws OfferNotFoundException {
        return new ResponseEntity<>(offerService.getValidOffers(), HttpStatus.OK);
    }

    //* Used by ADMIN
    @PutMapping("/{offerID}")
    public ResponseEntity<Offer> updateOffer(@RequestBody @Valid OfferDTO offerDTO, @PathVariable @Valid int offerID)
            throws OfferNotFoundException {
        return new ResponseEntity<>(offerService.updateOffer(offerID, offerDTO), HttpStatus.OK);
    }

    //* Used by ADMIN
    @DeleteMapping("/{offerID}")
    public ResponseEntity<String> deleteOffer(@PathVariable @Valid int offerID) throws OfferNotFoundException {
        return new ResponseEntity<>(offerService.deleteOffer(offerID), HttpStatus.OK);
    }

}
