package com.example.sakhi.dao;

import com.example.sakhi.config.DBConnection;
import com.example.sakhi.model.User;

import org.springframework.stereotype.Repository;

import java.sql.*;

@Repository
public class UserDAOImpl implements UserDAO {

    @Override
    public User save(User user) {

        String sql =
                "INSERT INTO USERS " +
                "(NAME, EMAIL, PHONE, PASSWORD) " +
                "VALUES (?, ?, ?, ?)";

        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(
                                sql,
                                new String[]{"USER_ID"}
                        )
        ) {

            statement.setString(
                    1,
                    user.getName()
            );

            statement.setString(
                    2,
                    user.getEmail()
            );

            statement.setString(
                    3,
                    user.getPhone()
            );

            statement.setString(
                    4,
                    user.getPassword()
            );

            statement.executeUpdate();

            try (
                    ResultSet generatedKeys =
                            statement.getGeneratedKeys()
            ) {

                if (generatedKeys.next()) {

                    user.setId(
                            generatedKeys.getLong(1)
                    );
                }
            }

            return user;

        } catch (SQLException e) {

            throw new RuntimeException(
                    "Error while saving user: "
                            + e.getMessage(),
                    e
            );
        }
    }

    @Override
    public User findByEmail(String email) {

        String sql =
                "SELECT USER_ID, NAME, EMAIL, PHONE, PASSWORD " +
                "FROM USERS " +
                "WHERE EMAIL = ?";

        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql)
        ) {

            statement.setString(1, email);

            try (
                    ResultSet resultSet =
                            statement.executeQuery()
            ) {

                if (resultSet.next()) {

                    return mapUser(resultSet);
                }
            }

            return null;

        } catch (SQLException e) {

            throw new RuntimeException(
                    "Error finding user: "
                            + e.getMessage(),
                    e
            );
        }
    }

    @Override
    public User findById(Long id) {

        String sql =
                "SELECT USER_ID, NAME, EMAIL, PHONE, PASSWORD " +
                "FROM USERS " +
                "WHERE USER_ID = ?";

        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql)
        ) {

            statement.setLong(1, id);

            try (
                    ResultSet resultSet =
                            statement.executeQuery()
            ) {

                if (resultSet.next()) {

                    return mapUser(resultSet);
                }
            }

            return null;

        } catch (SQLException e) {

            throw new RuntimeException(
                    "Error finding user: "
                            + e.getMessage(),
                    e
            );
        }
    }

    @Override
    public boolean existsByEmail(String email) {

        String sql =
                "SELECT COUNT(*) FROM USERS WHERE EMAIL = ?";

        try (
                Connection connection =
                        DBConnection.getConnection();

                PreparedStatement statement =
                        connection.prepareStatement(sql)
        ) {

            statement.setString(1, email);

            try (
                    ResultSet resultSet =
                            statement.executeQuery()
            ) {

                if (resultSet.next()) {

                    return resultSet.getInt(1) > 0;
                }
            }

            return false;

        } catch (SQLException e) {

            throw new RuntimeException(
                    "Error checking email: "
                            + e.getMessage(),
                    e
            );
        }
    }

    private User mapUser(ResultSet resultSet)
            throws SQLException {

        User user = new User();

        user.setId(
                resultSet.getLong("USER_ID")
        );

        user.setName(
                resultSet.getString("NAME")
        );

        user.setEmail(
                resultSet.getString("EMAIL")
        );

        user.setPhone(
                resultSet.getString("PHONE")
        );

        user.setPassword(
                resultSet.getString("PASSWORD")
        );

        return user;
    }
}