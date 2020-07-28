import React from 'react';
import {StyleSheet, FlatList, View, Text} from 'react-native';
import ListItem from './ListItem';

const colors = {
  lightGray: 'rgba(237, 237, 237, 1)',
};

export default ({data = [], title, containerStyle}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <ListItem
            itemTitle={`Reaching your nearest bus stop in ${Math.ceil(
              item.estimation.time,
            )} ${item.estimation.unit}`}
            itemSubTitle={`${item.route.price} ${item.route.currency}`}
            headerLeft={item.route.code}
            headerRight={item.route.name}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: 1.5,
    backgroundColor: colors.lightGray,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});