package com.libraryApplication.controller;

import com.libraryApplication.entity.Employee;
import com.libraryApplication.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<Employee> readStudents(){
        return employeeService.readEmployees();
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

    @RequestMapping(value = "/delete", method = RequestMethod.DELETE)
    public String deleteEmployee(@RequestBody Employee employee){
        return employeeService.deleteEmployee(employee);
    }
}
