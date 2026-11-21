// package com.example.sakhi.config;

// import java.sql.Connection;
// import java.sql.DriverManager;
// import java.sql.SQLException;

// public class DBConnection {

//     private static final String URL =
//             "jdbc:oracle:thin:@localhost:1521:XE";

//     private static final String USER =
//             "sakhi";

//     private static final String PASSWORD =
//             "Sakhi123";

//     private DBConnection() {
//     }

//     public static Connection getConnection()
//             throws SQLException {

//         return DriverManager.getConnection(
//                 URL,
//                 USER,
//                 PASSWORD
//         );
//     }
// }

//for hosting :

package com.example.sakhi.config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {

    private DBConnection() {
    }

    public static Connection getConnection()
            throws SQLException {

        String url = System.getenv("DB_URL");
        String username = System.getenv("DB_USERNAME");
        String password = System.getenv("DB_PASSWORD");

        if (url == null || username == null || password == null) {
            throw new SQLException(
                "Database environment variables are missing"
            );
        }

        return DriverManager.getConnection(
            url,
            username,
            password
        );
    }
}
