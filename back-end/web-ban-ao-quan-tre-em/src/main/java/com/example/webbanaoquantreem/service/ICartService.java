package com.example.webbanaoquantreem.service;

import com.example.webbanaoquantreem.model.Cart;

public interface ICartService {
    Cart findCart(Long id);

    void save(Cart cart);
}
