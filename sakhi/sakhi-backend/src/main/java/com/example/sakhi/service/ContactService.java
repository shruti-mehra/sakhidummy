package com.example.sakhi.service;

import com.example.sakhi.dao.ContactDAO;
import com.example.sakhi.dto.ContactRequest;
import com.example.sakhi.model.TrustedContact;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService {

    private final ContactDAO contactDAO;

    public ContactService(ContactDAO contactDAO) {
        this.contactDAO = contactDAO;
    }

    public TrustedContact addContact(
            Long userId,
            ContactRequest request
    ) {

        TrustedContact contact =
                new TrustedContact();

        contact.setUserId(userId);
        contact.setName(request.getName());
        contact.setPhone(request.getPhone());
        contact.setRelation(request.getRelation());

        return contactDAO.save(contact);
    }

    public List<TrustedContact> getContacts(
            Long userId
    ) {

        return contactDAO.findByUserId(userId);
    }

    public boolean deleteContact(
            Long contactId,
            Long userId
    ) {

        return contactDAO.deleteById(
                contactId,
                userId
        );
    }
}