package com.example.webbanaoquantreem.service;

import com.example.webbanaoquantreem.model.Cart;
import com.example.webbanaoquantreem.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartService implements ICartService{
    @Autowired
    private CartRepository cartRepository;

    @Override
    public Cart findCart(Long id) {
        return cartRepository.findCartByAccountId(id);
    }

    @Override
    public void save(Cart cart) {
        cartRepository.save(cart);
    }
}
