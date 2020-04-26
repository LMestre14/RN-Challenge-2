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
        <Animated.ScrollView ref={onRef} {...props} onScroll={event}>
            {children}
        </Animated.ScrollView>
        </View>
    );
}