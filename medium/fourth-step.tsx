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

render() {
    return (
        <View style={{flex: 1}}>
            <Animated.ScrollView ref={onRef} {...props} onScroll={event} stickyHeaderIndices={[2]}>
                {this.renderParallaxHeader()}
                <View style={{height: this.stickyMarginTop}} />
                {this.renderStickyHeader()}
                {children}
            </Animated.ScrollView>
            {this.renderFixedHeader()}
        </View>
    );
}