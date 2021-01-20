/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';
import { Text } from '@/_components/text';
import { FontSizeType, FontColorType, TagType } from '../_types';

const colors: { [key: string]: FontColorType } = {
  black: 'black',
  blue: 'blue',
  darkPurple: 'darkPurple',
  grey: 'grey',
  lightBlue: 'lightBlue',
  lightGrey: 'lightGrey',
  lightRed: 'lightRed',
  lightYellow: 'lightYellow',
  orange: 'orange',
  paleBlue: 'paleBlue',
  pink: 'pink',
  purple: 'purple',
  red: 'red',
  richGrey: 'richGrey',
  successTextColor: 'successTextColor',
  superDuperLightGrey: 'superDuperLightGrey',
  superDuperLightPurple: 'superDuperLightPurple',
  white: 'white',
  yellow: 'yellow',
};

const sizes: { [key: string]: FontSizeType } = {
  h0: 'h0',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
};

const tagTypes: { [key: string]: TagType } = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
};

storiesOf('Text', module)
  .addParameters({
    component: Text,
    componentSubtitle:
      'Компонент для отображения вариантов заголовков (цвет, шрифт, размер)',
  })
  .add('Text', () => (
    <Text
      color={select('color', colors, colors.successTextColor)}
      isEllipsis={boolean('isEllipsis', false)}
      isUpperCase={boolean('isUpperCase', false)}
      size={select('size', sizes, sizes.h0)}
      tagType={
        boolean('choose span', false)
          ? undefined
          : select('tagType', tagTypes, tagTypes.h1)
      }
      text="Text for size & color"
    />
  ));
