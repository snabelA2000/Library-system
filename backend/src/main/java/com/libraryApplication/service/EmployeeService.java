package com.libraryApplication.service;

import com.libraryApplication.entity.Employee;
import com.libraryApplication.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
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
            if (!employeeRepository.existsById(employee.getId())){
                employee.setId(null == employeeRepository.findMaxId()? 0 : employeeRepository.findMaxId() + 1);

                double calculatedSalary;
                double salaryRank = employee.getSalary();
                
                if(Objects.equals(employee.getIsCeo(), "true")){
                    calculatedSalary = salaryRank * 2.725;

                }else if(Objects.equals(employee.getIsManager(), "true")){
                    calculatedSalary = salaryRank * 1.725;

                }else{
                    calculatedSalary = salaryRank * 1.125;
                }
                employee.setSalary(calculatedSalary);

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

    public Collection<Employee> readManagers(){
        return employeeRepository.findAllManagers();
    }

    public Collection<Employee> readRegularEmployees(){
        return employeeRepository.findAllRegularEmployees();
    }

    public Optional<Employee> readCeo(){
        return employeeRepository.findCeo();
    }

    @Transactional
    public String updateEmployee(Employee employee){
        if (employeeRepository.existsById(employee.getId())){
            try {
                    Employee employeeToBeUpdate = employeeRepository.findById(employee.getId()).get();
                    employeeToBeUpdate.setFirstName(employee.getFirstName());
                    employeeToBeUpdate.setLastName(employee.getLastName());
                    employeeToBeUpdate.setSalary(employee.getSalary());
                    employeeToBeUpdate.setIsCeo(employee.getIsCeo());
                    employeeToBeUpdate.setIsManager(employee.getIsManager());
                    employeeToBeUpdate.setManagerId(employee.getManagerId());
                    System.out.println("----service UPDATE employee: " + employeeToBeUpdate);
                    employeeRepository.save(employeeToBeUpdate);
                return "Employee record updated.";
            }catch (Exception ex){
                throw ex;
            }
        }else {
            return "Employee does not exists in the database.";
        }
    }

    @Transactional
    public String deleteEmployeeById(Integer id){
        if (employeeRepository.existsById(id)){
            try {
                Employee employeeToDelete = employeeRepository.findById(id).get();
                employeeRepository.delete(employeeToDelete);
                return "Employee record deleted successfully.";
            }catch (Exception e){
                throw e;
            }
        }else {
            return "Employee does not exist";
        }
    }
}