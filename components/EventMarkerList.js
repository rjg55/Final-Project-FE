import React from 'react';
import { Marker } from 'react-native-maps';
import { useContext } from 'react';
import { EventContext } from '../contexts/EventsContext';

const EventsList = () => {

    const { events } = useContext(EventContext) 

  return (
    <>
      {events.map((event) => {
        return (
          <Marker
            key={event._id}
            coordinate={{
              latitude: event.coords.lat,
              longitude: event.coords.long
            }}
            title={event.title}
            description={event.description}
          />
        );
      })}
    </>
  );
};

export default EventsList;
