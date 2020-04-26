import React from 'react';
import {View, Animated, StyleSheet} from 'react-native';

class ParallaxScrollView extends React.Component {
  static defaultProps = {
    scaleParallaxHeader: true,
  };

  _animatedValue = new Animated.Value(0);

  constructor(props) {
    super(props);

    this._animatedValue.addListener(this.onScroll);
  }

  get stickyMarginTop() {
    const {parallaxHeaderHeight = 0, stickyHeaderHeight = 0} = this.props;
    return Math.abs(parallaxHeaderHeight - stickyHeaderHeight);
  }

  onScroll = ({value}) => {
    const {onScroll, onSticky, stickyHeaderHeight} = this.props;

    if (typeof onScroll === 'function') {
      onScroll(value);
    }
    if (typeof onSticky === 'function') {
      onSticky(value >= stickyHeaderHeight);
    }
  };

  renderFixedHeader() {
    const {fixedHeader} = this.props;

    if (typeof fixedHeader !== 'function') {
      return null;
    }

    return (
      <View style={Styles.fixedHeader}>{fixedHeader(this._animatedValue)}</View>
    );
  }

  renderStickyHeader() {
    const {stickyHeader, isSectionList} = this.props;

    if (typeof stickyHeader !== 'function') {
      return null;
    }

    return stickyHeader(this._animatedValue);
  }

  renderParallaxHeader() {
    const {
      parallaxHeader,
      scaleParallaxHeader,
      parallaxHeaderHeight,
    } = this.props;

    if (typeof parallaxHeader !== 'function') {
      return null;
    }

    let animationStyle = null;
    if (scaleParallaxHeader) {
      const scaleValue = 5;
      const scale = this._animatedValue.interpolate({
        inputRange: [-parallaxHeaderHeight, 0],
        outputRange: [scaleValue * 1.5, 1],
        extrapolate: 'clamp',
      });
      animationStyle = {
        transform: [{scale}],
      };
    }

    return (
      <Animated.View
        style={[
          Styles.parallaxHeader,
          animationStyle,
          {height: parallaxHeaderHeight},
        ]}>
        {parallaxHeader(this._animatedValue)}
      </Animated.View>
    );
  }

  render() {
    const {children, onRef, ...props} = this.props;

    const event = Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              y: this._animatedValue,
            },
          },
        },
      ],
      {useNativeDriver: true},
    );

    return (
      <View style={{flex: 1}}>
        <Animated.ScrollView
          ref={onRef}
          {...props}
          onScroll={event}
          stickyHeaderIndices={[2]}>
          {this.renderParallaxHeader()}
          <View style={{height: this.stickyMarginTop}} />
          {this.renderStickyHeader()}
          {children}
        </Animated.ScrollView>
        {this.renderFixedHeader()}
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  fixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },

  parallaxHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
  },
});

export default ParallaxScrollView;
