import { atom } from 'recoil';

export const themeState = atom({
  key: 'themeState',
  default: true // false -> light mode, true -> dark mode
});

export const isLoggedIn = atom({
  key: 'isLoggedIn',
  default: false
})

export const token = atom({
  key: 'token',
  default: ""
})