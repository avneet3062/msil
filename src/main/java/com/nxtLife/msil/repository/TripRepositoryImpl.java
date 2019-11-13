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
    public List<Trips> getOpenTrips(Integer year) throws SQLException {
        java.sql.Timestamp start = java.sql.Timestamp.valueOf(LocalDateTime.of(year, 1, 1, 0, 0, 0));
        java.sql.Timestamp end = java.sql.Timestamp.valueOf(LocalDateTime.of(year, 12, 31, 23, 59, 59));

        List<Trips> trips = new ArrayList<>();
        StoredProcedureQuery query = em.createStoredProcedureQuery("MSIL_OPENTRIPS3");
        query.registerStoredProcedureParameter(1, Class.class, ParameterMode.REF_CURSOR);
        query.registerStoredProcedureParameter(2, Timestamp.class, ParameterMode.IN).setParameter(2, start);
        query.registerStoredProcedureParameter(3, Timestamp.class, ParameterMode.IN).setParameter(3, end);
        query.registerStoredProcedureParameter(4, String.class, ParameterMode.IN).setParameter(4, "PAST");

        query.execute();

        List<Object[]> result = query.getResultList();
        result.forEach(r -> {
            Trips t = new Trips(TripTypes.Open.name(), ((BigDecimal) r[0]).longValue(), Integer.valueOf(r[1].toString()));
            trips.add(t);
        });

        return trips;
    }

    //
    @Override
    public List<Trips> getClosedTrips(Integer year) throws SQLException {
        java.sql.Timestamp start = java.sql.Timestamp.valueOf(LocalDateTime.of(year, 1, 1, 0, 0, 0));
        java.sql.Timestamp end = java.sql.Timestamp.valueOf(LocalDateTime.of(year, 12, 31, 23, 59, 59));
        List<Trips> trips = new ArrayList<>();

        StoredProcedureQuery query = em.createStoredProcedureQuery("MSIL_CLOSEDTRIPS3");
        query.registerStoredProcedureParameter(1, Class.class, ParameterMode.REF_CURSOR);
        query.registerStoredProcedureParameter(2, Timestamp.class, ParameterMode.IN).setParameter(2, start);
        query.registerStoredProcedureParameter(3, Timestamp.class, ParameterMode.IN).setParameter(3, end);
        query.execute();

        List<Object[]> result = query.getResultList();
        result.forEach(r -> {
            Trips t = new Trips(TripTypes.Closed.name(), ((BigDecimal) r[0]).longValue(), Integer.valueOf(r[1].toString()));
            trips.add(t);
        });

        return trips;
    }

    @Override
    public List<Trips> getDelayedTrips(Integer year) throws SQLException {
        java.sql.Timestamp start = java.sql.Timestamp.valueOf(LocalDateTime.of(year, 1, 1, 0, 0, 0));
        java.sql.Timestamp end = java.sql.Timestamp.valueOf(LocalDateTime.of(year, 12, 31, 23, 59, 59));

        StoredProcedureQuery query = em.createStoredProcedureQuery("MSIL_DELAYTRIPS3");
        query.registerStoredProcedureParameter(1, Class.class, ParameterMode.REF_CURSOR);
        query.registerStoredProcedureParameter(2, Timestamp.class, ParameterMode.IN).setParameter(2, start);
        query.registerStoredProcedureParameter(3, Timestamp.class, ParameterMode.IN).setParameter(3, end);
        query.execute();

        List<Trips> trips = new ArrayList<>();
        List<Object[]> result = query.getResultList();
        result.forEach(r -> {
            Trips t = new Trips(TripTypes.Delayed.name(), ((BigDecimal) r[0]).longValue(), Integer.valueOf(r[1].toString()));
            trips.add(t);
        });
        return trips;
    }

    @Override
    public List<Trips> getTotalTrips(Integer year) throws SQLException {
        java.sql.Timestamp start = java.sql.Timestamp.valueOf(LocalDateTime.of(year, 1, 1, 0, 0, 0));
        java.sql.Timestamp end = java.sql.Timestamp.valueOf(LocalDateTime.of(year, 12, 31, 23, 59, 59));

        StoredProcedureQuery query = em.createStoredProcedureQuery("MSIL_TOTALTRIPS3");
        query.registerStoredProcedureParameter(1, Class.class, ParameterMode.REF_CURSOR);
        query.registerStoredProcedureParameter(2, Timestamp.class, ParameterMode.IN).setParameter(2, start);
        query.registerStoredProcedureParameter(3, Timestamp.class, ParameterMode.IN).setParameter(3, end);
        query.execute();

        List<Trips> trips = new ArrayList<>();
        List<Object[]> result = query.getResultList();
        result.forEach(r -> {
            Trips t = new Trips(TripTypes.Total.name(), ((BigDecimal) r[0]).longValue(), Integer.valueOf(r[1].toString()));
            trips.add(t);
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
    public List<Trips> getOpenTrips() throws SQLException {
        List<Trips> yearlyTrips = new ArrayList<>();
        java.sql.Timestamp startDate = java.sql.Timestamp.valueOf(LocalDateTime.of(2017, 1, 1, 0, 0, 0));

        StoredProcedureQuery procedureQuery = em.createStoredProcedureQuery("MSIL_OPENTRIPS4");
        procedureQuery.registerStoredProcedureParameter(1, Class.class, ParameterMode.REF_CURSOR);
        procedureQuery.registerStoredProcedureParameter(2, Timestamp.class, ParameterMode.IN).setParameter(2, startDate);
        procedureQuery.registerStoredProcedureParameter(3, Timestamp.class, ParameterMode.IN).setParameter(3, Timestamp.valueOf(LocalDateTime.now()));
        procedureQuery.registerStoredProcedureParameter(4, String.class, ParameterMode.IN).setParameter(4, "PAST");

        procedureQuery.execute();
        List<Object[]> result = procedureQuery.getResultList();
        Trips t;
        yearlyTrips = new ArrayList<>();

        for (Object[] r : result) {
            t = new Trips(((BigDecimal) r[1]).intValue(), TripTypes.Open.name(), ((BigDecimal) r[0]).longValue());
            yearlyTrips.add(t);
        }
        return yearlyTrips;
    }

    @Override
    public List<Trips> getClosedTrips() throws SQLException {
        List<Trips> yearlyTrips = new ArrayList<>();
        StoredProcedureQuery procedureQuery = em.createStoredProcedureQuery("MSIL_CLOSEDTRIPS4");
        procedureQuery.registerStoredProcedureParameter(1, Class.class, ParameterMode.REF_CURSOR);
        procedureQuery.registerStoredProcedureParameter(2, Timestamp.class, ParameterMode.IN).setParameter(2, Timestamp.valueOf(LocalDateTime.of(2017, 1, 1, 0, 0, 0)));
        procedureQuery.registerStoredProcedureParameter(3, Timestamp.class, ParameterMode.IN).setParameter(3, Timestamp.valueOf(LocalDateTime.now()));

        procedureQuery.execute();
        List<Object[]> result = procedureQuery.getResultList();

        result.stream().forEach(r -> {
            Trips t = new Trips((((BigDecimal) r[1]).intValue()), TripTypes.Closed.name(), (((BigDecimal) r[0]).longValue()));
            yearlyTrips.add(t);
        });
        return yearlyTrips;
    }

    @Override
    public List<Trips> getDelayedTrips() throws SQLException {
        List<Trips> yearlyTrips = new ArrayList<>();
        StoredProcedureQuery procedureQuery = em.createStoredProcedureQuery("MSIL_DELAYTRIPS4");
        procedureQuery.registerStoredProcedureParameter(1, Class.class, ParameterMode.REF_CURSOR);
        procedureQuery.registerStoredProcedureParameter(2, Timestamp.class, ParameterMode.IN).setParameter(2, Timestamp.valueOf(LocalDateTime.of(2017, 1, 1, 0, 0, 0)));
        procedureQuery.registerStoredProcedureParameter(3, Timestamp.class, ParameterMode.IN).setParameter(3, Timestamp.valueOf(LocalDateTime.now()));

        procedureQuery.execute();
        List<Object[]> result = procedureQuery.getResultList();

        result.stream().forEach(r -> {
            Trips t = new Trips(((BigDecimal) r[1]).intValue(), TripTypes.Delayed.name(), ((BigDecimal) r[0]).longValue());
            yearlyTrips.add(t);
        });
        return yearlyTrips;
    }

    @Override
    public List<Trips> getTotaltrips() throws SQLException {
        List<Trips> yearlyTrips = new ArrayList<>();
        StoredProcedureQuery procedureQuery = em.createStoredProcedureQuery("MSIL_TOTALTRIPS4");
        procedureQuery.registerStoredProcedureParameter(1, Class.class, ParameterMode.REF_CURSOR);
        procedureQuery.registerStoredProcedureParameter(2, Timestamp.class, ParameterMode.IN).setParameter(2, Timestamp.valueOf(LocalDateTime.of(2017, 1, 1, 0, 0, 0)));
        procedureQuery.registerStoredProcedureParameter(3, Timestamp.class, ParameterMode.IN).setParameter(3, Timestamp.valueOf(LocalDateTime.now()));

        procedureQuery.execute();
        List<Object[]> result = procedureQuery.getResultList();

        result.stream().forEach(r -> {
            Trips t = new Trips(((BigDecimal) r[1]).intValue(), TripTypes.Total.name(), ((BigDecimal) r[0]).longValue());
            yearlyTrips.add(t);
        });
        return yearlyTrips;
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
//                .setParameter(2,Timestamp.valueOf(LocalDateTime.now().minusDays(1l)));;
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
//                .setParameter(2,Timestamp.valueOf(LocalDateTime.now().minusDays(1l)));;
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
//                .setParameter(2,Timestamp.valueOf(LocalDateTime.now().minusDays(1l)));;
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
//                .setParameter(2,Timestamp.valueOf(LocalDateTime.now().minusDays(1l)));;
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
//                .setParameter(2,Timestamp.valueOf(LocalDateTime.now().minusDays(1l)));;
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

    @Override
    public List<Trips> getTotalTrips(Integer year, Integer month) {
        LocalDateTime firstDay= LocalDateTime.of(year,month,1,0,0,0);
        LocalDateTime lastDay= firstDay.with(TemporalAdjusters.lastDayOfMonth());
        List<Trips> dayWise = new ArrayList<>();
        StoredProcedureQuery procedureQuery = em.createStoredProcedureQuery("MSIL_TOTALTRIPS6");
        procedureQuery.registerStoredProcedureParameter(1, Class.class, ParameterMode.REF_CURSOR);
        procedureQuery.registerStoredProcedureParameter(2, Timestamp.class, ParameterMode.IN).setParameter(2, Timestamp.valueOf(firstDay));
        procedureQuery.registerStoredProcedureParameter(3, Timestamp.class, ParameterMode.IN).setParameter(3, Timestamp.valueOf(lastDay));
        procedureQuery.registerStoredProcedureParameter(4,String.class,ParameterMode.IN).setParameter(4, Duration.day.name().toUpperCase());
        procedureQuery.execute();
        List<Object[]> result = procedureQuery.getResultList();

        result.stream().forEach(r -> {
            Trips t = new Trips(TripTypes.Total.name(),Integer.parseInt(r[0].toString()), ((BigDecimal) r[1]).longValue() );
            dayWise.add(t);
        });
        return dayWise;
    }

    @Override
    public Trips getOpenTrips(Date d,Integer day) {
        Trips dayWise = new Trips();
        StoredProcedureQuery procedureQuery = em.createStoredProcedureQuery("MSIL_OPENTRIPS6");
        procedureQuery.registerStoredProcedureParameter(1, Class.class, ParameterMode.REF_CURSOR);
        procedureQuery.registerStoredProcedureParameter(2, Timestamp.class, ParameterMode.IN).setParameter(2, new java.sql.Timestamp(d.getTime()));
        procedureQuery.registerStoredProcedureParameter(3, String.class, ParameterMode.IN).setParameter(3, "PAST");

        procedureQuery.execute();
        Long result = Long.parseLong(procedureQuery.getSingleResult().toString());
        Trips t = new Trips(TripTypes.Open.name(),day,result);
        return t;
    }

    @Override
    public List<Trips> getClosedTrips(Integer year, Integer month) {

        List<Trips> dayWise = new ArrayList<>();
        LocalDateTime firstDay= LocalDateTime.of(year,month,1,0,0,0);
        LocalDateTime lastDay= firstDay.with(TemporalAdjusters.lastDayOfMonth());
        StoredProcedureQuery procedureQuery = em.createStoredProcedureQuery("MSIL_CLOSEDTRIPS5");
        procedureQuery.registerStoredProcedureParameter(1, Class.class, ParameterMode.REF_CURSOR);
        procedureQuery.registerStoredProcedureParameter(2, Timestamp.class, ParameterMode.IN).setParameter(2, Timestamp.valueOf(firstDay));
        procedureQuery.registerStoredProcedureParameter(3, Timestamp.class, ParameterMode.IN).setParameter(3, Timestamp.valueOf(lastDay));

        procedureQuery.execute();
        List<Object[]> result = procedureQuery.getResultList();

        result.stream().forEach(r -> {
            Trips t = new Trips( TripTypes.Closed.name(), Integer.parseInt(r[1].toString()), ((BigDecimal) r[0]).longValue() );
            dayWise.add(t);
        });
        return dayWise;
    }

    @Override
    public List<Trips> getDelayedTrips(Integer year, Integer month) {

        List<Trips> dayWise = new ArrayList<>();
        LocalDateTime firstDay= LocalDateTime.of(year,month,1,0,0,0);
        LocalDateTime lastDay= firstDay.with(TemporalAdjusters.lastDayOfMonth());
        StoredProcedureQuery procedureQuery = em.createStoredProcedureQuery("MSIL_DELAYTRIPS5");
        procedureQuery.registerStoredProcedureParameter(1, Class.class, ParameterMode.REF_CURSOR);
        procedureQuery.registerStoredProcedureParameter(2, Timestamp.class, ParameterMode.IN).setParameter(2, Timestamp.valueOf(firstDay));
        procedureQuery.registerStoredProcedureParameter(3, Timestamp.class, ParameterMode.IN).setParameter(3, Timestamp.valueOf(lastDay));

        procedureQuery.execute();
        List<Object[]> result = procedureQuery.getResultList();

        result.stream().forEach(r -> {
            Trips t = new Trips(TripTypes.Delayed.name() , Integer.parseInt(r[1].toString()),((BigDecimal) r[0]).longValue() );
            dayWise.add(t);
        });
        return dayWise;
    }


}
