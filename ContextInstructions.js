/*
    ***** REACT CONTEXT *****

    Prvo je potrebno na praviti folder pored components, koji ce se zvati contexts i u njemu kreirati fajl (svrha)Context.js.
    Ovaj fajl ce biti klasna komponenta. Importujemo sledecu liniju koda: 
        import React, { Component, createContext } from 'react';
    gde pored komponente uvozimo i createContext metodu koja kreira context.
    Ovu metodu pozivamo pre definisanja klase, tacnije exportujemo je ovako:
        export const (svrha)Context = createContext();
    Ovde smo pozvali funkciju createContext() i eksportovali je kroz konstantu (svrha)Context.

    Zatim kreiramo klasu i nju nazivamo (svrha)ContextProvider. Ova klasa ce imati svoj state u koji cemo smestiti sta god nam
    je potrebno za skladistenje. Nakon toga, u returnu kreiramo open/close tag koji ce predstavljati providera. 
        <(svrha)Context.Provider></(svrha)Context.Provider>
    Kada god kreiramo kontekst kroz createContext() i kada ga god pozovemo kroz konstantu, dodacemo .Provider u tag, i taj tag
    ce predstavljati wrapper razlicitim komponentama i podaci iz ovog fajla mogu biti upotrebljeni u tim komponentama.
    
    <(svrha)Context.Provider> tag ce imati jedan atribut - value. U njemu definisemo ono sto zelimo da se koristi u drugim komponentama.
    Najcesce je to state, odnosno objekat, tako da cemo pisati ovako:
        <(svrha)Context.Provider value={{...this.state}}>
    Posto smo rekli da je <(svrha)Context.Provider></(svrha)Context.Provider> zapravo wrapper drugim komponentama, izmedju tagova cemo
    napisati {this.props.children} i importovacemo ovu komponentu u App.js gde cemo je koristiti kao wrapper.
        import (svrha)ContextProvider from "./contexts/(svrha)Context";

    Sada zelimo da pristupimo podacima iz wrappera preko komponente unutar njega. Importovacemo konstantu iz (svrha)Context.js
    kao metodu 
        import { (svrha)Context } from './(svrha)Context';
    Sledeci korak jeste da nakon definisane klase unesemo sledeci kod
        static contextType = (svrha)Context; // moze da se koristi samo u klasnim komponentama!!!
    Sada jednostavnim pozivom console.log(this.context) mozemo da vidimo sta smo dobili i mozemo da koristimo state iz druge komponente
    tako sto cemo odraditi destrukciju sa const { } = this.context;

    Pored .Provider-a postoji i .Consumer. Consumer koristimo u funkcionalnim komponentama umesto static contextType.
    Princip implementacije je sledeci:
        import React from 'react';
        import { (svrha)Context } from './(svrha)Context';
        
        const MyApp = () => {
            return(
                <(svrha)Context.Consumer>{(themeContext) => {
                    const { } = themeContext;
                    return(
                        <div></div>
                    )
                }}
                </(svrha)Context.Consumer
            )
        }

    Nacin na koji mozemo da menjamo state u (svrha)Context.js jeste da unutar njega kreiramo funkciju
    koja ce menjati state, a zatim je kao props, u vidu drugog parametra atributa value, proslediti dalje:
        changeState = () => {
            this.setState({state: change})
        }

        <(svrha)Context.Provider value={{...this.state, changeState: this.changeState}}>

    Ukoliko zelimo da koristimo 2 ili vise konteksta u nekoj komponenti, koristicemo .Consumer
    tako sto cemo uvesti i drugi kontekst  fajl i njime obmotati prvi. To ce izgledati ovako:
        import React from 'react';
        import { (svrha)Context } from './(svrha)Context';
        import { (svrha2)Context } from './(svrha2)Context';
        
        const MyApp = () => {
            return(
                <(svrha2)Context {authContext} => (
                    <(svrha)Context.Consumer>{(themeContext) => {
                    const { } = themeContext;
                    return(
                        <div></div>
                    )
                }}
                </(svrha2)Context>
                )
            )
        }

    Ukoliko zelimo da koristimo context unutar funkcionalne komponente kao hook, koristicemo 
    useContext hook uvezen iz react-a:
        import React, { useContext } from 'react';
    a zatim ga vrlo jednostavno primeniti u funkciji pre returna u destrukciji ovako:
        const {isLightTheme, light, dark} = useContext(ThemeContext); //kao props
    Moguce je koristiti vise useContext hookova u jednoj funkcionalnoj komponenti, jednan ispod
    drugog. U tom slucaju, wrapperi poput <(svrha)Context.Consumer></(svrha)Context.Consumer> 
    nisu potrebni.
*/
