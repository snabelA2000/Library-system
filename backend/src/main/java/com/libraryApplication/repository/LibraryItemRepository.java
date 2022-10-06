package com.libraryApplication.repository;

import com.libraryApplication.entity.LibraryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LibraryItemRepository extends JpaRepository<LibraryItem, Integer> {

    public boolean existsByTitle(String title);

    public List<LibraryItem> findByTitle(String title);

    @Query("SELECT max(item.id) from LibraryItem item")
    public Integer findMaxId();

}

