package com.example.webbanaoquantreem.service;

import com.example.webbanaoquantreem.model.Account;
import com.example.webbanaoquantreem.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountService implements IAccountService{
    @Autowired
    private AccountRepository accountRepository;
    @Override
    public Account findById(Long id) {
        return accountRepository.findById(id).get();
    }
}
