import React from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Image,
    Dimensions,
    Text,
    Animated
} from 'react-native';
import customData from '../../data/example.json';

import Swiper from 'react-native-swiper';
import Colors from '../../constants/Colors';

const { width } = Dimensions.get('window');

export default class SideScroller extends React.Component {
    state = {
        data: null,
        index: 0,
        fadeAnim: new Animated.Value(0),
    };

    componentDidMount() {
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 1,
                duration: 100,
            }
        ).start();
    }

    renderItem(item, index) {
        photograph = item["placePhotograph"];
        console.log(photograph);

        return (
            <View style={location.container} key={index}>
                <Image
                    source={{ uri: photograph }}
                    style={location.pic}
                />

                <Text style={location.name} >
                    {item.name}
                </Text>

                <Text style={location.address}>
                    {item.address}
                </Text>

                <Text style={location.time}>
                    {item.timeStart} - {item.timeEnd}
                </Text>

                <Text style={[location.time, { marginTop: 10 }]}>
                    Time elapsed: {item.timeEnd - item.timeStart} hours
                </Text>
            </View>
        );
    }

    async componentWillMount() {
        // console.log(customData);
        this.setState({
            data: customData,
        }, () => {
            // console.log(this.state.data);
        });
    }

    render() {
        const { locations } = this.state.data["1"];
        const { fadeAnim } = this.state;
        console.log(locations);

        return (
            <Animated.View style={[styles.container, { opacity: fadeAnim }]}>

                <Swiper
                    containerStyle={styles.list}
                    // contentContainerStyle={styles.listContainer}
                    horizontal={true}
                    loop={false}
                    width={width}
                    loadMinimal={true}
                    scrollEnabled={true}
                    // onIndexChanged={this._swiperIndexChange}
                    // index={this.state.index}
                    showsButtons={false}
                >
                    {locations.map((item, index) => {
                        return this.renderItem(item, index);
                    })}

                </Swiper>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        // borderWidth: 2,
        // borderColor: 'blue'
    },

    listContainer: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    container: {
        flex: 1,
        // borderWidth: 2,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const location = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        // borderWidth: 1,
        // borderColor: 'blue'
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 50,
        paddingHorizontal: 50,
    },

    pic: {
        width: 200,
        height: 200,
        borderRadius: 100,
        // borderWidth: 2,
    },

    name: {
        // fontFamily: 'SpaceMono-Regular',
        fontSize: 30,
        marginTop: 20,
        fontWeight: '700',
        color: Colors.darkGray
    },

    time: {
        // fontFamily: 'SpaceMono-Regular',
        fontSize: 25,
        marginTop: 60,
        color: Colors.mediumGray
    },

    address: {
        fontSize: 25,
        marginTop: 10,
        color: Colors.lightGray
    }
})