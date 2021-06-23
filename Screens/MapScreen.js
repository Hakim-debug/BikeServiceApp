import React, { Component } from 'react';

import { Platform, StyleSheet, Text, View } from 'react-native';

import MapView, {
  PROVIDER_GOOGLE,
  AnimatedRegion,
  Animated,
  Marker,
} from 'react-native-maps';
import BottomNav from '../Navigation/BottomNav';

export default class Mapscreen extends React.Component {
  getInitialState() {
    return {
      region: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }),
    };
  }

  onRegionChange(region) {
    this.state.region.setValue(region);
  }

  componentWillReceiveProps(nextProps) {
    const duration = 500;

    if (this.props.coordinate !== nextProps.coordinate) {
      if (Platform.OS === 'android') {
        if (this.marker) {
          this.marker.animateMarkerToCoordinate(nextProps.coordinate, duration);
        }
      } else {
        this.state.coordinate
          .timing({
            ...nextProps.coordinate,
            duration,
          })
          .start();
      }
    }
  }

  render() {
    return (
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        initialRegion={{
          latitude: 59.31,
          longitude: 18.07,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <MapView.Marker.Animated
          ref={(marker) => {
            this.marker = marker;
          }}
          coordinate={this.state.coordinate}
        />
      </MapView>
    );
  }
  getInitialState() {
    return {
      coordinate: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
      },
    };
  }

  takeSnapshot() {
    // 'takeSnapshot' takes a config object with the
    // following options
    const snapshot = this.map.takeSnapshot({
      width: 300, // optional, when omitted the view-width is used
      height: 300, // optional, when omitted the view-height is used
      region: { initialRegion }, // iOS only, optional region to render
      format: 'png', // image formats: 'png', 'jpg' (default: 'png')
      quality: 0.8, // image quality: 0..1 (only relevant for jpg, default: 1)
      result: 'file', // result types: 'file', 'base64' (default: 'file')
    });
    snapshot.then((uri) => {
      this.setState({ mapSnapshot: uri });
    });
  }

  render() {
    return (
      <View>
        <MapView
          initialRegion={this.state.region}
          ref={(map) => {
            this.map = map;
          }}
        >
          <Marker coordinate={this.state.coordinate} />
        </MapView>
        <Image source={{ uri: this.state.mapSnapshot.uri }} />
        <TouchableOpacity onPress={this.takeSnapshot}>
          Take Snapshot
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        initialRegion={{
          latitude: 59.31,
          longitude: 18.07,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    );
  }
}
{
  /* <script
  async
  defer
  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAI-eLPBzure5sKkcTLSpYKE6HTgvdax9k&callback=initMap"
  type="text/javascript"
></script>; */
}

const styles = StyleSheet.create({});
