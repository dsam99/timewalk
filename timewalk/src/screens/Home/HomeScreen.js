import React from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Text
} from 'react-native';
import SideScroller from '../../components/SideScroller/SideScroller';
import Colors from '../../constants/Colors';

export default class HomeScreen extends React.Component {
  state = {
    header: null,
    fadeAnim: new Animated.Value(0),
    loaded: false
  };

  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 2000,
      }
    ).start(() => {
      Animated.timing(
        this.state.fadeAnim,
        {
          toValue: 0,
          duration: 500,
        }
      ).start(() => {
        this.setState({
          loaded: true
        })
      })
    });
  }

  renderLoad() {
    let { fadeAnim } = this.state;

    return (
      <Animated.View
        style={{
          opacity: fadeAnim,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={styles.loadText} >
          Welcome to TimeWalk
        </Text>
      </Animated.View>
    );
  }

  renderMain() {
    if (this.state.loaded) {
      return <SideScroller />;
    } else {
      return this.renderLoad();
    }
  }

  render() {
    return (
      <View style={styles.container}>

        {this.renderMain()}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },

  loadText: {
    fontSize: 40,
    marginHorizontal: 50,
    color: Colors.darkGray,
    fontWeight: '700',
    textAlign: 'center'
  }
});
