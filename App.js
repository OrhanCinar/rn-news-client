import React from "react";
import { StyleSheet, Text, View, FlatList, Card, WebView } from "react-native";
import * as rssParser from "react-native-rss-parser";
import HTML from "react-native-render-html";
const RSS_URL = "https://news.google.com/rss?hl=fr&gl=FR&ceid=FR:fr";

export default class App extends React.Component {
  state = {
    feed: []
  };

  async getRSS() {
    fetch(RSS_URL)
      .then(response => response.text())
      .then(responseData => rssParser.parse(responseData))
      .then(rss => {
        //console.log(rss.items.length);

        // for (let i = 0; i < 1; i++) {
        //   console.log(rss.items[0]);
        // }

        rss.items.forEach(element => {
          var item = {
            key: element.id,
            title: element.title,
            link: element.links[0].url,
            date: element.published,
            description: element.description,
            source: element.source,
            image: element.image
          };
          this.setState(prevState => ({
            feed: [...prevState.feed, item]
          }));

          console.log(item);
        });
      });
  }

  componentDidMount() {
    //console.log("componentDidMount");
    this.getRSS();
    //console.log(this.state.feed.length);
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.feed}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <Text>{item.date}</Text>
              <Text>{item.title}</Text>
              <HTML html={item.description} />
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 5
    //flexGrow: 0
  },

  cardContainer: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    marginBottom: 25,
    flexBasis: "50%",
    // height: 50,
    fontSize: 18
  }
});
