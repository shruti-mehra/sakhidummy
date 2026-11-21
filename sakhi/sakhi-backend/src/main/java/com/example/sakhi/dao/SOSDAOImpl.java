package com.example.sakhi.dao;

import com.example.sakhi.config.DBConnection;
import com.example.sakhi.model.SOSAlert;

import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class SOSDAOImpl implements SOSDAO {

    @Override
    public SOSAlert save(SOSAlert alert) {

        String sql =
                "INSERT INTO SOS_ALERTS " +
                "(USER_ID, LATITUDE, LONGITUDE, " +
                "ALERT_TIME, STATUS, CONTACTS_NOTIFIED) " +
                "VALUES (?, ?, ?, ?, ?, ?)";

        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(
                                sql,
                                new String[]{"ALERT_ID"}
                        )
        ) {

            statement.setLong(
                    1,
                    alert.getUserId()
            );

            if (alert.getLatitude() != null) {

                statement.setDouble(
                        2,
                        alert.getLatitude()
                );

            } else {

                statement.setNull(
                        2,
                        Types.NUMERIC
                );
            }

            if (alert.getLongitude() != null) {

                statement.setDouble(
                        3,
                        alert.getLongitude()
                );

            } else {

                statement.setNull(
                        3,
                        Types.NUMERIC
                );
            }

            statement.setTimestamp(
                    4,
                    Timestamp.valueOf(
                            alert.getTimestamp()
                    )
            );

            statement.setString(
                    5,
                    alert.getStatus()
            );

            statement.setInt(
                    6,
                    alert.getContactsNotified()
            );

            statement.executeUpdate();

            try (
                    ResultSet keys =
                            statement.getGeneratedKeys()
            ) {

                if (keys.next()) {

                    alert.setId(
                            keys.getLong(1)
                    );
                }
            }

            return alert;

        } catch (SQLException e) {

            throw new RuntimeException(
                    "Error saving SOS alert: "
                            + e.getMessage(),
                    e
            );
        }
    }

    @Override
    public List<SOSAlert> findByUserId(
            Long userId
    ) {

        String sql =
                "SELECT ALERT_ID, USER_ID, LATITUDE, " +
                "LONGITUDE, ALERT_TIME, STATUS, " +
                "CONTACTS_NOTIFIED " +
                "FROM SOS_ALERTS " +
                "WHERE USER_ID = ? " +
                "ORDER BY ALERT_TIME DESC";

        List<SOSAlert> alerts =
                new ArrayList<>();

        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql)
        ) {

            statement.setLong(1, userId);

            try (
                    ResultSet resultSet =
                            statement.executeQuery()
            ) {

                while (resultSet.next()) {

                    SOSAlert alert =
                            new SOSAlert();

                    alert.setId(
                            resultSet.getLong(
                                    "ALERT_ID"
                            )
                    );

                    alert.setUserId(
                            resultSet.getLong(
                                    "USER_ID"
                            )
                    );

                    double latitude =
                            resultSet.getDouble(
                                    "LATITUDE"
                            );

                    if (!resultSet.wasNull()) {
                        alert.setLatitude(latitude);
                    }

                    double longitude =
                            resultSet.getDouble(
                                    "LONGITUDE"
                            );

                    if (!resultSet.wasNull()) {
                        alert.setLongitude(longitude);
                    }

                    Timestamp timestamp =
                            resultSet.getTimestamp(
                                    "ALERT_TIME"
                            );

                    if (timestamp != null) {

                        alert.setTimestamp(
                                timestamp.toLocalDateTime()
                        );
                    }

                    alert.setStatus(
                            resultSet.getString("STATUS")
                    );

                    alert.setContactsNotified(
                            resultSet.getInt(
                                    "CONTACTS_NOTIFIED"
                            )
                    );

                    alerts.add(alert);
                }
            }

            return alerts;

        } catch (SQLException e) {

            throw new RuntimeException(
                    "Error getting SOS alerts: "
                            + e.getMessage(),
                    e
            );
        }
    }
}