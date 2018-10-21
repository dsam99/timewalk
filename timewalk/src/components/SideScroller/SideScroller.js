import React from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Image,
    Dimensions,
    Text,
    Animated,
    TextInput,
    Modal
} from 'react-native';
import customData from '../../data/position_data_cleaned.json';

import { Constants, ImagePicker, Permissions } from 'expo';

import Swiper from 'react-native-swiper';
import Colors from '../../constants/Colors';
import Uploadbutton from '../Button/UploadButton';

const { width } = Dimensions.get('window');

export default class SideScroller extends React.Component {
    state = {
        data: null,
        index: 0,
        fadeAnim: new Animated.Value(0),
        modalVisible: false,
        height: 0,
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

    formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    memoryUpdate = (text) => {
        const { index } = this.state;
        const array = [... this.state.data["1"].locations];
        // console.log(array);
        array[index].text = text;

        this.setState({
            data: {
                ...this.state.data,
                "1": {
                    ...this.state.data["1"],
                    locations: array
                }
            }
        })
    }

    _pickImage = async (index) => {
        const {
            status: cameraRollPerm
        } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraRollPerm === 'granted') {
            let pickerResult = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });

            this._handleImagePicked(pickerResult);
        }
    }

    _takePhoto = async () => {
        const {
            status: cameraPerm
        } = await Permissions.askAsync(Permissions.CAMERA);

        const {
            status: cameraRollPerm
        } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        // only if user allows permission to camera AND camera roll
        if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
            let pickerResult = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });

            this._handleImagePicked(pickerResult);
        }
    };

    _handleImagePicked = pickerResult => {
        if (!pickerResult.cancelled) {
            const { index } = this.state;
            const array = [... this.state.data["1"].locations];
            // console.log(array);
            array[index].image = pickerResult.uri;
            // console.log(pickerResult);

            this.setState({
                data: {
                    ...this.state.data,
                    "1": {
                        ...this.state.data["1"],
                        locations: array
                    }
                }
            });
        }
    };


    renderText(index) {
        return this.state.data["1"].locations[index].text ? "View memory" : "Upload text";
    }

    renderItem(item, index) {
        photograph = this.state.data["1"].locations[index].image || item.placePhotograph;
        date = this.formatAMPM(new Date(item.timestamp));
        console.log(date);

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
                    {/* {date.getHours()} */}
                    {/* {date.toLocaleTimeString()} */}
                    {date}
                </Text>

                <Uploadbutton
                    text={this.renderText(index)}
                    icon={'format-color-text'}
                    backgroundColor={Colors.white}
                    textColor={Colors.darkGray}
                    borderColor={Colors.black}
                    execute={this.openModal}
                />

                <Uploadbutton
                    text={"Upload image"}
                    icon={'camera'}
                    backgroundColor={Colors.white}
                    textColor={Colors.darkGray}
                    borderColor={Colors.black}
                    style={{ marginTop: 20 }}
                    execute={() => this._pickImage(index)}
                // execute={this.openModal}
                />
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

    openModal = () => {
        this.setState({
            modalVisible: true
        });
    }

    closeModal = () => {
        this.setState({
            modalVisible: false,
        });
    }

    _swiperIndexChange = (index) => {
        this.setState({
            index
        })
    }

    render() {
        const { locations } = this.state.data["1"];
        const { fadeAnim, index, modalVisible } = this.state;
        // console.log(locations);

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
                    onIndexChanged={this._swiperIndexChange}
                    index={this.state.index}
                    showsButtons={false}
                    showsPagination={false}
                >
                    {locations.map((item, index) => {
                        return this.renderItem(item, index);
                    })}
                </Swiper>

                <Modal
                    visible={this.state.modalVisible}
                    onRequestClose={() => { }}
                    transparent={true}
                    presentationStyle={"overFullScreen"}
                    animationType={'fade'}
                >
                    <View style={memories.container}>
                        <TextInput
                            style={[memories.text, { height: Math.max(35, this.state.height) }]}
                            autoCapitalize={'sentences'}
                            autoCorrect={true}
                            value={locations[index].text}
                            onChangeText={this.memoryUpdate}
                            maxLength={100}
                            onContentSizeChange={(event) => {
                                this.setState({ height: event.nativeEvent.contentSize.height })
                            }}
                            multiline={true}
                            placeholder={'You have 180 characters, make the best use of it'}
                            placeholderTextColor={Colors.lightGray}
                        />

                        <Uploadbutton
                            text={"Save"}
                            icon={"save"}
                            backgroundColor={Colors.white}
                            textColor={Colors.darkGray}
                            borderColor={Colors.black}
                            execute={this.closeModal}
                        />
                    </View>
                </Modal>
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
        justifyContent: 'center',
        // paddingBottom: 20
    },

    container: {
        // flex: 1,
        // borderWidth: 2,
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        height: '100%',
        flexDirection: 'column'
    }
});

const memories = StyleSheet.create({
    text: {
        fontFamily: 'space-mono',
        fontSize: 20,
        fontWeight: '700',
        color: Colors.mediumGray,
        flex: 1,
        height: 100,
        width: '80%',
        alignSelf: 'center'
    },

    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        // paddingBottom: 400,
        flexDirection: 'column',
        marginTop: 350,
        height: 400,
        width: '100%',
        backgroundColor: Colors.white,
        borderRadius: 20,
        borderColor: Colors.white,
        overflow: 'hidden'
    },
})

const location = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        // borderWidth: 1,
        // borderColor: 'blue'
        width: width,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: '10%',
        paddingTop: 20
    },

    pic: {
        width: 200,
        height: 200,
        borderRadius: 100,
        // borderWidth: 2,
    },

    name: {
        // fontFamily: 'SpaceMono-Regular',
        fontSize: 40,
        marginTop: 20,
        fontWeight: '900',
        color: Colors.darkGray,
        width: '100%',
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: 'space-mono'
    },

    time: {
        fontFamily: 'space-mono',
        fontSize: 60,
        fontWeight: 'bold',
        marginTop: 20,
        color: Colors.lightGray,
        height: 100
    },

    address: {
        fontSize: 25,
        color: Colors.lightGray,
        fontStyle: 'italic'
    }
})