import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, FlatList } from "react-native";
import { connect } from "react-redux";
import { getFilter } from "../store/action";
import Card from "../components/Card";
import { NavigationEvents } from "react-navigation";
import * as Animatable from 'react-native-animatable';

const Filter = props => {
  const [list, setList] = useState([]);

  useEffect(() => {
    let search = props.navigation.getParam("search");
    let data;
    let result = [];
    if (props.navigation.routeName === "FilterMyProduct") {
      data = props.myProducts.data;
    } else {
      data = props.allProducts.data;
    }
    if (data.length >= 1) {
      data.forEach((d, i) => {
        if (
          String(d.title)
            .toLowerCase()
            .indexOf(String(search).toLowerCase()) !== -1
        ) {
          if (result.length == 0) {
            result.push(d);
          } else {
            let exist = false;
            result.forEach(r => {
              if (r._id === d._id) {
                exist = true;
              }
            });
            if (!exist) {
              result.push(d);
            }
          }
        }
        if (
          String(d.details)
            .toLowerCase()
            .indexOf(String(search).toLowerCase()) !== -1
        ) {
          if (result.length == 0) {
            result.push(d);
          } else {
            let exist = false;
            result.forEach(r => {
              if (r._id === d._id) {
                exist = true;
              }
            });
            if (!exist) {
              result.push(d);
            }
          }
        }
      });
    }
    setList(result);
  }, []);

  return (
    <ScrollView>
      <>
        {list.length >= 1 &&
          list.map(product => (
            <Card
              key={product._id}
              product={product}
              navigation={props.navigation}
            />
          ))}
      </>
    </ScrollView>
  );
};

const mapStateToProps = state => ({
  myProducts: state.myProducts,
  allProducts: state.allProducts
});

export default connect(
  mapStateToProps,
  null
)(Filter);
