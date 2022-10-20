import React, { useEffect } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  TouchableOpacity,
  Dimensions,
  Platform,
  Button,
} from "react-native";
import { useContext } from "react";
import { EventContext } from "../contexts/EventsContext";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";

const { width, height } = Dimensions.get("window");
const CARD_WIDTH = width * 0.818;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const Map = () => {
  const { events } = useContext(EventContext);
  const navigation = useNavigation();

  const initialMapState = {
    region: {
      latitude: 53.4808,
      longitude: -2.2426,
      latitudeDelta: 0.2,
      longitudeDelta: 0.2,
    },
  };

  const [state, setState] = React.useState(initialMapState);

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= events.length) {
        index = events.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { coords } = events[index];
          _map.current.animateToRegion(
            {
              latitude: coords.lat,
              longitude: coords.long,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            },
            350
          );
        }
      }, 10);
    });
  });

  const interpolations = events.map((event, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp",
    });

    return { scale };
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === "ios") {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({ x: x, y: 0, animated: false });
  };

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        style={styles.map}
        initialRegion={{
          latitude: 53.4808,
          longitude: -2.2426,
          latitudeDelta: 0.3,
          longitudeDelta: 0.3,
        }}
        provider={PROVIDER_GOOGLE}
      >
        {events.map((event, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };
          const date = format(new Date(event.startTime), "d MMM yyyy");
          const start_time = format(new Date(event.startTime), "h:mm bbb");
          return (
            <MapView.Marker
              key={index}
              coordinate={{
                latitude: event.coords.lat,
                longitude: event.coords.long,
              }}
              onPress={(e) => onMarkerPress(e)}
              title={event.title}
              description={`${date} - ${start_time}`}
            >
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require("../map_marker.png")}
                  style={[styles.marker, scaleStyle]}
                  resizeMode="cover"
                />
              </Animated.View>
            </MapView.Marker>
          );
        })}
      </MapView>
      <ScrollView style={styles.addButton}>
        <Button
          title="Create event +"
          color="#FF6347"
          onPress={() => {
            navigation.navigate("NewEvent");
          }}
        />
      </ScrollView>
      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        style={styles.scrollView}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET,
        }}
        contentContainerStyle={{
          paddingHorizontal:
            Platform.OS === "android" ? SPACING_FOR_CARD_INSET : 0,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        {events.map((event, index) => (
          <View style={styles.card} key={index}>
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardtitle}>
                {event.title}
              </Text>
              <Text numberOfLines={1} style={styles.cardDescription}>
                {event.description}
              </Text>
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Event Details", { _id: event._id });
                  }}
                  style={[
                    styles.signIn,
                    {
                      borderColor: "#FF6347",
                      borderWidth: 1,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: "#FFFFFF",
                      },
                    ]}
                  >
                    Go To Event
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  addButton: {
    position: "absolute",
    marginTop: Platform.OS === "ios" ? 70 : 0,
    top: 0,
    width: "100%",
    zIndex: 100,
  },
  searchBox: {
    position: "absolute",
    marginTop: Platform.OS === "ios" ? 40 : 20,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  chipsScrollView: {
    position: "absolute",
    top: 10,
    paddingHorizontal: 10,
  },
  chipsIcon: {
    marginRight: 5,
  },
  chipsItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 8,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    height: 35,
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: 35,
    left: 0,
    right: 0,
    // paddingVertical: 10
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 2,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: 135,
    width: CARD_WIDTH,
    overflow: "hidden",
    borderRadius: 6,
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 18,
    paddingBottom: 8,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    paddingBottom: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: "center",
    marginTop: 5,
    justifyContent: "center",
  },
  signIn: {
    width: "100%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#FF6347",
  },
  textSign: {
    fontSize: 15,
    fontWeight: "bold",
    padding: 10,
    color: "#fff",
  },
});
