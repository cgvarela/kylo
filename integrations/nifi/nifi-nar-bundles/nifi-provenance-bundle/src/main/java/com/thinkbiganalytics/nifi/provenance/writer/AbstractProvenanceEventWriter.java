package com.thinkbiganalytics.nifi.provenance.writer;

/**
 * Created by sr186054 on 3/4/16.
 */
public abstract class AbstractProvenanceEventWriter implements ProvenanceEventWriter{
    protected ProvenanceEventIdIncrementer eventIdIncrementer = new ProvenanceEventIdIncrementer();

    @Override
    public void checkAndSetMaxEventId(Long l) {
        if(eventIdIncrementer.isNull()){
            eventIdIncrementer.setId(l);
        }
    }
}