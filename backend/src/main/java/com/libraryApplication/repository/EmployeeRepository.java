package com.libraryApplication.repository;

import com.libraryApplication.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

    public boolean existsByLastName(String lastName);

    public List<Employee> findByLastName(String lastName);

    @Query("SELECT max(e.id) from Employee e")
    public Integer findMaxId();

}
