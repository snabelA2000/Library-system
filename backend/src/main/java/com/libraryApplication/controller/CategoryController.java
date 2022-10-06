package com.libraryApplication.controller;

import com.libraryApplication.entity.Category;
import com.libraryApplication.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("rest/category")
@CrossOrigin
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @RequestMapping(value = "info", method = RequestMethod.GET)
    public String info(){
        return "The application is running...";
    }

    //endpoints

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<Category> readCategories(){
        return categoryService.readCategories();
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public String createCategory(@RequestBody Category category){
        System.out.println("Requestbody category: " + category);
        return categoryService.createCategory(category);
    }

    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    public String updateCategory(@RequestBody Category category){
        return categoryService.updateCategory(category);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.DELETE)
    public String deleteCategory(@RequestBody Category category){
        return categoryService.deleteCategory(category);
    }
}
