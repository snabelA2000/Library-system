package com.libraryApplication.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.sql.Date;

@Entity
public class LibraryItem {

    @Id
    @GeneratedValue
    private int id;
    @JsonBackReference
    @ManyToOne
    @JoinColumn(name="category_id")
    private Category category;
    private String title;
    private String author;
    private Integer pages;
    private String type;
    private Integer runTimeMinutes;
    private boolean isBorrowable;
    private String borrower;
    private Date borrowDate;

    public LibraryItem() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Integer getPages() {
        return pages;
    }

    public void setPages(Integer pages) {
        this.pages = pages;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getRunTimeMinutes() {
        return runTimeMinutes;
    }

    public void setRunTimeMinutes(Integer runTimeMinutes) {
        this.runTimeMinutes = runTimeMinutes;
    }

    public boolean isBorrowable() {
        return isBorrowable;
    }

    public void setBorrowable(boolean borrowable) {
        isBorrowable = borrowable;
    }

    public String getBorrower() {
        return borrower;
    }

    public void setBorrower(String borrower) {
        this.borrower = borrower;
    }

    public Date getBorrowDate() {
        return borrowDate;
    }

    public void setBorrowDate(Date borrowDate) {
        this.borrowDate = borrowDate;
    }

    @Override
    public String toString() {
        return "LibraryItem{" +
                "id=" + id +
                ", category=" + category +
                ", title='" + title + '\'' +
                ", author='" + author + '\'' +
                ", pages=" + pages +
                ", type='" + type + '\'' +
                ", runTimeMinutes=" + runTimeMinutes +
                ", isBorrowable=" + isBorrowable +
                ", borrower='" + borrower + '\'' +
                ", borrowDate=" + borrowDate +
                '}';
    }
}
