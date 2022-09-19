import { createContext } from 'react';


// Create Context object
export const MyContext = createContext(``);
MyContext.displayName = 'MyContextName';
export const MyThemeContext = createContext(`dark`);
