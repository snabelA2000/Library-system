package com.libraryApplication.controller;

import com.libraryApplication.entity.LibraryItem;
import com.libraryApplication.service.LibraryItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("rest/libraryItem")
@CrossOrigin
public class LibraryItemController {

    @Autowired
    private LibraryItemService libraryItemService;

    @RequestMapping(value = "info", method = RequestMethod.GET)
    public String info(){
        return "The application is running...";
    }

    //endpoints
    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<LibraryItem> readLibraryItems(){
        return libraryItemService.readLibraryItems();
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public LibraryItem createLibraryItem(@RequestBody LibraryItem libraryItem){
        System.out.println("Requestbody libraryItem: " + libraryItem);
        return libraryItemService.createLibraryItem(libraryItem);
    }

    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    public String updateLibraryItem(@RequestBody LibraryItem libraryItem){
        return libraryItemService.updateLibraryItem(libraryItem);
    }

    @RequestMapping(value = "/delete", method = RequestMethod.DELETE)
    public String deleteLibraryItem(@RequestBody LibraryItem libraryItem){
        return libraryItemService.deleteLibraryItem(libraryItem);
    }
}
