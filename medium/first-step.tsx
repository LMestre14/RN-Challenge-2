class App extends React.Component {
  static defaultProps = {
    scaleParallaxHeader: true,
  };

  _animatedValue = new Animated.Value(0);

  constructor(props: Props) {
    super(props);

    this._animatedValue.addListener(this.onScroll);
  }

  onScroll = ({value}) => {};

  render() {
    const {children, onRef, ...props} = this.props;
    return (
      <View style={{flex: 1}}>
        <Animated.ScrollView ref={onRef} {...props}>
          {children}
        </Animated.ScrollView>
      </View>
    );
  }
}
