# Just Meet - Mobile App

The API for this app can be found at [this](https://github.com/rjg55/backend-JML) link.

Trying to make friends in a city or new place can be difficult. We’re here to fix that. Our app is called Just Meet. We’ve designed it to facilitate meeting up for social events and meeting like minded people in your area. The design is simple and straightforward, making it easy to meet new people and discover your new favorite hobby. You can see events in your area with an interactive map, join events/groups that align with your interests, post new events that you want others to join and make a user profile to link all your attended and hosted events.

- **Inspired by** - Other apps like too good to go (where you can see different restaurants offering surplus food around you on a map view) and partner/friend finding apps that are more focused on making new connections

- **Who’s it for** - people new to an area, people looking for activities to do, people looking to make new friends.

There are user accounts (no authentification added yet) so a user can see events on a mapview or list, view/comment/join individual events, view/join groups and edit their profile.

Tech Stack:

- React-native framework - components, routing, state and context.
- Google Maps API - Used for displaying events on a mapview with markers. Geocode was used for querying a user-inputted address to return coordinates that could be used to display a markers location.
- Expo Go - is used for running the app on a phone.
- Axios - for API requests
- Packages - we utilised an extensive range of packages from the react native libray such as react-native-maps, navigation, router and many more

# Links

API: https://just-meet.onrender.com/api/

Hosted on render.

# Minimum Version Requirements

Node: v18.3.0 or later

# How to run this project locally

Prerequisites: You will need to login and generate a google maps API key and store it in file: maps_key.js in the root of this repo. Details can be found [here](https://developers.google.com/maps/documentation/javascript)

1. Fork this repo : https://github.com/rjg55/Final-Project-FE
2. In your terminal, clone this repo:

   ```
   git clone <your-new-repo-url>
   ```

3. Open your new directory

   ```
   cd <your-new-repo-name>
   ```

4. Open repo in VSCode:

   ```
   code .
   ```

5. Within VSCode, open the terminal and run:

   ```
   npm install
   ```

   Note: To avoid dependency hell with future updates, you may need to add --force

   ```
   npm start
   ```

   This should display a QR code that you can scan in the Expo Go app on your phone to display the app.

6. Hey presto! Your version of this project should be running locally via your browser on a local host!
   https://github.com/rjg55/backend-JML
