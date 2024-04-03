package com.example.webbanaoquantreem.controller;


import com.example.webbanaoquantreem.model.*;
import com.example.webbanaoquantreem.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.xml.crypto.Data;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/home")
public class ProductController {
    @Autowired
    private IProductService productService;

    @Autowired
    private ICartService cartService;
    @Autowired
    private IAccountService accountService;

    @Autowired
    private ICartItemService cartItemService;
    @Autowired
    private ICategoryService categoryService;
    @Autowired
    private ILikeService likeService;
    @GetMapping("")
    public ResponseEntity<Page<Product>> getEmployeeList(@RequestParam(defaultValue = "") String searchName,

                                                         @RequestParam(defaultValue = "0") int page,
                                                         @RequestParam Long categoryId) {
        Pageable pageable = PageRequest.of(page, 12);
//        Page<Product> productPage = productService.getAllProduct(searchName, pageable);
        if (categoryId==0){
            Page<Product> productPage = productService.getAllProduct(searchName, pageable);
            return ResponseEntity.ok(productPage);
        }else {
            Page<Product> productPage = productService.getAllProductT(searchName, pageable,categoryId);
            if (productPage.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return ResponseEntity.ok(productPage);
        }

    }

    @PostMapping("")
    public ResponseEntity<?> addToCart(@RequestParam Long productId,
                                       @RequestParam Long accountId,
                                       @RequestParam(defaultValue = "1") Long quantity) {
        System.out.println("cccccccccccccccc");
        Cart cart = cartService.findCart(accountId);
        Account account = accountService.findById(accountId);
        Product product = productService.findById(productId);
        LocalDate date = LocalDate.now();
        Double price = product.getPrice();

        if (cart == null){
            System.out.println("tao");
            cartService.save(new Cart(date,account,false));
            Cart cart1 = cartService.findCart(accountId);
            CartItem cartItem = new CartItem(price,quantity,false,product,cart1);
            cartItemService.save(cartItem);
        }else {
            List<CartItem> cartItems = cart.getCartItems();
            boolean checkExist = false;
            for(CartItem c: cartItems){
                if (c.getProduct().getId().equals(productId)){
                    checkExist = true;
                    c.setQuantity(c.getQuantity()+1);
                    cartItemService.save(c);
                    break;
                }

            }

            if (!checkExist){
                CartItem cartItem = new CartItem(price,quantity,false,product,cart);
                cartItemService.save(cartItem);
            }


        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/cart/{accountId}")
    public ResponseEntity<List<CartItem>> showCartDetail(@PathVariable Long accountId) {
        Cart cart = cartService.findCart(accountId);
        System.out.println(cart);
        List<CartItem> cartItems = cart.getCartItems();
        return new ResponseEntity<List<CartItem>>(cartItems,HttpStatus.OK);
    }
    @GetMapping("/cart/sum/{accountId}")
    public ResponseEntity<Double> getSum(@PathVariable Long accountId) {
        Cart cart = cartService.findCart(accountId);
        System.out.println(cart);
        Double sum = 0.0;
        List<CartItem> cartItems = cart.getCartItems();
        for (CartItem c: cartItems){
            sum= sum + c.getPrice()*c.getQuantity();
        }
        return new ResponseEntity<Double>(sum,HttpStatus.OK);
    }
    @GetMapping("/product/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
        Product product = productService.findById(id);
        return new ResponseEntity<Product>(product,HttpStatus.OK);
    }
    @GetMapping("/cart/plus/{id}")
    public ResponseEntity<?> plusQuantity(@PathVariable Long id) {
        CartItem cartItem = cartItemService.findById(id);
        cartItem.setQuantity(cartItem.getQuantity()+1);
        cartItemService.save(cartItem);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/cart/div/{id}")
    public ResponseEntity<?> divQuantity(@PathVariable Long id) {
        CartItem cartItem = cartItemService.findById(id);
        cartItem.setQuantity(cartItem.getQuantity()-1);
        cartItemService.save(cartItem);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/cart/delete/{id}")
    public ResponseEntity<?>removeCartItem(@PathVariable Long id) {
        cartItemService.removeCartItem(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/cart/cate")
    public ResponseEntity<List<Category>>getAllCate() {
        List<Category> categories = categoryService.findAll();
        return new ResponseEntity<>(categories,HttpStatus.OK);
    }

    @PostMapping("/like/{productId}/{accountId}")
    public ResponseEntity<?> addLike(@PathVariable Long productId, @PathVariable Long accountId) {
        if(likeService.checkLike(accountId,productId) == null){
            System.out.println(productId+" "+accountId);
            likeService.addLike(productId, accountId);
            Product product = productService.findById(productId);
            product.setViewer(product.getViewer()+1);
            productService.save(product);
        }else {
            System.out.println(productId+" "+accountId);
            likeService.deleteByPrAc(productId, accountId);
            Product product = productService.findById(productId);
            product.setViewer(product.getViewer()-1);
            productService.save(product);
        }

        return ResponseEntity.ok().build();
    }
    @GetMapping("/product/check")
    public ResponseEntity<List<Like>>checkLike(@RequestParam Long accountId) {
        List<Like> likes = likeService.findAllLike(accountId);
        return new ResponseEntity<>(likes,HttpStatus.OK);
    }

    @GetMapping("/product/like")
    public ResponseEntity<List<Product>> getProductManyLike() {
        List<Product> products = productService.getProductManyLike();
        return new ResponseEntity<List<Product>>(products,HttpStatus.OK);
    }





}
