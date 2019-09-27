package com.nxtLife.msil.repository;

import com.nxtLife.msil.views.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.ParameterMode;
import javax.persistence.PersistenceContext;
import javax.persistence.StoredProcedureQuery;
import javax.sql.DataSource;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Repository
public class TripRepositoryImpl implements TripRepository {

    @PersistenceContext
    private EntityManager em;

    @Autowired
    private DataSource dataSource;

    StoredProcedureQuery procedureQuery = null;

    @Override
    public List<Trips> getOpenTrips() throws SQLException {
        java.sql.Timestamp start= java.sql.Timestamp.valueOf(LocalDateTime.of(2019,1,1,0,0,0));
        java.sql.Timestamp end= java.sql.Timestamp.valueOf(LocalDateTime.of(2019,12,31,23,59,59));

        //works with jpa version 2.0
//        BigDecimal countOfOpenTrips= (BigDecimal) em.unwrap(Session.class).createStoredProcedureCall("MSIL_OPENTRIPS")
//                .registerStoredProcedureParameter(1, Class.class,ParameterMode.REF_CURSOR)
//                  .registerStoredProcedureParameter(2, Timestamp.class, ParameterMode.IN).setParameter(2,date).getSingleResult();
        //        return countOfOpenTrips.longValue();


        //Failed because Oracle doesn't support result sets bis stored procedure.(~v 1.5.19)
//
        List<Trips> trips = new ArrayList<>();
        StoredProcedureQuery query = em.createStoredProcedureQuery("MSIL_OPENTRIPS3");
        query.registerStoredProcedureParameter(1,Class.class,ParameterMode.REF_CURSOR);
        query.registerStoredProcedureParameter(2,Timestamp.class,ParameterMode.IN).setParameter(2,start);
        query.registerStoredProcedureParameter(3,Timestamp.class,ParameterMode.IN).setParameter(3,end);
        query.registerStoredProcedureParameter(4,String.class,ParameterMode.IN).setParameter(4,"PAST");

        query.execute();

        List<Object[]> result = query.getResultList();
        result.forEach(r-> {
            Trips t = new Trips(TripTypes.Open.name(),((BigDecimal)r[0]).longValue(),Integer.valueOf(r[1].toString()));
            trips.add(t);
        });

//        BigDecimal count= (BigDecimal) query.getSingleResult();
//
//        return count.longValue();
////
//        CallableStatement statment= dataSource.getConnection().prepareCall("{ call MSIL_OPENTRIPS(?,?)}");
//        statment.setC

        return trips;
    }
//
    @Override
    public List<Trips> getClosedTrips() throws SQLException {
        java.sql.Timestamp start= java.sql.Timestamp.valueOf(LocalDateTime.of(2019,1,1,0,0,0));
        java.sql.Timestamp end= java.sql.Timestamp.valueOf(LocalDateTime.of(2019,12,31,23,59,59));
        List<Trips> trips= new ArrayList<>();
//        BigDecimal countOfClosedTrips= (BigDecimal) em.unwrap(Session.class).createStoredProcedureCall("MSIL_CLOSEDTRIPS")
//                .registerStoredProcedureParameter(1, Class.class,ParameterMode.REF_CURSOR)
//                .registerStoredProcedureParameter(2, Timestamp.class, ParameterMode.IN).setParameter(2,date).getSingleResult();
//        return countOfClosedTrips.longValue();

        StoredProcedureQuery query = em.createStoredProcedureQuery("MSIL_CLOSEDTRIPS3");
        query.registerStoredProcedureParameter(1,Class.class,ParameterMode.REF_CURSOR);
        query.registerStoredProcedureParameter(2,Timestamp.class,ParameterMode.IN).setParameter(2,start);
        query.registerStoredProcedureParameter(3,Timestamp.class,ParameterMode.IN).setParameter(3,end);
        query.execute();

        List<Object[]> result = query.getResultList();
        result.forEach(r-> {
            Trips t = new Trips(TripTypes.Closed.name(),((BigDecimal)r[0]).longValue(),Integer.valueOf(r[1].toString()));
            trips.add(t);
        });
//        BigDecimal count= (BigDecimal) query.getSingleResult();
//
//        return count.longValue();
        return trips;
    }

    @Override
    public List<Trips> getDelayedTrips() throws SQLException {
        java.sql.Timestamp start= java.sql.Timestamp.valueOf(LocalDateTime.of(2019,1,1,0,0,0));
        java.sql.Timestamp end= java.sql.Timestamp.valueOf(LocalDateTime.of(2019,12,31,23,59,59));
//        BigDecimal countOfDelayedTrips= (BigDecimal) em.unwrap(Session.class).createStoredProcedureCall("MSIL_DELAYTRIPS")
//                .registerStoredProcedureParameter(1, Class.class,ParameterMode.REF_CURSOR).getSingleResult();
//        return countOfDelayedTrips.longValue();
        StoredProcedureQuery query = em.createStoredProcedureQuery("MSIL_DELAYTRIPS3");
        query.registerStoredProcedureParameter(1,Class.class,ParameterMode.REF_CURSOR);
        query.registerStoredProcedureParameter(2,Timestamp.class,ParameterMode.IN).setParameter(2,start);
        query.registerStoredProcedureParameter(3,Timestamp.class,ParameterMode.IN).setParameter(3,end);
//        query.registerStoredProcedureParameter(2,Timestamp.class,ParameterMode.IN).setParameter(2,date);
        query.execute();

//        BigDecimal count= (BigDecimal) query.getSingleResult();
//
//        return count.longValue();
        List<Trips> trips= new ArrayList<>();
        List<Object[]> result = query.getResultList();
        result.forEach(r-> {
            Trips t = new Trips(TripTypes.Delayed.name(),((BigDecimal)r[0]).longValue(),Integer.valueOf(r[1].toString()));
            trips.add(t);
        });
        return trips;
    }

    @Override
    public List<Trips> getTotalTrips() throws SQLException {
        java.sql.Timestamp start= java.sql.Timestamp.valueOf(LocalDateTime.of(2019,1,1,0,0,0));
        java.sql.Timestamp end= java.sql.Timestamp.valueOf(LocalDateTime.of(2019,12,31,23,59,59));
//        BigDecimal countOfTotalTrips= (BigDecimal) em.unwrap(Session.class).createStoredProcedureCall("MSIL_TOTALTRIPS")
//                .registerStoredProcedureParameter(1, Class.class,ParameterMode.REF_CURSOR)
//                .registerStoredProcedureParameter(2, Timestamp.class, ParameterMode.IN).setParameter(2,date).getSingleResult();
//        return countOfTotalTrips.longValue();
        StoredProcedureQuery query = em.createStoredProcedureQuery("MSIL_TOTALTRIPS3");
        query.registerStoredProcedureParameter(1,Class.class,ParameterMode.REF_CURSOR);
        query.registerStoredProcedureParameter(2,Timestamp.class,ParameterMode.IN).setParameter(2,start);
        query.registerStoredProcedureParameter(3,Timestamp.class,ParameterMode.IN).setParameter(3,end);
        query.execute();
//
//        BigDecimal count= (BigDecimal) query.getSingleResult();
//
//        return  count.longValue();
        List<Trips> trips= new ArrayList<>();
        List<Object[]> result = query.getResultList();
        result.forEach(r-> {
            Trips t = new Trips(TripTypes.Total.name(),((BigDecimal)r[0]).longValue(),Integer.valueOf(r[1].toString()));
            trips.add(t);
        });
        return trips;

    }

    @Override
    public List<VehicleAvaliabiltyMetrics> getVehiclesAvailable(String code) {
        List<VehicleAvaliabiltyMetrics> vehicleAvaliabiltyMetrics= new ArrayList<>();
        java.sql.Timestamp date= java.sql.Timestamp.valueOf(LocalDateTime.now().minusDays(13).withHour(0).withMinute(0).withSecond(0));
//        List<Object[]> listOfVehicles = em.unwrap(Session.class).createStoredProcedureCall("MSIL_VEH_AVAILABILITY")
//                .registerStoredProcedureParameter(1,void.class,ParameterMode.REF_CURSOR)
//                .registerStoredProcedureParameter(2,Timestamp.class,ParameterMode.IN).setParameter(2,date).getResultList();
        StoredProcedureQuery query = em.createStoredProcedureQuery("MSIL_VEH_AVAILABILITY");
        query.registerStoredProcedureParameter(1,Class.class,ParameterMode.REF_CURSOR);
        query.registerStoredProcedureParameter(2,String.class,ParameterMode.IN).setParameter(2,code);
        query.execute();
        List<Object[]> listOfVehicles = query.getResultList();

        listOfVehicles.stream().forEach(o-> {
            VehicleAvaliabiltyMetrics a= new VehicleAvaliabiltyMetrics(o[1].toString(), ((BigDecimal)o[0]).intValue());
            vehicleAvaliabiltyMetrics.add(a);
        });
        return vehicleAvaliabiltyMetrics;
    }

    @Override
    public List<Locations> getLocations() {
        List<Locations> locations= new ArrayList<>();
        StoredProcedureQuery query = em.createStoredProcedureQuery("MSIL_LOCATIONS");
        query.registerStoredProcedureParameter(1,Class.class,ParameterMode.REF_CURSOR);
        query.execute();

        List<Object[]> locs= query.getResultList();
        locs.stream().forEach(l->{
            Locations loc = new Locations(l[0].toString(),(String)l[1]);
            locations.add(loc);
        });
        return locations;
    }

    @Override
    public List<Trips> getOpenTripsYearly() throws SQLException {
        List<Trips> yearlyTrips = new ArrayList<>();
        java.sql.Timestamp startDate= java.sql.Timestamp.valueOf(LocalDateTime.of(2017,1,1,0,0,0));
        procedureQuery = em.createStoredProcedureQuery("MSIL_OPENTRIPS4");
        procedureQuery.registerStoredProcedureParameter(1,Class.class,ParameterMode.REF_CURSOR);
        procedureQuery.registerStoredProcedureParameter(2,Timestamp.class,ParameterMode.IN).setParameter(2,startDate);
        procedureQuery.registerStoredProcedureParameter(3,Timestamp.class,ParameterMode.IN).setParameter(3,Timestamp.valueOf(LocalDateTime.now()));
        procedureQuery.registerStoredProcedureParameter(4,String.class,ParameterMode.IN).setParameter(4,"PAST");

        procedureQuery.execute();
        List<Object[]> result = procedureQuery.getResultList();
        Trips t;
        yearlyTrips= new ArrayList<>();
//        result.stream().forEach(r->{
//            Trips t = new Trips(((BigDecimal)r[1]).intValue(),TripTypes.Open.name(),((BigDecimal)r[0]).longValue());
//            yearlyTrips.add(t);
//        });
        for(Object[] r : result){
            t= new Trips(((BigDecimal)r[1]).intValue(),TripTypes.Open.name(),((BigDecimal)r[0]).longValue());
            yearlyTrips.add(t);
        }
        return yearlyTrips;
    }

    @Override
    public List<Trips> getClosedTripsYearly() throws SQLException {
        List<Trips> yearlyTrips = new ArrayList<>();
        procedureQuery = em.createStoredProcedureQuery("MSIL_CLOSEDTRIPS4");
        procedureQuery.registerStoredProcedureParameter(1,Class.class,ParameterMode.REF_CURSOR);
        procedureQuery.registerStoredProcedureParameter(2,Timestamp.class,ParameterMode.IN).setParameter(2,Timestamp.valueOf(LocalDateTime.of(2019,1,1,0,0,0)));
        procedureQuery.registerStoredProcedureParameter(3,Timestamp.class,ParameterMode.IN).setParameter(3,Timestamp.valueOf(LocalDateTime.now()));

        procedureQuery.execute();
        List<Object[]> result = procedureQuery.getResultList();

        result.stream().forEach(r->{
            Trips t = new Trips((((BigDecimal)r[1]).intValue()),TripTypes.Closed.name(),(((BigDecimal)r[0]).longValue()));
            yearlyTrips.add(t);
        });
        return yearlyTrips;
    }

    @Override
    public List<Trips> getDelayedTripsYearly() throws SQLException {
        List<Trips> yearlyTrips = new ArrayList<>();
        procedureQuery = em.createStoredProcedureQuery("MSIL_DELAYTRIPS4");
        procedureQuery.registerStoredProcedureParameter(1,Class.class,ParameterMode.REF_CURSOR);
        procedureQuery.registerStoredProcedureParameter(2,Timestamp.class,ParameterMode.IN).setParameter(2,Timestamp.valueOf(LocalDateTime.of(2019,1,1,0,0,0)));
        procedureQuery.registerStoredProcedureParameter(3,Timestamp.class,ParameterMode.IN).setParameter(3,Timestamp.valueOf(LocalDateTime.now()));

        procedureQuery.execute();
        List<Object[]> result = procedureQuery.getResultList();

        result.stream().forEach(r->{
            Trips t = new Trips(((BigDecimal)r[1]).intValue(),TripTypes.Delayed.name(),((BigDecimal)r[0]).longValue());
            yearlyTrips.add(t);
        });
        return yearlyTrips;
    }

    @Override
    public List<Trips> getTotaltripsYearly() throws SQLException {
        List<Trips> yearlyTrips = new ArrayList<>();
        procedureQuery = em.createStoredProcedureQuery("MSIL_TOTALTRIPS4");
        procedureQuery.registerStoredProcedureParameter(1,Class.class,ParameterMode.REF_CURSOR);
        procedureQuery.registerStoredProcedureParameter(2,Timestamp.class,ParameterMode.IN).setParameter(2,Timestamp.valueOf(LocalDateTime.of(2019,1,1,0,0,0)));
        procedureQuery.registerStoredProcedureParameter(3,Timestamp.class,ParameterMode.IN).setParameter(3,Timestamp.valueOf(LocalDateTime.now()));

        procedureQuery.execute();
        List<Object[]> result = procedureQuery.getResultList();

        result.stream().forEach(r->{
            Trips t = new Trips(((BigDecimal)r[1]).intValue(),TripTypes.Total.name(),((BigDecimal)r[0]).longValue());
            yearlyTrips.add(t);
        });
        return yearlyTrips;
    }
}
