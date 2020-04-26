import React from 'react';
import {
  Animated,
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import ParallaxScrollView from './ParallaxScrollView';

/**
 * Photo by Anna Meshkov on Unsplash
 */
const uri =
  'https://images.unsplash.com/photo-1587895517743-aeb27c849044?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80';

export default class App extends React.Component {
  renderParallaxHeader = (value) => {
    return <Image source={{uri}} style={Styles.image} resizeMode="cover" />;
  };
  renderFixedHeader = (value) => {
    return (
      <View style={Styles.fixedHeader}>
        <Text style={{color: 'white'}}>Fixed Header</Text>
      </View>
    );
  };
  renderStickyHeader = (value) => {
    const opacity = value.interpolate({
      inputRange: [0, 150, 200],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });
    return (
      <View style={Styles.stickyHeader}>
        <Animated.View style={[Styles.stickyHeaderBackground, {opacity}]} />
      </View>
    );
  };

  render() {
    const IHeight = 250;
    const HeaderHeight = 50;

    return (
      <SafeAreaView style={{flex: 1}}>
        <ParallaxScrollView
          style={{flex: 1}}
          parallaxHeaderHeight={IHeight}
          stickyHeaderHeight={HeaderHeight}
          parallaxHeader={this.renderParallaxHeader}
          fixedHeader={this.renderFixedHeader}
          stickyHeader={this.renderStickyHeader}>
          <View style={Styles.content}>
            <Text>Content</Text>
          </View>
        </ParallaxScrollView>
      </SafeAreaView>
    );
  }
}

const Styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  fixedHeader: {
    height: 50,
    width: '100%',
    padding: 10,
    justifyContent: 'center',
  },
  stickyHeader: {
    height: 50,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  stickyHeaderBackground: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'purple',
  },
  content: {
    width: '100%',
    height: 10000,
    padding: 20,
    backgroundColor: 'green',
  },
});
