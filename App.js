import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  ToastAndroid,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import {db} from './firebase';

export default class App extends Component {
  listRef = React.createRef();
  state = {
    tasks: [],
    text: '',
  };

  componentDidMount() {
    db.on('value', snapshot => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          text: items[item].text,
        });
      }
      this.setState({tasks: newState});
    });
  }

  changeTextHandler = text => {
    this.setState({text: text});
  };

  addTask = () => {
    let notEmpty = this.state.text.trim().length > 0;
    if (notEmpty) {
      db.push({text: this.state.text}, () => {
        this.listRef.current?.scrollToEnd({animating: false});
        this.setState({text: ''});
      });
    }
  };

  deleteTask = i => {
    db.child(i).remove(() => {
      ToastAndroid.show('Task Removed Successfully!', 200);
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#4BB4C9" />
        <View style={styles.header}>
          <Text style={styles.headerText}>Todo App</Text>
        </View>
        <FlatList
          style={styles.list}
          ref={this.listRef}
          data={this.state.tasks}
          renderItem={({item}) => (
            <View>
              <View style={styles.listItemCont}>
                <Text style={styles.listItem}>{item.text}</Text>
                <TouchableOpacity
                  hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                  style={styles.button}
                  onPress={() => this.deleteTask(item.id)}>
                  <Text>X</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={this.changeTextHandler}
          onSubmitEditing={this.addTask}
          value={this.state.text}
          placeholder="Add Tasks"
          returnKeyType="done"
          returnKeyLabel="done"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECEBF2',
  },
  header: {
    backgroundColor: '#4BB4C9',
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  list: {
    width: '100%',
    paddingTop: 5,
    paddingHorizontal: 5,
    marginBottom: 5,
  },
  listItem: {
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 18,
  },
  listItemCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    marginVertical: 5,
  },
  button: {
    marginRight: 10,
  },
  textInput: {
    height: 60,
    marginRight: 10,
    marginLeft: 10,
    paddingRight: 10,
    paddingLeft: 10,
    backgroundColor: '#fff',
    width: '100%',
  },
});
