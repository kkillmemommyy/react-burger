import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    type: 'bun',
    name: 'Краторная булка N-200i',
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  },
  {
    _id: '643d69a5c3f7b9001cfa093c',
    type: 'bun',
    name: 'Краторная булка N-200i',
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  },
  {
    _id: '643d69a5c3f7b9001cfa0944',
    name: 'Соус традиционный галактический',
    type: 'sauce',
    price: 15,
    image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
  },
  {
    _id: '643d69a5c3f7b9001cfa093f',
    name: 'Мясо бессмертных моллюсков Protostomia',
    type: 'main',
    price: 1337,
    image: 'https://code.s3.yandex.net/react/code/meat-02.png',
  },
  {
    _id: '643d69a5c3f7b9001cfa0947',
    name: 'Плоды Фалленианского дерева',
    type: 'main',
    price: 874,
    image: 'https://code.s3.yandex.net/react/code/sp_1.png',
  },
  {
    _id: '643d69a5c3f7b9001cfa0946',
    name: 'Хрустящие минеральные кольца',
    type: 'main',
    price: 300,
    image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
  },
  {
    _id: '643d69a5c3f7b9001cfa0946',
    name: 'Хрустящие минеральные кольца',
    type: 'main',
    price: 300,
    image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
  },
  {
    _id: '643d69a5c3f7b9001cfa093f',
    name: 'Мясо бессмертных моллюсков Protostomia',
    type: 'main',
    price: 1337,
    image: 'https://code.s3.yandex.net/react/code/meat-02.png',
  },
];

const selectedIngredientsSlice = createSlice({
  name: 'selectedIngredients',
  initialState,
  reducers: {},
});

export const selectedIngredientsReducer = selectedIngredientsSlice.reducer;
