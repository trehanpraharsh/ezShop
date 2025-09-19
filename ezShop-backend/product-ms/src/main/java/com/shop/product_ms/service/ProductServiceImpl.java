package com.shop.product_ms.service;

import com.shop.product_ms.dto.ProductDTO;
import com.shop.product_ms.exception.CategoryNotFoundException;
import com.shop.product_ms.exception.ProductNotFoundException;
import com.shop.product_ms.model.Category;
import com.shop.product_ms.model.Product;
import com.shop.product_ms.repository.CategoryRepo;
import com.shop.product_ms.repository.ProductRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepo productRepo;
    private final CategoryRepo categoryRepo;


    @Override
    public Product createProduct(ProductDTO productDTO) {
        List<Category> categories = productDTO.getCategories().stream()
                .map(catDTO -> {
                    if (categoryRepo.findByCatName(catDTO.getCatName()) != null) {
                        return categoryRepo.findByCatName(catDTO.getCatName());
                    }
                    return new Category(catDTO.getCatName());
                })
                .collect(Collectors.toList());

        Product product = new Product(
                productDTO.getProdName(),
                productDTO.getProdDesc(),
                productDTO.getProdImage(),
                productDTO.getProdPrice(),
                productDTO.getProdQty(),
                productDTO.getSellerID()
        );
        product.setCategories(categories);

        return productRepo.save(product);
    }

    //* Need to create another method where products whose quantity is greater than 0 are only visible
    //Might be used by the admin to view all the products listed on his platform
    @Override
    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    //Might be used by the seller or admin to de-list a product
    @Override
    public String deleteProductByID(int prodID) throws ProductNotFoundException {
        Product product = productRepo.findById(prodID).orElseThrow(
                () -> new ProductNotFoundException("Product not found with ID: " + prodID));
        for (Category category : product.getCategories()) {
            category.getProducts().remove(product);
            if (category.getProducts().isEmpty()) {
                categoryRepo.save(category);
            }
        }
        productRepo.delete(product);
        return "Product with ID: " + prodID + " deleted successfully";
    }

    // Have to do the exceptional handling here - when the result is null then return a response
    // entity with status not found
    @Override
    public Product getProductById(int prodID) throws ProductNotFoundException {

        //        if(result == null) {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }

        return productRepo.findById(prodID).orElseThrow(
                () -> new ProductNotFoundException("Product not found with ID: " + prodID)
        );
    }

    // Have to do the exceptional handling here - when the result is null then return a response
    // entity with status not found
    @Override
    public List<Product> getProductsByCategory(String categoryName) throws CategoryNotFoundException {
        Category category = categoryRepo.findByCatName(categoryName);
        if (category == null) {
            throw new CategoryNotFoundException("Category not found with name: " + categoryName);
        }
        return category.getProducts();
    }

    //Would be used by User when he sees or searches for products
    @Override
    public List<Product> filterProductByQuantity(int prodQuantity) {
        List<Product> products = getAllProducts();
        return products.stream()
                .filter(product -> product.getProdQty() >= prodQuantity)
                .collect(Collectors.toList());
    }

    @Override
    public Product updateProductByID(ProductDTO productDTO, int prodID) throws ProductNotFoundException {
        Product product = productRepo.findById(prodID)
                .orElseThrow(() -> new ProductNotFoundException("Product not found with ID: " + prodID));

        List<Category> categories = productDTO.getCategories().stream()
                .map(catDTO -> {
                    if (categoryRepo.findByCatName(catDTO.getCatName()) != null) {
                        return categoryRepo.findByCatName(catDTO.getCatName());
                    }
                    return new Category(catDTO.getCatName());
                })
                .collect(Collectors.toList());

        product.setProdName(productDTO.getProdName());
        product.setProdDesc(productDTO.getProdDesc());
        product.setProdImage(productDTO.getProdImage());
        product.setProdPrice(productDTO.getProdPrice());
        product.setProdQty(productDTO.getProdQty());
        product.setCategories(categories);


        return productRepo.save(product);
    }

    @Override
    public List<Product> getProductsBySellerID(int sellerID) {
        return productRepo.findAllBySellerID(sellerID);
    }

    @Override
    public boolean checkProductQuantityAvailabilityAndDeduct(int prodID, int prodQty) throws ProductNotFoundException {
        Product product = productRepo.findById(prodID)
                .orElseThrow(() -> new ProductNotFoundException("Product not found with ID: " + prodID));
        if (product.getProdQty() < prodQty) {
            return false;
        }
        // bcs of the frontend, i could just decrease 1 quantity here instead of quantity itself by passing as parameter
        // and in increase one I can pass quantity
        product.setProdQty(product.getProdQty() - 1);
        productRepo.save(product);
        return true;
    }

    // Setting requested quantity of products and checking if they are available
    @Override
    public List<Product> checkAndSendProductsToOrder(Map<Integer, Integer> prodInfo) throws ProductNotFoundException {
        List<Product> products = productRepo.findAllById(prodInfo.keySet());
        for (Product product : products) {
            Integer requestedQty = prodInfo.get(product.getProdID());
            if (requestedQty == null || product.getProdQty() < requestedQty) {
                throw new ProductNotFoundException("Product with ID: " + product.getProdID() +
                        " is not available in the required quantity");
            }
            //! Setting quantities what is requested to store proper details of order
            product.setProdQty(requestedQty);
        }
        return products;
    }

    @Override
    public Double getTotalPriceOfProducts(Map<Integer, Integer> prodInfo) throws ProductNotFoundException {
        List<Product> products = productRepo.findAllById(prodInfo.keySet());
        double totalPrice = 0;
        for (Product product : products) {
            if (product.getProdQty() < prodInfo.get(product.getProdID())) {
                throw new ProductNotFoundException("Product with ID: " + product.getProdID() +
                        " is not available in the required quantity");
            }
            totalPrice += product.getProdPrice() * prodInfo.get(product.getProdID());
        }
        return totalPrice;
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepo.findAll();
    }

    @Override
    public Product updateProductIncreaseQty(int prodID, int prodQty) throws ProductNotFoundException {
        Product product = productRepo.findById(prodID).orElseThrow(
                () -> new ProductNotFoundException("Product not found with ID: " + prodID));
        product.setProdQty(product.getProdQty() + prodQty);
        return productRepo.save(product);
    }

}
