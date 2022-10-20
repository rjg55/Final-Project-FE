import { Button, Text, View } from 'react-native';

const EventsButton = ({ navigation }) => {
  return (
    <View>
      <Button
        title="Go to events"
        onPress={() => navigation.navigate('Events')}>
        Go to events
      </Button>
      <Text>Hello!!!!</Text>
    </View>
  );
};

export default EventsButton;
