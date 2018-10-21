import React from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Text,
  ScrollView,
  Dimensions,
  TextInput
} from 'react-native';
import SideScroller from '../../components/SideScroller/SideScroller';
import Colors from '../../constants/Colors';
import Uploadbutton from '../../components/Button/UploadButton';

const { height } = Dimensions.get('window');

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



  renderMemories() {
    if (this.state.loaded) {
      return (
        <View
          style={memories.container}
        >

          {/* <Uploadbutton
            text={'Upload text'}
            icon={'format-color-text'}
            backgroundColor={Colors.electricBlue}
            textColor={Colors.white}
            borderColor={Colors.white}
          /> */}

        </View>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
          paddingTop: 40
          // height: '100%',
        }}
      >
        {/* <View
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={true}
          scrollEnabled={true}
          bounces={true}
          overScrollMode='always'
        > */}
        {this.renderMain()}
        {/* {this.renderMemories()} */}
        {/* </ScrollView> */}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: height,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'center',
    // paddingBottom: 60
    // marginBottom: 5
    // paddingBottom: 40
  },

  loadText: {
    fontSize: 40,
    marginHorizontal: 50,
    color: Colors.darkGray,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'space-mono'
  }
});

const memories = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {

  }
})