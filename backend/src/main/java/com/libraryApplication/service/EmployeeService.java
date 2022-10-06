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

    public Optional<Employee> getById(int id) {
        return employeeRepository.findById(id);
    }

    @Transactional
    public String createEmployee(Employee employee){
        try {
            if (!employeeRepository.existsByLastName(employee.getLastName())){
                employee.setId(null == employeeRepository.findMaxId()? 0 : employeeRepository.findMaxId() + 1);
                System.out.println("-----service createEmployee: " + employee);
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
        if (employeeRepository.existsByLastName(employee.getLastName())){
            try {
                List<Employee> employees = employeeRepository.findByLastName(employee.getLastName());
                employees.stream().forEach(s -> {
                    Employee employeeToBeUpdate = employeeRepository.findById(s.getId()).get();
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
        if (employeeRepository.existsByLastName(employee.getLastName())){
            try {
                List<Employee> employees = employeeRepository.findByLastName(employee.getLastName());
                employees.stream().forEach(s -> {
                    employeeRepository.delete(s);
                });
                return "Employee record deleted successfully.";
            }catch (Exception e){
                throw e;
            }

        }else {
            return "Employee does not exist";
        }
    }
}