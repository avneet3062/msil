package com.nxtLife.msil.repository;

import oracle.jdbc.OracleTypes;
import oracle.jdbc.rowset.OracleCachedRowSetReader;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDate;

@Repository
public class TripRepositoryImpl implements TripRepository {

    @PersistenceContext
    private EntityManager em;

    @Override
    public int getOpenTrips() {
        Integer countOfOpenTrips= (Integer) em.unwrap(Session.class).createSQLQuery("{call MSIL_OPENTRIPS(?,?)}")
                .setParameter(1, OracleTypes.CURSOR).setParameter(2, LocalDate.now()).uniqueResult();
        return countOfOpenTrips;
    }
}
