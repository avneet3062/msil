package com.nxtLife.msil.repository;

import com.nxtLife.msil.enums.Duration;
import com.nxtLife.msil.enums.TripTypes;
import com.nxtLife.msil.enums.Violations;
import com.nxtLife.msil.views.*;
import org.apache.catalina.Store;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.ParameterMode;
import javax.persistence.PersistenceContext;
import javax.persistence.StoredProcedureQuery;
import javax.sql.DataSource;
import java.math.BigDecimal;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.TemporalAdjuster;
import java.time.temporal.TemporalAdjusters;
import java.time.temporal.TemporalField;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Repository
public class TripRepositoryImpl implements TripRepository {

    @PersistenceContext
    private EntityManager em;

    @Autowired
    private DataSource dataSource;

    @Override
   public List<Trips> getOpenTrips(int minYear, Date fromDate,Date toDate,Date today,String order)  {
        List<Trips> trips = new ArrayList<>();
       StoredProcedureQuery query = em.createStoredProcedureQuery("MSIL_OPEN_TRIPS");
       query.registerStoredProcedureParameter(1, Class.class, ParameterMode.REF_CURSOR);
        query.registerStoredProcedureParameter(2, Timestamp.class, ParameterMode.IN).setParameter(2, Timestamp.valueOf(LocalDateTime.ofInstant(fromDate.toInstant(),
                ZoneId.systemDefault())));
        query.registerStoredProcedureParameter(3, Timestamp.class, ParameterMode.IN).setParameter(3, Timestamp.valueOf(LocalDateTime.ofInstant(toDate.toInstant(),
                ZoneId.systemDefault())));
        query.registerStoredProcedureParameter(4, Timestamp.class, ParameterMode.IN).setParameter(4, Timestamp.valueOf(LocalDateTime.now()));
       query.registerStoredProcedureParameter(5, Timestamp.class, ParameterMode.IN).setParameter(5, Timestamp.valueOf(LocalDateTime.of(minYear,1,1,0,0,0)));
       query.registerStoredProcedureParameter(6, String.class, ParameterMode.IN).setParameter(6, order);

       query.execute();

        List<Object[]> result = query.getResultList();
        result.stream().forEach(r -> {
            Trips trip = new Trips(TripTypes.Open, ((BigDecimal) r[1]).longValue(), Integer.valueOf(r[0].toString()));
            trips.add(trip);
        });
     return trips;
    }

   @Override
   public List<Trips> getClosedTrips(int minYear,Date fromDate,Date toDate, String order){

       List<Trips> trips = new ArrayList<>();
        StoredProcedureQuery procedureQuery = em.createStoredProcedureQuery("MSIL_CLOSED_TRIPS");
        procedureQuery.registerStoredProcedureParameter(1, Class.class, ParameterMode.REF_CURSOR);
        procedureQuery.registerStoredProcedureParameter(2, Timestamp.class, ParameterMode.IN).setParameter(2, Timestamp.valueOf(LocalDateTime.ofInstant(fromDate.toInstant(),
                ZoneId.systemDefault())));
        procedureQuery.registerStoredProcedureParameter(3, Timestamp.class, ParameterMode.IN).setParameter(3, Timestamp.valueOf(LocalDateTime.ofInstant(toDate.toInstant(),
                ZoneId.systemDefault())));
       procedureQuery.registerStoredProcedureParameter(4, Timestamp.class, ParameterMode.IN).setParameter(4, Timestamp.valueOf(LocalDateTime.of(minYear,1,1,0,0,0)));
        procedureQuery.registerStoredProcedureParameter(5, String.class, ParameterMode.IN).setParameter(5, order);


        procedureQuery.execute();
        List<Object[]> result = procedureQuery.getResultList();
       result.stream().forEach(r -> {
           Trips trip = new Trips(TripTypes.Closed, ((BigDecimal) r[0]).longValue(), Integer.valueOf(r[1].toString()));
           trips.add(trip);
       });
       return trips;

   }

    @Override
    public List<Trips> getDelayedTrips(int minYear,Date fromDate,Date toDate, String order)
    {
        List<Trips> trips = new ArrayList<>();
        StoredProcedureQuery procedureQuery = em.createStoredProcedureQuery("MSIL_DELAY_TRIPS");
        procedureQuery.registerStoredProcedureParameter(1, Class.class, ParameterMode.REF_CURSOR);
        procedureQuery.registerStoredProcedureParameter(2, Timestamp.class, ParameterMode.IN).setParameter(2, Timestamp.valueOf(LocalDateTime.ofInstant(fromDate.toInstant(),
                ZoneId.systemDefault())));
        procedureQuery.registerStoredProcedureParameter(3, Timestamp.class, ParameterMode.IN).setParameter(3, Timestamp.valueOf(LocalDateTime.ofInstant(toDate.toInstant(),
                ZoneId.systemDefault())));
        procedureQuery.registerStoredProcedureParameter(4, Timestamp.class, ParameterMode.IN).setParameter(4, Timestamp.valueOf(LocalDateTime.of(minYear,1,1,0,0,0)));
        procedureQuery.registerStoredProcedureParameter(5, String.class, ParameterMode.IN).setParameter(5, order);


        procedureQuery.execute();
        List<Object[]> result = procedureQuery.getResultList();
        result.stream().forEach(r -> {
            Trips trip = new Trips(TripTypes.Delayed, ((BigDecimal) r[0]).longValue(), Integer.valueOf(r[1].toString()));
            trips.add(trip);
        });
        return trips;

    }
    @Override
    public List<VehicleAvaliabiltyMetrics> getVehiclesAvailable(String code) {
        List<VehicleAvaliabiltyMetrics> vehicleAvaliabiltyMetrics = new ArrayList<>();
        java.sql.Timestamp date = java.sql.Timestamp.valueOf(LocalDateTime.now().minusDays(13).withHour(0).withMinute(0).withSecond(0));

        StoredProcedureQuery query = em.createStoredProcedureQuery("MSIL_VEH_AVAILABILITY");
        query.registerStoredProcedureParameter(1, Class.class, ParameterMode.REF_CURSOR);
        query.registerStoredProcedureParameter(2, String.class, ParameterMode.IN).setParameter(2, code);
        query.execute();
        List<Object[]> listOfVehicles = query.getResultList();

        listOfVehicles.stream().forEach(o -> {
            VehicleAvaliabiltyMetrics a = new VehicleAvaliabiltyMetrics(o[1].toString(), ((BigDecimal) o[0]).intValue());
            vehicleAvaliabiltyMetrics.add(a);
        });
        return vehicleAvaliabiltyMetrics;
    }

    @Override
    public List<Locations> getLocations() {
        List<Locations> locations = new ArrayList<>();
        StoredProcedureQuery query = em.createStoredProcedureQuery("MSIL_LOCATIONS");
        query.registerStoredProcedureParameter(1, Class.class, ParameterMode.REF_CURSOR);
        query.execute();

        List<Object[]> locs = query.getResultList();
        locs.stream().forEach(l -> {
            Locations loc = new Locations(l[0].toString(), (String) l[1]);
            locations.add(loc);
        });
        return locations;
    }



    @Override
    public List<Transporters> getTransporters() {
        List<Transporters> transporters = new ArrayList<>();
        StoredProcedureQuery procedureQuery = em.createStoredProcedureQuery("MSIL_TRANSPORTER");
        procedureQuery.registerStoredProcedureParameter(1, Class.class, ParameterMode.REF_CURSOR);
        procedureQuery.execute();

        List<Object[]> result = procedureQuery.getResultList();
        result.stream().forEach(r -> {
            Transporters t = new Transporters(r[0].toString(), r[1].toString());
            transporters.add(t);
        });
        return transporters;
    }

    @Override
    public List<ViolationsCount> getContinousDrivingViolations() {
        List<ViolationsCount> violationsCounts = new ArrayList<>();
        StoredProcedureQuery procedureQuery = em.createStoredProcedureQuery("MSIL_CONTIDRIVE_VIOLATIONS");
        procedureQuery.registerStoredProcedureParameter(1, Class.class, ParameterMode.REF_CURSOR);
        procedureQuery.registerStoredProcedureParameter(2, Timestamp.class, ParameterMode.IN).setParameter(2, Timestamp.valueOf(LocalDateTime.of(2019, 9, 1, 0, 0, 0)));
        procedureQuery.execute();

        List<Object[]> result = procedureQuery.getResultList();
        result.stream().forEach(r -> {
            ViolationsCount violation = new ViolationsCount(r[1].toString(), Violations.ContinuousDriving, ((BigDecimal) r[0]).intValue());
            violationsCounts.add(violation);
        });
        return violationsCounts;
    }

    @Override
    public List<ViolationsCount> getFreeWheelingViolations() {
        List<ViolationsCount> violationsCounts = new ArrayList<>();
        StoredProcedureQuery procedureQuery = em.createStoredProcedureQuery("MSIL_FREEWHEELING_VIOLATIONS");
        procedureQuery.registerStoredProcedureParameter(1, Class.class, ParameterMode.REF_CURSOR);
        procedureQuery.registerStoredProcedureParameter(2, Timestamp.class, ParameterMode.IN)
                .setParameter(2, Timestamp.valueOf(LocalDateTime.of(2019, 9, 1, 0, 0, 0)));

        procedureQuery.execute();

        List<Object[]> result = procedureQuery.getResultList();
        result.stream().forEach(r -> {
            ViolationsCount violation = new ViolationsCount(r[1].toString(), Violations.Freewheeling, ((BigDecimal) r[0]).intValue());
            violationsCounts.add(violation);
        });
        return violationsCounts;
    }

    @Override
    public List<ViolationsCount> getHarshBreakViolations() {
        List<ViolationsCount> violationsCounts = new ArrayList<>();
        StoredProcedureQuery procedureQuery = em.createStoredProcedureQuery("MSIL_HARSHBRAKING_VIOLATIONS");
        procedureQuery.registerStoredProcedureParameter(1, Class.class, ParameterMode.REF_CURSOR);
        procedureQuery.registerStoredProcedureParameter(2, Timestamp.class, ParameterMode.IN).setParameter(2, Timestamp.valueOf(LocalDateTime.of(2019, 9, 1, 0, 0, 0)));

        procedureQuery.execute();

        List<Object[]> result = procedureQuery.getResultList();
        result.stream().forEach(r -> {
            ViolationsCount violation = new ViolationsCount(r[1].toString(), Violations.HarshBreaking, ((BigDecimal) r[0]).intValue());
            violationsCounts.add(violation);
        });
        return violationsCounts;
    }

    @Override
    public List<ViolationsCount> getRapidAccelerationViolations() {
        List<ViolationsCount> violationsCounts = new ArrayList<>();
        StoredProcedureQuery procedureQuery = em.createStoredProcedureQuery("MSIL_RAPIDACC_VIOLATIONS");
        procedureQuery.registerStoredProcedureParameter(1, Class.class, ParameterMode.REF_CURSOR);
        procedureQuery.registerStoredProcedureParameter(2, Timestamp.class, ParameterMode.IN)
                .setParameter(2, Timestamp.valueOf(LocalDateTime.of(2019, 9, 1, 0, 0, 0)));
//                .setParameter(2,Timestamp.valueOf(LocalDateTime.now().minusDays(1l)));;
        procedureQuery.execute();

        List<Object[]> result = procedureQuery.getResultList();
        result.stream().forEach(r -> {
            ViolationsCount violation = new ViolationsCount(r[1].toString(), Violations.RapidAcceleration, ((BigDecimal) r[0]).intValue());
            violationsCounts.add(violation);
        });
        return violationsCounts;
    }

    @Override
    public List<ViolationsCount> getStoppageViolations() {
        List<ViolationsCount> violationsCounts = new ArrayList<>();
        StoredProcedureQuery procedureQuery = em.createStoredProcedureQuery("MSIL_STOPPAGE_VIOLATIONS");
        procedureQuery.registerStoredProcedureParameter(1, Class.class, ParameterMode.REF_CURSOR);
        procedureQuery.registerStoredProcedureParameter(2, Timestamp.class, ParameterMode.IN)
                .setParameter(2, Timestamp.valueOf(LocalDateTime.of(2019, 9, 1, 0, 0, 0)));
        procedureQuery.execute();

        List<Object[]> result = procedureQuery.getResultList();
        result.stream().forEach(r -> {
            ViolationsCount violation = new ViolationsCount(r[1].toString(), Violations.Stoppage, ((BigDecimal) r[0]).intValue());
            violationsCounts.add(violation);
        });
        return violationsCounts;
    }

    @Override
    public List<ViolationsCount> getNightDrivingViolations() {
        List<ViolationsCount> violationsCounts = new ArrayList<>();
        StoredProcedureQuery procedureQuery = em.createStoredProcedureQuery("MSIL_NIGHTDRIVE_VIOLATIONS");
        procedureQuery.registerStoredProcedureParameter(1, Class.class, ParameterMode.REF_CURSOR);
        procedureQuery.registerStoredProcedureParameter(2, Timestamp.class, ParameterMode.IN)
                .setParameter(2, Timestamp.valueOf(LocalDateTime.of(2019, 9, 1, 0, 0, 0)));

        procedureQuery.execute();

        List<Object[]> result = procedureQuery.getResultList();
        result.stream().forEach(r -> {
            ViolationsCount violation = new ViolationsCount(r[1].toString(), Violations.NightDriving, ((BigDecimal) r[0]).intValue());
            violationsCounts.add(violation);
        });
        return violationsCounts;
    }

    @Override
    public List<ViolationsCount> getOverspeedViolations() {
        List<ViolationsCount> violationsCounts = new ArrayList<>();
        StoredProcedureQuery procedureQuery = em.createStoredProcedureQuery("MSIL_OVERSPEED_VIOLATIONS");
        procedureQuery.registerStoredProcedureParameter(1, Class.class, ParameterMode.REF_CURSOR);
        procedureQuery.registerStoredProcedureParameter(2, Timestamp.class, ParameterMode.IN)
                .setParameter(2, Timestamp.valueOf(LocalDateTime.of(2019, 9, 1, 0, 0, 0)));

        procedureQuery.execute();

        List<Object[]> result = procedureQuery.getResultList();
        result.stream().forEach(r -> {
            ViolationsCount violation = new ViolationsCount(r[1].toString(), Violations.Overspeed, ((BigDecimal) r[0]).intValue());
            violationsCounts.add(violation);
        });
        return violationsCounts;
    }

    @Override
    public FleetUtilized getFleetUtilization(Date date,Integer day, String custId) {
        List<FleetUtilized> fleetUtilizedList = new ArrayList<>();
        FleetUtilized utilized;
        StoredProcedureQuery procedureQuery = em.createStoredProcedureQuery("MSIL_FLEET_UTILIZATION2");
        procedureQuery.registerStoredProcedureParameter(1, Class.class, ParameterMode.REF_CURSOR);
        procedureQuery.registerStoredProcedureParameter(2, Timestamp.class, ParameterMode.IN).setParameter(2, new java.sql.Timestamp(date.getTime()));
        procedureQuery.registerStoredProcedureParameter(3, String.class, ParameterMode.IN).setParameter(3, custId);

        procedureQuery.execute();
        List<Object[]> result = procedureQuery.getResultList();
        result.stream().forEach(r -> {
            FleetUtilized fleetUtilized = new FleetUtilized(date,day,
                    ((BigDecimal) r[0]).longValue(), ((BigDecimal) r[1]).longValue(), (BigDecimal) r[2]);
            fleetUtilizedList.add(fleetUtilized);
        });
        return fleetUtilizedList.get(0);
    }

    @Override
    public List<ViolationsCount> getContinousDrivingViolations2(String custId, Date firstDay, Date lastDay, String order) {
        List<ViolationsCount> violationsCounts = new ArrayList<>();
        StoredProcedureQuery procedureQuery = em.createStoredProcedureQuery("MSIL_CONTIDRIVE3_VIOLATIONS");
        procedureQuery.registerStoredProcedureParameter(1, Class.class, ParameterMode.REF_CURSOR);
        procedureQuery.registerStoredProcedureParameter(2, Timestamp.class, ParameterMode.IN).setParameter(2, Timestamp.valueOf(LocalDateTime.ofInstant(firstDay.toInstant(),
                ZoneId.systemDefault())));
        procedureQuery.registerStoredProcedureParameter(3, Timestamp.class, ParameterMode.IN).setParameter(3, Timestamp.valueOf(LocalDateTime.ofInstant(lastDay.toInstant(),
                ZoneId.systemDefault())));
        procedureQuery.registerStoredProcedureParameter(4, String.class, ParameterMode.IN).setParameter(4, order);
        procedureQuery.registerStoredProcedureParameter(5, String.class, ParameterMode.IN).setParameter(5, custId);
        procedureQuery.execute();
        List<Object[]> result = procedureQuery.getResultList();
        result.stream().forEach(r -> {
                ViolationsCount violation = new ViolationsCount(Violations.ContinuousDriving, ((BigDecimal) r[1]).intValue(), Integer.valueOf(r[0].toString()));
                violationsCounts.add(violation);
            });

        return violationsCounts;
    }

    @Override
    public List<ViolationsCount> getFreeWheelingViolations2(String custId, Date firstDay, Date lastDay, String order) {
        List<ViolationsCount> violationsCounts = new ArrayList<>();
        StoredProcedureQuery procedureQuery = em.createStoredProcedureQuery("MSIL_FREERUN3_VIOLATIONS");
        procedureQuery.registerStoredProcedureParameter(1, Class.class, ParameterMode.REF_CURSOR);
        procedureQuery.registerStoredProcedureParameter(2, Timestamp.class, ParameterMode.IN).setParameter(2, Timestamp.valueOf(LocalDateTime.ofInstant(firstDay.toInstant(),
                ZoneId.systemDefault())));
        procedureQuery.registerStoredProcedureParameter(3, Timestamp.class, ParameterMode.IN).setParameter(3, Timestamp.valueOf(LocalDateTime.ofInstant(lastDay.toInstant(),
                ZoneId.systemDefault())));
        procedureQuery.registerStoredProcedureParameter(4, String.class, ParameterMode.IN).setParameter(4, order);
        procedureQuery.registerStoredProcedureParameter(5, String.class, ParameterMode.IN).setParameter(5, custId);
        procedureQuery.execute();
        List<Object[]> result = procedureQuery.getResultList();
            result.stream().forEach(r -> {
                ViolationsCount violation = new ViolationsCount(Violations.Freewheeling, ((BigDecimal) r[1]).intValue(), Integer.valueOf(r[0].toString()));
                violationsCounts.add(violation);
            });

        return violationsCounts;
    }

    @Override
    public List<ViolationsCount> getHarshBreakViolations2(String custId, Date firstDay, Date lastDay, String order) {
        List<ViolationsCount> violationsCounts = new ArrayList<>();
        StoredProcedureQuery procedureQuery = em.createStoredProcedureQuery("MSIL_HARSHBRAKING3_VIOLATIONS");
        procedureQuery.registerStoredProcedureParameter(1, Class.class, ParameterMode.REF_CURSOR);
        procedureQuery.registerStoredProcedureParameter(2, Timestamp.class, ParameterMode.IN).setParameter(2, Timestamp.valueOf(LocalDateTime.ofInstant(firstDay.toInstant(),
                ZoneId.systemDefault())));
        procedureQuery.registerStoredProcedureParameter(3, Timestamp.class, ParameterMode.IN).setParameter(3, Timestamp.valueOf(LocalDateTime.ofInstant(lastDay.toInstant(),
                ZoneId.systemDefault())));
        procedureQuery.registerStoredProcedureParameter(4, String.class, ParameterMode.IN).setParameter(4, order);
        procedureQuery.registerStoredProcedureParameter(5, String.class, ParameterMode.IN).setParameter(5, custId);
        procedureQuery.execute();
        List<Object[]> result = procedureQuery.getResultList();
            result.stream().forEach(r -> {
                ViolationsCount violation = new ViolationsCount(Violations.HarshBreaking, ((BigDecimal) r[1]).intValue(), Integer.valueOf(r[0].toString()));
                violationsCounts.add(violation);
            });

        return violationsCounts;
    }

    @Override
    public List<ViolationsCount> getRapidAccelerationViolations2(String custId, Date firstDay, Date lastDay, String order) {
        List<ViolationsCount> violationsCounts = new ArrayList<>();
        StoredProcedureQuery procedureQuery = em.createStoredProcedureQuery("MSIL_RAPIDACC3_VIOLATIONS");
        procedureQuery.registerStoredProcedureParameter(1, Class.class, ParameterMode.REF_CURSOR);
        procedureQuery.registerStoredProcedureParameter(2, Timestamp.class, ParameterMode.IN).setParameter(2, Timestamp.valueOf(LocalDateTime.ofInstant(firstDay.toInstant(),
                ZoneId.systemDefault())));
        procedureQuery.registerStoredProcedureParameter(3, Timestamp.class, ParameterMode.IN).setParameter(3, Timestamp.valueOf(LocalDateTime.ofInstant(lastDay.toInstant(),
                ZoneId.systemDefault())));
        procedureQuery.registerStoredProcedureParameter(4, String.class, ParameterMode.IN).setParameter(4, order);
        procedureQuery.registerStoredProcedureParameter(5, String.class, ParameterMode.IN).setParameter(5, custId);
        procedureQuery.execute();
        List<Object[]> result = procedureQuery.getResultList();
            result.stream().forEach(r -> {
                ViolationsCount violation = new ViolationsCount(Violations.RapidAcceleration, ((BigDecimal) r[1]).intValue(), Integer.valueOf(r[0].toString()));
                violationsCounts.add(violation);
            });
        return violationsCounts;
    }

    @Override
    public List<ViolationsCount> getStoppageViolations2(String custId, Date firstDay, Date lastDay, String order) {
        List<ViolationsCount> violationsCounts = new ArrayList<>();
        StoredProcedureQuery procedureQuery = em.createStoredProcedureQuery("MSIL_STOPPAGE3_VIOLATIONS");
        procedureQuery.registerStoredProcedureParameter(1, Class.class, ParameterMode.REF_CURSOR);
        procedureQuery.registerStoredProcedureParameter(2, Timestamp.class, ParameterMode.IN).setParameter(2, Timestamp.valueOf(LocalDateTime.ofInstant(firstDay.toInstant(),
                ZoneId.systemDefault())));
        procedureQuery.registerStoredProcedureParameter(3, Timestamp.class, ParameterMode.IN).setParameter(3, Timestamp.valueOf(LocalDateTime.ofInstant(lastDay.toInstant(),
                ZoneId.systemDefault())));
        procedureQuery.registerStoredProcedureParameter(4, String.class, ParameterMode.IN).setParameter(4, order);
        procedureQuery.registerStoredProcedureParameter(5, String.class, ParameterMode.IN).setParameter(5, custId);
        procedureQuery.execute();
        List<Object[]> result = procedureQuery.getResultList();
            result.stream().forEach(r -> {
                ViolationsCount violation = new ViolationsCount(Violations.Stoppage, ((BigDecimal) r[1]).intValue(), Integer.valueOf(r[0].toString()));
                violationsCounts.add(violation);
            });

        return violationsCounts;
    }

    @Override
    public List<ViolationsCount> getNightDrivingViolations2(String custId, Date firstDay, Date lastDay, String order) {
        List<ViolationsCount> violationsCounts = new ArrayList<>();
        StoredProcedureQuery procedureQuery = em.createStoredProcedureQuery("MSIL_NIGHTDRIVE3_VIOLATIONS");
        procedureQuery.registerStoredProcedureParameter(1, Class.class, ParameterMode.REF_CURSOR);
        procedureQuery.registerStoredProcedureParameter(2, Timestamp.class, ParameterMode.IN).setParameter(2, Timestamp.valueOf(LocalDateTime.ofInstant(firstDay.toInstant(),
                ZoneId.systemDefault())));
        procedureQuery.registerStoredProcedureParameter(3, Timestamp.class, ParameterMode.IN).setParameter(3, Timestamp.valueOf(LocalDateTime.ofInstant(lastDay.toInstant(),
                ZoneId.systemDefault())));
        procedureQuery.registerStoredProcedureParameter(4, String.class, ParameterMode.IN).setParameter(4, order);
        procedureQuery.registerStoredProcedureParameter(5, String.class, ParameterMode.IN).setParameter(5, custId);
        procedureQuery.execute();
        List<Object[]> result = procedureQuery.getResultList();
            result.stream().forEach(r -> {
                ViolationsCount violation = new ViolationsCount(Violations.NightDriving, ((BigDecimal) r[1]).intValue(), Integer.valueOf(r[0].toString()));
                violationsCounts.add(violation);
            });

        return violationsCounts;
    }

    @Override
    public List<ViolationsCount> getOverspeedViolations2(String custId, Date firstDay, Date lastDay, String order) {
        List<ViolationsCount> violationsCounts = new ArrayList<>();
        StoredProcedureQuery procedureQuery = em.createStoredProcedureQuery("MSIL_OVERSPEED3_VIOLATIONS");
        procedureQuery.registerStoredProcedureParameter(1, Class.class, ParameterMode.REF_CURSOR);
        procedureQuery.registerStoredProcedureParameter(2, Timestamp.class, ParameterMode.IN).setParameter(2, Timestamp.valueOf(LocalDateTime.ofInstant(firstDay.toInstant(),
                ZoneId.systemDefault())));
        procedureQuery.registerStoredProcedureParameter(3, Timestamp.class, ParameterMode.IN).setParameter(3, Timestamp.valueOf(LocalDateTime.ofInstant(lastDay.toInstant(),
                ZoneId.systemDefault())));
        procedureQuery.registerStoredProcedureParameter(4, String.class, ParameterMode.IN).setParameter(4, order);
        procedureQuery.registerStoredProcedureParameter(5, String.class, ParameterMode.IN).setParameter(5, custId);
        procedureQuery.execute();
        List<Object[]> result = procedureQuery.getResultList();
            result.stream().forEach(r -> {
                ViolationsCount violation = new ViolationsCount(Violations.Overspeed, ((BigDecimal) r[1]).intValue(), Integer.valueOf(r[0].toString()));
                violationsCounts.add(violation);
            });

        return violationsCounts;


    }

    public FleetUtilized getFleetUtilization(Integer name, Date firstDate, Date lastDay, String custId, Duration type) {
        List<FleetUtilized> list = new ArrayList<>();
        StoredProcedureQuery procedureQuery = em.createStoredProcedureQuery("MSIL_FLEET_UTILIZATION5");
        procedureQuery.registerStoredProcedureParameter(1, Class.class, ParameterMode.REF_CURSOR);
        procedureQuery.registerStoredProcedureParameter(2, Date.class, ParameterMode.IN).setParameter(2, new java.sql.Timestamp(firstDate.getTime()));
        procedureQuery.registerStoredProcedureParameter(3, Date.class, ParameterMode.IN).setParameter(3, new java.sql.Timestamp(lastDay.getTime()));
        procedureQuery.registerStoredProcedureParameter(4, String.class, ParameterMode.IN).setParameter(4, custId);
        procedureQuery.execute();
        List<Object[]> result = procedureQuery.getResultList();

        if(type.equals(Duration.month)){
        result.stream().forEach(r -> {
            FleetUtilized fleetUtilized = new FleetUtilized(name,
                    ((BigDecimal) r[0]).longValue(), ((BigDecimal) r[1]).longValue(), (BigDecimal) r[2]);
            list.add(fleetUtilized);
        });}
        else
        {
         result.stream().forEach(r -> {
            FleetUtilized fleetUtilized = new FleetUtilized(
                ((BigDecimal) r[0]).longValue(), ((BigDecimal) r[1]).longValue(), (BigDecimal) r[2],name);
            list.add(fleetUtilized);
            });
        }
        return list.get(0);
    }

    public int getMinimumYear() {
        StoredProcedureQuery procedureQuery = em.createStoredProcedureQuery("MSIL_MINIMUM_DATE");
        procedureQuery.registerStoredProcedureParameter(1, Class.class, ParameterMode.REF_CURSOR);
        procedureQuery.execute();
        Integer result = Integer.parseInt(procedureQuery.getSingleResult().toString());
           return result;
    }

}
