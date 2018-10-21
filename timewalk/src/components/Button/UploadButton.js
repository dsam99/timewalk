import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native';

import { Icon } from 'react-native-elements';
import Colors from '../../constants/Colors';

const { width } = Dimensions.get('window')

export default class Uploadbutton extends React.Component {
    state = {
        loading: false
    }

    render() {
        const {
            text,
            icon,
            execute,
            backgroundColor,
            textColor,
            borderColor,
            style
        } = this.props;

        return (
            <TouchableOpacity
                style={[styles.container, {
                    backgroundColor,
                    borderColor,
                }, style]}
                onPress={execute}
            >
                <View style={styles.iconContainer}>
                    <Icon
                        name={icon}
                        color={textColor}
                        size={20}
                    />
                </View>

                <View style={styles.textContainer} >
                    <Text
                        style={[styles.text, {
                            color: textColor
                        }]}
                    >
                        {text}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        width: width * .6,
        height: 60,
        borderRadius: 20,
        borderWidth: .5,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        marginTop: 60,
        alignSelf: 'center'
    },

    iconContainer: {
        flex: 0.2,
        alignItems: 'center',
        padding: 5
    },

    text: {
        fontSize: 20,
        textAlign: 'center',
        paddingHorizontal: 5
    },

    textContainer: {
        flex: 0.8,
    }
});