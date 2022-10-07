package com.libraryApplication.service;

import com.libraryApplication.entity.Category;
import com.libraryApplication.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAllCategories(){
        return categoryRepository.findAll();
    }

    public Optional<Category> getById(int id) {
        return categoryRepository.findById(id);
    }

    /*
    @Transactional
    public String createCategory(Category category){
        try {
            if (!categoryRepository.existsByCategoryName(category.getCategoryName())){
                category.setId(null == categoryRepository.findMaxId()? 0 : categoryRepository.findMaxId() + 1);
                System.out.println("-----service createCategory: " + category);
                categoryRepository.save(category);
                return "Category record created successfully.";
            }else {
                return "Category already exists in the database.";
            }
        }catch (Exception e){
            throw e;
        }
    }
    */

    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    public List<Category> readCategories(){
        return categoryRepository.findAll();
    }

    @Transactional
    public String updateCategory(Category category){
        if (categoryRepository.existsByCategoryName(category.getCategoryName())){
            try {
                List<Category> categories = categoryRepository.findByCategoryName(category.getCategoryName());
                categories.stream().forEach(s -> {
                    Category employeeToBeUpdate = categoryRepository.findById(s.getId()).get();
                    employeeToBeUpdate.setCategoryName(category.getCategoryName());
                    categoryRepository.save(employeeToBeUpdate);
                });
                return "Category record updated.";
            }catch (Exception e){
                throw e;
            }
        }else {
            return "Category does not exists in the database.";
        }
    }

    @Transactional
    public String deleteCategory(Category category){
        if (categoryRepository.existsByCategoryName(category.getCategoryName())){
            try {
                List<Category> categories = categoryRepository.findByCategoryName(category.getCategoryName());
                categories.stream().forEach(s -> {
                    categoryRepository.delete(s);
                });
                return "Category record deleted successfully.";
            }catch (Exception e){
                throw e;
            }

        }else {
            return "Category does not exist";
        }
    }
}