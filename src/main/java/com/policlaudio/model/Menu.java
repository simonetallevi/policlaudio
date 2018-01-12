package com.policlaudio.model;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Menu {

    @Id
    private String id;

    private Classification classification;

    @Index
    private List<String> subMenus;
}
