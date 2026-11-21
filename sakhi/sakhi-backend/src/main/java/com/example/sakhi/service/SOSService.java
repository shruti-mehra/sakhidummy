package com.example.sakhi.service;

import com.example.sakhi.dao.ContactDAO;
import com.example.sakhi.dao.SOSDAO;
import com.example.sakhi.dto.SOSRequest;
import com.example.sakhi.model.SOSAlert;
import com.example.sakhi.model.TrustedContact;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SOSService {

    private final SOSDAO sosDAO;
    private final ContactDAO contactDAO;

    public SOSService(
            SOSDAO sosDAO,
            ContactDAO contactDAO
    ) {
        this.sosDAO = sosDAO;
        this.contactDAO = contactDAO;
    }

    public SOSAlert createSOS(SOSRequest request) {

        List<TrustedContact> contacts =
                contactDAO.findByUserId(
                        request.getUserId()
                );

        SOSAlert alert = new SOSAlert();

        alert.setUserId(request.getUserId());

        alert.setLatitude(
                request.getLatitude()
        );

        alert.setLongitude(
                request.getLongitude()
        );

        alert.setTimestamp(
                LocalDateTime.now()
        );

        /*
         * Later this will become something like:
         *
         * PROCESSING
         * SENT
         * PARTIALLY_SENT
         * FAILED
         */
        alert.setStatus("CREATED");

        alert.setContactsNotified(
                contacts.size()
        );

        return sosDAO.save(alert);
    }

    public List<SOSAlert> getAlerts(
            Long userId
    ) {

        return sosDAO.findByUserId(userId);
    }
}