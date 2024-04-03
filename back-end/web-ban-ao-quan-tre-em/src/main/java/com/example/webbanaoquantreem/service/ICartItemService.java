package com.example.webbanaoquantreem.service;

import com.example.webbanaoquantreem.model.CartItem;

public interface ICartItemService {
    void save(CartItem cartItem);

    CartItem findById(Long id);

    void removeCartItem(Long id);
}
