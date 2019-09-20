package com.nxtLife.msil.repository;

import oracle.jdbc.OracleTypes;
import oracle.jdbc.rowset.OracleCachedRowSetReader;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.ParameterMode;
import javax.persistence.PersistenceContext;
import java.sql.Date;
import java.sql.SQLException;
import java.time.LocalDate;

@Repository
public class TripRepositoryImpl implements TripRepository {

    @PersistenceContext
    private EntityManager em;

    @Override
    public Long getOpenTrips() throws SQLException {
        Long countOfOpenTrips=0l;
//                (Long) em.unwrap(Session.class).createSQLQuery("{call MSIL_OPENTRIPS(?,?)}")
//                .setParameter(1, ParameterMode.REF_CURSOR).setParameter(2,java.sql.Date.valueOf(LocalDate.now())).uniqueResult();
        return countOfOpenTrips;
    }
}
