/**
 * 
 */
package com.thinkbiganalytics.alerts.api;

import org.joda.time.DateTime;

import com.thinkbiganalytics.alerts.api.Alert.State;

/**
 * Each instance of this type represents a state transition of an alert.  Initially, all alerts
 * will start with one change event: either UNHANDLED or CREATED.  Actionable alerts will have the
 * former event, and non-actionable alerts with the latter.
 * @author Sean Felten
 */
public interface AlertChangeEvent {
    
    /**
     * @return the ID of the alert that changed
     */
    Alert.ID getAlertId();
    
    /**
     * @return the time when the the alert transitioned to this state
     */
    DateTime getChangeTime();
    
    /**
     * @return the new state
     */
    State getState();

    /**
     * Any state change may have a piece of information associated with it.  The type of object
     * returned by this method is specific to the type of alert that was changed.
     * @return an alert-specific piece of data that may be associated with this state
     */
    <C> C getContent();

}