package com.libraryApplication.controller;

import com.libraryApplication.entity.Employee;
import com.libraryApplication.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("rest/employee")
@CrossOrigin
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @RequestMapping(value = "info", method = RequestMethod.GET)
    public String info(){
        return "The application is running...";
    }

    //endpoints

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Optional<Employee> getEmployeeById(@PathVariable Integer id){
        return employeeService.getById(id);
    }

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<Employee> readEmployees(){
        return employeeService.readEmployees();
    }

    @RequestMapping(value = "/managers", method = RequestMethod.GET)
    public Collection<Employee> readManagers(){
        return employeeService.readManagers();
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public String createEmployee(@RequestBody Employee employee){
        System.out.println("Requestbody employee: " + employee);
        return employeeService.createEmployee(employee);
    }

    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    public String updateEmployee(@RequestBody Employee employee){
        return employeeService.updateEmployee(employee);
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public String deleteEmployeeById(@PathVariable Integer id){
        return employeeService.deleteEmployeeById(id);
    }
}
