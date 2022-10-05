package com.libraryApplication.service;

import com.libraryApplication.entity.Employee;
import com.libraryApplication.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }

    public Optional<Employee> getById(long id) {
        return employeeRepository.findById(id);
    }

    @Transactional
    public String createEmployee(Employee employee){
        try {
            if (!employeeRepository.existsById(employee.getId())){
                employee.setId((long) (null == employeeRepository.findMaxId()? 0 : employeeRepository.findMaxId() + 1));
                employeeRepository.save(employee);
                return "Employee record created successfully.";
            }else {
                return "Employee already exists in the database.";
            }
        }catch (Exception e){
            throw e;
        }
    }

    public List<Employee> readEmployees(){
        return employeeRepository.findAll();
    }

    @Transactional
    public String updateEmployee(Employee employee){
        if (employeeRepository.existsByEmployeeId(employee.getId())){
            try {
                List<Employee> employees = employeeRepository.findByEmployeeId(employee.getId());
                employees.stream().forEach(e -> {
                    Employee employeeToBeUpdate = (Employee) employeeRepository.findByEmployeeId(e.getId());
                    employeeToBeUpdate.setFirstName(employee.getFirstName());
                    employeeToBeUpdate.setLastName(employee.getLastName());
                    employeeRepository.save(employeeToBeUpdate);
                });
                return "Employee record updated.";
            }catch (Exception e){
                throw e;
            }
        }else {
            return "Employee does not exists in the database.";
        }
    }

    @Transactional
    public String deleteEmployee(Employee employee){
        if (employeeRepository.existsByEmployeeId(employee.getId())){
            try {
                List<Employee> employees = employeeRepository.findByEmployeeId(employee.getId());
                employees.stream().forEach(e -> {
                    employeeRepository.delete(e);
                });
                return "Employee record deleted successfully.";
            }catch (Exception ex){
                throw ex;
            }

        }else {
            return "Employee does not exist";
        }
    }
}