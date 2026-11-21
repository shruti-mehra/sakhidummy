package com.example.sakhi.model;

import java.time.LocalDateTime;

public class SOSAlert {

    private Long id;

    private Long userId;

    private Double latitude;

    private Double longitude;

    private LocalDateTime timestamp;

    private String status;

    private Integer contactsNotified;

    public SOSAlert() {
    }

    public SOSAlert(
            Long id,
            Long userId,
            Double latitude,
            Double longitude,
            LocalDateTime timestamp,
            String status,
            Integer contactsNotified
    ) {
        this.id = id;
        this.userId = userId;
        this.latitude = latitude;
        this.longitude = longitude;
        this.timestamp = timestamp;
        this.status = status;
        this.contactsNotified = contactsNotified;
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

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getContactsNotified() {
        return contactsNotified;
    }

    public void setContactsNotified(Integer contactsNotified) {
        this.contactsNotified = contactsNotified;
    }
}