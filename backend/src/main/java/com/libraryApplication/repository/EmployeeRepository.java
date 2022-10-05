package com.libraryApplication.repository;

import com.libraryApplication.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    public boolean existsByEmployeeId(long id);

    public List<Employee> findByEmployeeId(Long id);

    @Query("SELECT max(e.id) from Employee e")
    public Integer findMaxId();
}
