package com.example.sakhi.dao;

import com.example.sakhi.config.DBConnection;
import com.example.sakhi.model.TrustedContact;

import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Repository
public class ContactDAOImpl implements ContactDAO {

    @Override
    public TrustedContact save(
            TrustedContact contact
    ) {

        String sql =
                "INSERT INTO TRUSTED_CONTACTS " +
                "(USER_ID, NAME, PHONE, RELATION) " +
                "VALUES (?, ?, ?, ?)";

        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(
                                sql,
                                new String[]{"CONTACT_ID"}
                        )
        ) {

            statement.setLong(
                    1,
                    contact.getUserId()
            );

            statement.setString(
                    2,
                    contact.getName()
            );

            statement.setString(
                    3,
                    contact.getPhone()
            );

            statement.setString(
                    4,
                    contact.getRelation()
            );

            statement.executeUpdate();

            try (
                    ResultSet keys =
                            statement.getGeneratedKeys()
            ) {

                if (keys.next()) {

                    contact.setId(
                            keys.getLong(1)
                    );
                }
            }

            return contact;

        } catch (SQLException e) {

            throw new RuntimeException(
                    "Error saving contact: "
                            + e.getMessage(),
                    e
            );
        }
    }

    @Override
    public List<TrustedContact> findByUserId(
            Long userId
    ) {

        String sql =
                "SELECT CONTACT_ID, USER_ID, NAME, PHONE, RELATION " +
                "FROM TRUSTED_CONTACTS " +
                "WHERE USER_ID = ? " +
                "ORDER BY CONTACT_ID DESC";

        List<TrustedContact> contacts =
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

                    TrustedContact contact =
                            new TrustedContact();

                    contact.setId(
                            resultSet.getLong(
                                    "CONTACT_ID"
                            )
                    );

                    contact.setUserId(
                            resultSet.getLong(
                                    "USER_ID"
                            )
                    );

                    contact.setName(
                            resultSet.getString("NAME")
                    );

                    contact.setPhone(
                            resultSet.getString("PHONE")
                    );

                    contact.setRelation(
                            resultSet.getString("RELATION")
                    );

                    contacts.add(contact);
                }
            }

            return contacts;

        } catch (SQLException e) {

            throw new RuntimeException(
                    "Error getting contacts: "
                            + e.getMessage(),
                    e
            );
        }
    }

    @Override
    public boolean deleteById(
            Long id,
            Long userId
    ) {

        String sql =
                "DELETE FROM TRUSTED_CONTACTS " +
                "WHERE CONTACT_ID = ? " +
                "AND USER_ID = ?";

        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql)
        ) {

            statement.setLong(1, id);
            statement.setLong(2, userId);

            return statement.executeUpdate() > 0;

        } catch (SQLException e) {

            throw new RuntimeException(
                    "Error deleting contact: "
                            + e.getMessage(),
                    e
            );
        }
    }
}