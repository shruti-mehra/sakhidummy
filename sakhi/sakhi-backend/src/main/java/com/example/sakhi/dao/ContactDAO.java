package com.example.sakhi.dao;

import com.example.sakhi.model.TrustedContact;

import java.util.List;

public interface ContactDAO {

    TrustedContact save(TrustedContact contact);

    List<TrustedContact> findByUserId(Long userId);

    boolean deleteById(Long id, Long userId);
}