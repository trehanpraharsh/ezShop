package com.shop.product_ms.service;

import com.shop.product_ms.dto.ProductDTO;
import com.shop.product_ms.exception.CategoryNotFoundException;
import com.shop.product_ms.exception.ProductNotFoundException;
import com.shop.product_ms.model.Category;
import com.shop.product_ms.model.Product;

import java.util.List;
import java.util.Map;

public interface ProductService {

    public Product createProduct(ProductDTO productDTO);
    public List<Product> getAllProducts();
    public String deleteProductByID(int prodID) throws ProductNotFoundException;
    public Product getProductById(int prodID) throws ProductNotFoundException;
    public List<Product> getProductsByCategory(String categoryName) throws CategoryNotFoundException;

    public List<Product> filterProductByQuantity(int prodQuantity);

    public Product updateProductByID(ProductDTO productDTO, int prodID) throws ProductNotFoundException;

    public List<Product> getProductsBySellerID(int sellerID);

    public boolean checkProductQuantityAvailabilityAndDeduct(int prodID, int prodQty) throws ProductNotFoundException;

    public List<Product> checkAndSendProductsToOrder(Map<Integer, Integer> prodInfo) throws ProductNotFoundException;

    public Double getTotalPriceOfProducts(Map<Integer, Integer> prodInfo) throws ProductNotFoundException;

    public List<Category> getAllCategories();

 //not sure abt this - can be used when the product is sold so to decrease the quantity just this api could be called
    public Product updateProductIncreaseQty(int prodID, int prodQty) throws ProductNotFoundException;





}
