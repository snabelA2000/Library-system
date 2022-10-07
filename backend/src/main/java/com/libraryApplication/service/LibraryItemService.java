package com.libraryApplication.service;

import com.libraryApplication.entity.Category;
import com.libraryApplication.entity.LibraryItem;
import com.libraryApplication.repository.LibraryItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class LibraryItemService {

    @Autowired
    private LibraryItemRepository libraryItemRepository;

    public List<LibraryItem> getAllLibraryItems(){
        return libraryItemRepository.findAll();
    }

    public Optional<LibraryItem> getById(int id) {
        return libraryItemRepository.findById(id);
    }

    /*
    @Transactional
    public LibraryItem createLibraryItem(LibraryItem libraryItem){
        try {
            if (!libraryItemRepository.existsByTitle(libraryItem.getTitle())){
                libraryItem.setId(null == libraryItemRepository.findMaxId()? 0 : libraryItemRepository.findMaxId() + 1);
                System.out.println("-----service createLibraryItem: " + libraryItem);
                libraryItemRepository.save(libraryItem);
                return libraryItem;
            }else {
                return libraryItem;
            }
        }catch (Exception e){
            throw e;
        }
    }
    */

    public LibraryItem createLibraryItem(LibraryItem libraryItem) {
        return libraryItemRepository.save(libraryItem);
    }

    public List<LibraryItem> readLibraryItems(){
        return libraryItemRepository.findAll();
    }

    @Transactional
    public String updateLibraryItem(LibraryItem libraryItem){
        if (libraryItemRepository.existsByTitle(libraryItem.getTitle())){
            try {
                List<LibraryItem> libraryItems = libraryItemRepository.findByTitle(libraryItem.getTitle());
                libraryItems.stream().forEach(s -> {
                    LibraryItem employeeToBeUpdate = libraryItemRepository.findById(s.getId()).get();
                    employeeToBeUpdate.setTitle(libraryItem.getTitle());
                    libraryItemRepository.save(employeeToBeUpdate);
                });
                return "LibraryItem record updated.";
            }catch (Exception e){
                throw e;
            }
        }else {
            return "LibraryItem does not exists in the database.";
        }
    }

    @Transactional
    public String deleteLibraryItem(LibraryItem libraryItem){
        if (libraryItemRepository.existsByTitle(libraryItem.getTitle())){
            try {
                List<LibraryItem> libraryItems = libraryItemRepository.findByTitle(libraryItem.getTitle());
                libraryItems.stream().forEach(s -> {
                    libraryItemRepository.delete(s);
                });
                return "LibraryItem record deleted successfully.";
            }catch (Exception e){
                throw e;
            }

        }else {
            return "LibraryItem does not exist";
        }
    }
}