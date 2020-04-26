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


return (
  <View style={{flex: 1}}>
    <Animated.ScrollView ref={onRef} {...props} onScroll={event}>
      {this.renderParallaxHeader()}
      {this.renderStickyHeader()}
      {children}
    </Animated.ScrollView>
    {this.renderFixedHeader()}
  </View>
);
