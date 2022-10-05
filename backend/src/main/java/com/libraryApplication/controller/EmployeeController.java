package com.libraryApplication.controller;

import com.libraryApplication.entity.Employee;
import com.libraryApplication.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("rest/employee")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @RequestMapping(value = "info", method = RequestMethod.GET)
    public String info(){
        return "The application is running...";
    }

    //endpoints
    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @GetMapping("/{id}")
    public Optional<Employee> getEmployeeById(@PathVariable long id) {
        return employeeService.getById(id);
    }

    @PostMapping
    public String createEmployee(@RequestBody Employee employee) {
        return employeeService.createEmployee(employee);
    }

    @RequestMapping(value = "updateEmployee", method = RequestMethod.PUT)
    public String updateEmployee(@RequestBody Employee employee){
        return employeeService.updateEmployee(employee);
    }

    @RequestMapping(value = "deleteEmployee", method = RequestMethod.DELETE)
    public String deleteEmployee(@RequestBody Employee employee){
        return employeeService.deleteEmployee(employee);
    }
}
