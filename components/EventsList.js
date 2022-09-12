import React from 'react';
import { getEvents } from '../api';
import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Marker } from 'react-native-maps';

const EventsList = () => {
  const [ events, setEvents ] = useState([]);

  useEffect(() => {
    getEvents()
      .then((eventsFromApi) => {
        setEvents(eventsFromApi);
      })
      .catch((err) => {
        setError({ err });
      });
  }, []);

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
