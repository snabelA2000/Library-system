package com.libraryApplication.entity;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Category {

    @Id
    @GeneratedValue
    private int id;
    private String categoryName;
    @OneToMany(mappedBy="category")
    private Set<LibraryItem> libraryItems;

    public Category() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public Set<LibraryItem> getLibraryItems() {
        return libraryItems;
    }

    public void setLibraryItems(Set<LibraryItem> libraryItems) {
        this.libraryItems = libraryItems;
    }

    @Override
    public String toString() {
        return "Category{" +
                "id=" + id +
                ", categoryName='" + categoryName + '\'' +
                ", libraryItems=" + libraryItems +
                '}';
    }
}
