import React, { PropTypes } from 'react';

import { CARDTYPES } from './payMethodConstants.js';

const { bool, string, number, shape, arrayOf } = PropTypes;

export const addressType = React.PropTypes.shape({
  firstName: string,
  lastName: string,
  email: string,
  nickName: string,
  phone: string,
  state: string,
  city: string,
  zipcode: string,
  address: string,
  landmark: string
});

export const breadCrumbTrail = React.PropTypes.arrayOf(
  React.PropTypes.shape({
    label: React.PropTypes.string.isRequired
  }));


export const product = React.PropTypes.shape({
  name: React.PropTypes.string,
  partNumber: React.PropTypes.string,
  displayPrice: React.PropTypes.number,
  offerPrice: React.PropTypes.number,
  size: string,
  imageUrlFragments: React.PropTypes.shape({
    huge: React.PropTypes.string.isRequired,
    large: React.PropTypes.string.isRequired,
    medium: React.PropTypes.string.isRequired,
    small: React.PropTypes.string.isRequired
  })
});


export const productArray = React.PropTypes.arrayOf(product);


export const story = React.PropTypes.shape({
  title: React.PropTypes.string.isRequired,
  id: React.PropTypes.string.isRequired,
  publishDate: React.PropTypes.string.isRequired
});

export const storyArray = React.PropTypes.arrayOf(story);


export const quickSearchSuggestion = React.PropTypes.shape({
  name: React.PropTypes.string.isRequired,
  link: React.PropTypes.string.isRequired,
  key: React.PropTypes.string.isRequired,
  count: React.PropTypes.string
});


export const cart = shape({
  price: number.isRequired,
  count: number.isRequired,
  items: arrayOf(shape({
    outOfStock: bool.isRequired,
    productId: string.isRequired,
    quantity: number.isRequired
  }))
});


export const quickSearchSuggestionArray = React.PropTypes.arrayOf(quickSearchSuggestion);

export const payCardTypes = CARDTYPES;
