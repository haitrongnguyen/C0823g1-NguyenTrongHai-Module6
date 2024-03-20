package com.example.webbanaoquantreem.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String accountName;
    private String fullName;
    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    private String password;
    private String image;
    private LocalDate birthday;
    private String phoneNumber;
    private String address;
    private String email;
    private Boolean isDelete =false;

    public Account(Long id, String accountName, String fullName, Role role, String password, String image, LocalDate birthday, String phoneNumber, String address, String email, Boolean isDelete) {
        this.id = id;
        this.accountName = accountName;
        this.fullName = fullName;
        this.role = role;
        this.password = password;
        this.image = image;
        this.birthday = birthday;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.email = email;
        this.isDelete = isDelete;
    }

    public Account() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean getDelete() {
        return isDelete;
    }

    public void setDelete(Boolean delete) {
        isDelete = delete;
    }
}
