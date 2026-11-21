package com.example.sakhi.dao;

import com.example.sakhi.model.SOSAlert;

import java.util.List;

public interface SOSDAO {

    SOSAlert save(SOSAlert alert);

    List<SOSAlert> findByUserId(Long userId);
}