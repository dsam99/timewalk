import React from 'react';
import {
    View,
    ScrollView,
    StyleSheet
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import customData from '../../data/example.json';

export default class SideScroller extends React.Component {
    state = {
        data: null
    };

    renderItem(item) {
        console.log(item);
    }

    async componentWillMount() {
        // console.log(customData);
        this.setState({
            data: customData
        }, () => {
            // console.log(this.state.data);
        });
    }

    render() {
        return (
            <View>
                <FlatList
                    style={styles.list}
                    horizontal={true}
                    data={this.state.data["1"].locations}
                    renderItem={item => this.renderItem(item)}
                    keyExtractor={item => item.locationId}
                >

                </FlatList>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1
    }
});