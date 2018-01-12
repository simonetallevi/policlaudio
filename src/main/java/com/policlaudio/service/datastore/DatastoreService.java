package com.policlaudio.service.datastore;

import com.google.appengine.api.NamespaceManager;
import com.google.appengine.api.datastore.Cursor;
import com.google.appengine.api.datastore.QueryResultIterator;
import com.google.common.base.Function;
import com.google.common.collect.Lists;
import com.googlecode.objectify.Key;
import com.googlecode.objectify.Objectify;
import com.googlecode.objectify.ObjectifyService;
import com.googlecode.objectify.cmd.Query;
import com.googlecode.objectify.cmd.QueryKeys;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Slf4j
public class DatastoreService {

    @Getter
    private final String space;

    public DatastoreService(String space) {
        this.space = space;
        NamespaceManager.set(space);
    }

    public Objectify ofy() {
        return ObjectifyService.ofy();
    }

    public class QueryExecutor<T> {

        private Query<T> query;

        @Getter
        private Cursor cursor;

        private QueryExecutor(Query<T> query) {
            this.query = query;
        }

        public List<T> execute() {
            return Lists.newArrayList(query.list());
        }

        public <R> R iterate(Function<QueryResultIterator<T>, R> func) {
            QueryResultIterator<T> iterator = query.iterator();
            R result = func.apply(iterator);
            cursor = iterator.getCursor();
            ofy().clear();
            return result;
        }

        public QueryKeys<T> keys() {
            return query.keys();
        }
    }

    public <V> Key createKey(final Class<V> clazz, final Object id) {
        return createKey(null, clazz, id);
    }

    public <V> Key createKey(final Key<V> parentKey, final Class<V> clazz, final Object id) {

        if (!(id instanceof String) && !(id instanceof Long)) {
            throw new IllegalStateException("Only supported Long and String id");
        }

        if(parentKey != null) {
            if (id instanceof String) {
                return Key.create(parentKey, clazz, (String) id);
            }
            return Key.create(parentKey, clazz, (Long) id);
        }else{
            if (id instanceof String) {
                return Key.create(clazz, (String) id);
            }
            return Key.create(clazz, (Long) id);
        }
    }
}
