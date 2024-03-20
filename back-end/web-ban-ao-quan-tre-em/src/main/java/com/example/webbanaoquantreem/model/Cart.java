package com.example.webbanaoquantreem.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date createDate;

    private Double totalPrice;
    @ManyToOne
    @JoinColumn(name = "accout_id")
    private Account account;
    @JsonIgnore
    @OneToMany(mappedBy = "cart")
    List<CartItem> cartItems;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public List<CartItem> getCartItems() {
        return cartItems;
    }

    public void setCartItems(List<CartItem> cartItems) {
        this.cartItems = cartItems;
    }

    public Cart() {
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Cart(Long id, Date createDate, Double totalPrice, Account account, List<CartItem> cartItems) {
        this.id = id;
        this.createDate = createDate;
        this.totalPrice = totalPrice;
        this.account = account;
        this.cartItems = cartItems;
    }
}
