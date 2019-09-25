package com.nxtLife.msil.repository;

import com.nxtLife.msil.views.VehicleAvaliabiltyMetrics;
import oracle.jdbc.OracleTypes;
import oracle.jdbc.rowset.OracleCachedRowSetReader;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.ParameterMode;
import javax.persistence.PersistenceContext;
import javax.persistence.StoredProcedureQuery;
import javax.sql.DataSource;
import java.math.BigDecimal;
import java.sql.CallableStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class TripRepositoryImpl implements TripRepository {

    @PersistenceContext
    private EntityManager em;

    @Autowired
    private DataSource dataSource;

    @Override
    public Long getOpenTrips() throws SQLException {
        java.sql.Timestamp date= java.sql.Timestamp.valueOf(LocalDateTime.now().minusDays(13).withHour(0).withMinute(0).withSecond(0));

        //works with jpa version 2.0
//        BigDecimal countOfOpenTrips= (BigDecimal) em.unwrap(Session.class).createStoredProcedureCall("MSIL_OPENTRIPS")
//                .registerStoredProcedureParameter(1, Class.class,ParameterMode.REF_CURSOR)
//                  .registerStoredProcedureParameter(2, Timestamp.class, ParameterMode.IN).setParameter(2,date).getSingleResult();
        //        return countOfOpenTrips.longValue();


        //Failed because Oracle doesn't support result sets bis stored procedure.(~v 1.5.19)
//
        StoredProcedureQuery query = em.createStoredProcedureQuery("MSIL_OPENTRIPS");
        query.registerStoredProcedureParameter(1,Class.class,ParameterMode.REF_CURSOR);
        query.registerStoredProcedureParameter(2,Timestamp.class,ParameterMode.IN).setParameter(2,date);
        query.execute();

        BigDecimal count= (BigDecimal) query.getSingleResult();

        return count.longValue();
//
//        CallableStatement statment= dataSource.getConnection().prepareCall("{ call MSIL_OPENTRIPS(?,?)}");
//        statment.setC


    }
//
    @Override
    public Long getClosedTrips() throws SQLException {
        java.sql.Timestamp date= java.sql.Timestamp.valueOf(LocalDateTime.now().minusDays(13).withHour(0).withMinute(0).withSecond(0));
//        BigDecimal countOfClosedTrips= (BigDecimal) em.unwrap(Session.class).createStoredProcedureCall("MSIL_CLOSEDTRIPS")
//                .registerStoredProcedureParameter(1, Class.class,ParameterMode.REF_CURSOR)
//                .registerStoredProcedureParameter(2, Timestamp.class, ParameterMode.IN).setParameter(2,date).getSingleResult();
//        return countOfClosedTrips.longValue();

        StoredProcedureQuery query = em.createStoredProcedureQuery("MSIL_CLOSEDTRIPS");
        query.registerStoredProcedureParameter(1,Class.class,ParameterMode.REF_CURSOR);
        query.registerStoredProcedureParameter(2,Timestamp.class,ParameterMode.IN).setParameter(2,date);
        query.execute();

        BigDecimal count= (BigDecimal) query.getSingleResult();

        return count.longValue();
    }

    @Override
    public Long getDelayedTrips() throws SQLException {
        java.sql.Timestamp date= java.sql.Timestamp.valueOf(LocalDateTime.now().minusDays(13).withHour(0).withMinute(0).withSecond(0));
//        BigDecimal countOfDelayedTrips= (BigDecimal) em.unwrap(Session.class).createStoredProcedureCall("MSIL_DELAYTRIPS")
//                .registerStoredProcedureParameter(1, Class.class,ParameterMode.REF_CURSOR).getSingleResult();
//        return countOfDelayedTrips.longValue();
        StoredProcedureQuery query = em.createStoredProcedureQuery("MSIL_DELAYTRIPS");
        query.registerStoredProcedureParameter(1,Class.class,ParameterMode.REF_CURSOR);
//        query.registerStoredProcedureParameter(2,Timestamp.class,ParameterMode.IN).setParameter(2,date);
        query.execute();

        BigDecimal count= (BigDecimal) query.getSingleResult();

        return count.longValue();

    }

    @Override
    public Long getTotalTrips() throws SQLException {
        java.sql.Timestamp date= java.sql.Timestamp.valueOf(LocalDateTime.now().minusDays(13).withHour(0).withMinute(0).withSecond(0));
//        BigDecimal countOfTotalTrips= (BigDecimal) em.unwrap(Session.class).createStoredProcedureCall("MSIL_TOTALTRIPS")
//                .registerStoredProcedureParameter(1, Class.class,ParameterMode.REF_CURSOR)
//                .registerStoredProcedureParameter(2, Timestamp.class, ParameterMode.IN).setParameter(2,date).getSingleResult();
//        return countOfTotalTrips.longValue();
        StoredProcedureQuery query = em.createStoredProcedureQuery("MSIL_TOTALTRIPS");
        query.registerStoredProcedureParameter(1,Class.class,ParameterMode.REF_CURSOR);
        query.registerStoredProcedureParameter(2,Timestamp.class,ParameterMode.IN).setParameter(2,date);
        query.execute();

        BigDecimal count= (BigDecimal) query.getSingleResult();

        return  count.longValue();

    }

    @Override
    public List<VehicleAvaliabiltyMetrics> getVehiclesAvailable() {
        List<VehicleAvaliabiltyMetrics> vehicleAvaliabiltyMetrics= new ArrayList<>();
        java.sql.Timestamp date= java.sql.Timestamp.valueOf(LocalDateTime.now().minusDays(13).withHour(0).withMinute(0).withSecond(0));
//        List<Object[]> listOfVehicles = em.unwrap(Session.class).createStoredProcedureCall("MSIL_VEH_AVAILABILITY")
//                .registerStoredProcedureParameter(1,void.class,ParameterMode.REF_CURSOR)
//                .registerStoredProcedureParameter(2,Timestamp.class,ParameterMode.IN).setParameter(2,date).getResultList();
        StoredProcedureQuery query = em.createStoredProcedureQuery("MSIL_VEH_AVAILABILITY");
        query.registerStoredProcedureParameter(1,Class.class,ParameterMode.REF_CURSOR);
        query.registerStoredProcedureParameter(2,Timestamp.class,ParameterMode.IN).setParameter(2,date);
        query.execute();
        List<Object[]> listOfVehicles = query.getResultList();

        listOfVehicles.stream().forEach(o-> {
            VehicleAvaliabiltyMetrics a= new VehicleAvaliabiltyMetrics(o[1].toString(), ((BigDecimal)o[0]).intValue());
            vehicleAvaliabiltyMetrics.add(a);
        });
        return vehicleAvaliabiltyMetrics;
    }
}
