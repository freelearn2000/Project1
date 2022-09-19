import { createContext } from "react";

// Rakhi
export const CounterContext = createContext(0);

// Rakhi
export const UserContext = createContext({name:'Guest', viewMode:'Guest'});

// Divya & Vishnupriya
export const User = createContext({name:'Guest', userRole:'Guest'});

// Vishnupriya
export const Pcontext = createContext('');

// Samara
export const ContextWeather = createContext('');

export const ContextRain = createContext( {place: 'Canada', weather: 'Rainy'} );

// Radhika
export const MyMusic = createContext('');
export const Musictype = createContext( {type: 'Classical',content: 'Music'} );

// Santhosh 
export const LoginContext = createContext({name:'', type:''});
export const UContext = createContext({name:'Arun', type:'Admin'});

// Bindu
export const  SportsContext = createContext('');

// Parvathy
export const PetsWorldContext = createContext('1');

// Dhanya
export const ContextTravel = createContext('Ruveneimi');

// Manooja
export const YogaContext = createContext({instructor:'', type:''});
export const CContext = createContext({instructor:'Abhijith', type:'Yin Yoga'});

//Viji
export const ColorContext = createContext({color:'', type:''});
export const ColContext = createContext({color:'Blue', type:'VIBYOR'});


export const NewContext = createContext('User');

export const NewTheme = createContext('Dark theme');
