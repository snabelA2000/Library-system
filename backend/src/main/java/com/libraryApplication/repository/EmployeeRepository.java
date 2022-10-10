package com.libraryApplication.repository;

import com.libraryApplication.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

    @Query("SELECT max(e.id) from Employee e")
    public Integer findMaxId();

    @Query("SELECT e FROM Employee e WHERE e.isManager = 'false'")
    Collection<Employee> findAllRegularEmployees();

    @Query("SELECT e FROM Employee e WHERE e.isManager = 'true'")
    Collection<Employee> findAllManagers();

    @Query("SELECT e FROM Employee e WHERE e.isCeo = 'true'")
    Optional<Employee> findCeo();

}
