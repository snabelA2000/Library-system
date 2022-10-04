package com.libraryApplication.entities;

import javax.persistence.*;

@Entity
public class Category {

    @Id
    @GeneratedValue
    private long id;
    private String categoryName;
}
