package com.libraryApplication.repository;

import com.libraryApplication.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

    public boolean existsByCategoryName(String categoryName);

    public List<Category> findByCategoryName(String categoryName);

    @Query("SELECT max(cat.id) from Category cat")
    public Integer findMaxId();

}
