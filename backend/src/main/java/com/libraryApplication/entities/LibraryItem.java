package com.libraryApplication.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Date;

@Entity
public class LibraryItem {

    @Id
    @GeneratedValue
    private long id;
    private Integer categoryId;
    private String title;
    private String author;
    private Integer pages;
    private String type;
    private Integer runTimeMinutes;
    private boolean isBorrowable;
    private String borrower;
    private Date borrowDate;
}
