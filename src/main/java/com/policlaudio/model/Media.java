package com.policlaudio.model;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@Entity
public class Media {

    @Id
    private String id;

    @Index
    private Map<Classification, String> classification;

    @Index
    private List<String> tags;

    @Index
    private Type type;

    private String uri;

    private String description;

    private Size size;

    public enum Size {
        SMALL,
        MEDIUM,
        LARGE
    }

    public enum Type {
        PHOTO,
        VIDEO
    }
}
