package com.nxtLife.msil.repository;

import com.nxtLife.msil.views.VehicleAvaliabiltyMetrics;
import oracle.jdbc.OracleTypes;
import oracle.jdbc.rowset.OracleCachedRowSetReader;
import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.ParameterMode;
import javax.persistence.PersistenceContext;
import java.math.BigDecimal;
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

    @Override
    public Long getOpenTrips() throws SQLException {
        java.sql.Timestamp date= java.sql.Timestamp.valueOf(LocalDateTime.now().minusDays(13).withHour(0).withMinute(0).withSecond(0));
        BigDecimal countOfOpenTrips= (BigDecimal) em.unwrap(Session.class).createStoredProcedureCall("MSIL_OPENTRIPS")
                .registerStoredProcedureParameter(1, Class.class,ParameterMode.REF_CURSOR)
                .registerStoredProcedureParameter(2, Timestamp.class, ParameterMode.IN).setParameter(2,date).getSingleResult();

//        List<Object> obj= em.unwrap(Session.class).createStoredProcedureCall("ETRK_VEH_DIS")
//                .registerStoredProcedureParameter(1,Class.class,ParameterMode.REF_CURSOR).getResultList();
        return countOfOpenTrips.longValue();
    }

    @Override
    public Long getClosedTrips() throws SQLException {
        java.sql.Timestamp date= java.sql.Timestamp.valueOf(LocalDateTime.now().minusDays(13).withHour(0).withMinute(0).withSecond(0));
        BigDecimal countOfClosedTrips= (BigDecimal) em.unwrap(Session.class).createStoredProcedureCall("MSIL_CLOSEDTRIPS")
                .registerStoredProcedureParameter(1, Class.class,ParameterMode.REF_CURSOR)
                .registerStoredProcedureParameter(2, Timestamp.class, ParameterMode.IN).setParameter(2,date).getSingleResult();
        return countOfClosedTrips.longValue();
    }

    @Override
    public Long getDelayedTrips() throws SQLException {
        java.sql.Timestamp date= java.sql.Timestamp.valueOf(LocalDateTime.now().minusDays(13).withHour(0).withMinute(0).withSecond(0));
        BigDecimal countOfDelayedTrips= (BigDecimal) em.unwrap(Session.class).createStoredProcedureCall("MSIL_DELAYTRIPS")
                .registerStoredProcedureParameter(1, Class.class,ParameterMode.REF_CURSOR).getSingleResult();
        return countOfDelayedTrips.longValue();
    }

    @Override
    public Long getTotalTrips() throws SQLException {
        java.sql.Timestamp date= java.sql.Timestamp.valueOf(LocalDateTime.now().minusDays(13).withHour(0).withMinute(0).withSecond(0));
        BigDecimal countOfTotalTrips= (BigDecimal) em.unwrap(Session.class).createStoredProcedureCall("MSIL_TOTALTRIPS")
                .registerStoredProcedureParameter(1, Class.class,ParameterMode.REF_CURSOR)
                .registerStoredProcedureParameter(2, Timestamp.class, ParameterMode.IN).setParameter(2,date).getSingleResult();
        return countOfTotalTrips.longValue();
    }

    @Override
    public List<VehicleAvaliabiltyMetrics> getVehiclesAvailable() {
        List<VehicleAvaliabiltyMetrics> vehicleAvaliabiltyMetrics= new ArrayList<>();
        java.sql.Timestamp date= java.sql.Timestamp.valueOf(LocalDateTime.now().minusDays(13).withHour(0).withMinute(0).withSecond(0));
        List<Object[]> listOfVehicles = em.unwrap(Session.class).createStoredProcedureCall("MSIL_VEH_AVAILABILITY")
                .registerStoredProcedureParameter(1,Class.class,ParameterMode.REF_CURSOR)
                .registerStoredProcedureParameter(2,Timestamp.class,ParameterMode.IN).setParameter(2,date).getResultList();

        listOfVehicles.stream().forEach(o-> {
            VehicleAvaliabiltyMetrics a= new VehicleAvaliabiltyMetrics(o[1].toString(), ((BigDecimal)o[0]).intValue());
            vehicleAvaliabiltyMetrics.add(a);
        });
        return vehicleAvaliabiltyMetrics;
    }
}
