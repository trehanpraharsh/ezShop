package com.shop.product_ms.controller;

import com.shop.product_ms.dto.ProductDTO;
import com.shop.product_ms.exception.CategoryNotFoundException;
import com.shop.product_ms.exception.ProductNotFoundException;
import com.shop.product_ms.model.Category;
import com.shop.product_ms.model.Product;
import com.shop.product_ms.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
//Fix the cors error in frontend
@CrossOrigin("*")
public class ProductController {

    private final ProductService productService;


    //* used by SELLER to create a product for the platform
    @PostMapping("/")
    public ResponseEntity<Product> createProduct(@RequestBody @Valid ProductDTO productDTO){
        return new ResponseEntity<>(productService.createProduct(productDTO), HttpStatus.CREATED);
    }

    // Have to do the exceptional handling here - when the result is null then return a response
    // entity with status not found
    //* USER will use it to get the products by category
    @GetMapping("/category/{categoryName}")
    public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable @Valid String categoryName)
            throws CategoryNotFoundException {
        return new ResponseEntity<>(productService.getProductsByCategory(categoryName), HttpStatus.OK);
    }

    @GetMapping("/category")
    public ResponseEntity<List<Category>> getAllCategories()
            throws CategoryNotFoundException {
        return new ResponseEntity<>(productService.getAllCategories(), HttpStatus.OK);
    }

    //* When USER will use it normally, then the quantity will be 1 by default. Other uses depends
    //* on specific use-cases
    @GetMapping("/quantity/{prodQuantity}")
    public ResponseEntity<List<Product>> filterProductByQuantityGreaterThan(@PathVariable @Valid int prodQuantity){
        return new ResponseEntity<>(productService.filterProductByQuantity(prodQuantity), HttpStatus.OK);
    }

    //* Might be used by the SELLER or ADMIN to de-list a product
    @DeleteMapping("/{prodID}")
    public ResponseEntity<String> deleteProductByID(@PathVariable @Valid int prodID) throws ProductNotFoundException {
        return new ResponseEntity<>(productService.deleteProductByID(prodID), HttpStatus.OK);
    }

    //* Used by ADMIN to view a specific product listed on his platform and also to fetch product on frontend
    @GetMapping("/{prodID}")
    public ResponseEntity<Product> getProductById(@PathVariable @Valid int prodID) throws ProductNotFoundException {
        return new ResponseEntity<>(productService.getProductById(prodID), HttpStatus.FOUND);
    }

    //* Used by SELLER to update details of a product
    @PutMapping("/{prodID}")
    public ResponseEntity<Product> updateProductByID(@RequestBody @Valid ProductDTO productDTO,
                                                     @PathVariable @Valid int prodID)
            throws ProductNotFoundException {
        return new ResponseEntity<>(productService.updateProductByID(productDTO, prodID), HttpStatus.OK);
    }

    //* Used by SELLER to view all the products listed by him on the platform
    //todo Works fine
    @GetMapping("/seller/{sellerID}")
    public ResponseEntity<List<Product>> getProductsBySellerID(@PathVariable @Valid int sellerID){
        return new ResponseEntity<>(productService.getProductsBySellerID(sellerID), HttpStatus.FOUND);
    }

    //* Used by ADMIN to view all the products listed on his platform
    @GetMapping("/")
    public ResponseEntity<List<Product>> getAllProducts(){
        return new ResponseEntity<>(productService.getAllProducts(), HttpStatus.OK);
    }

    @PostMapping("/checkQuantity/{prodID}/{prodQty}")
    public ResponseEntity<Boolean> checkProductQuantityAvailablity(@PathVariable @Valid int prodID,
                                                                   @PathVariable @Valid int prodQty)
            throws ProductNotFoundException {
        return new ResponseEntity<>(productService.checkProductQuantityAvailabilityAndDeduct(prodID, prodQty),
                HttpStatus.OK);
    }

    @PostMapping("/checkAndSendProductsToOrder")
    public ResponseEntity<List<Product>> checkAndSendProductsToOrder(@RequestBody @Valid Map<Integer,Integer> prodInfo)
            throws ProductNotFoundException {
        return new ResponseEntity<>(productService.checkAndSendProductsToOrder(prodInfo), HttpStatus.OK);
    }

    @PostMapping("/totalPrice")
    public ResponseEntity<Double> getTotalPriceOfProducts(@RequestBody @Valid Map<Integer,Integer> prodInfo)
            throws ProductNotFoundException {
        return new ResponseEntity<>(productService.getTotalPriceOfProducts(prodInfo), HttpStatus.OK);
    }

    @PostMapping("/increaseQty/{prodID}/{prodQty}")
    public ResponseEntity<Product> updateProductIncreaseQty(@PathVariable @Valid int prodID, @PathVariable @Valid int prodQty)
            throws ProductNotFoundException {
        return new ResponseEntity<>(productService.updateProductIncreaseQty(prodID, prodQty), HttpStatus.OK);
    }




}
