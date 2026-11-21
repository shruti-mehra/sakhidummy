package com.example.sakhi.model;

public class TrustedContact {

    private Long id;

    private Long userId;

    private String name;

    private String phone;

    private String relation;

    public TrustedContact() {
    }

    public TrustedContact(
            Long id,
            Long userId,
            String name,
            String phone,
            String relation
    ) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.phone = phone;
        this.relation = relation;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getRelation() {
        return relation;
    }

    public void setRelation(String relation) {
        this.relation = relation;
    }
}