import React from 'react';
import { useContext } from 'react';
import { ScrollView, View } from 'react-native';
import { EventContext } from '../contexts/EventsContext';

const EventList = () => {
  const { events } = useContext(EventContext);
  return (
    <ScrollView>
      <View>
        {events.map((event) => {
          <Text>{event}</Text>;
        })}
      </View>
    </ScrollView>
  );
};

export default EventList;
