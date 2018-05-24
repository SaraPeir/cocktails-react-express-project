import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import logo from './logo.svg'
import './App.css'
import store from './store'
import Customers from './components/Customer/customers';
import Footer from './components/Footer/footer';
import Hero from './components/Hero/hero';
import Alcolic from './components/Alcolic/alcolic';
//import Analcolic from './components/Analcolic/analcolic';


//import Alcolic from './components/alcolic';
import Analcolic from './components/analcolic';

class App extends Component {
  constructor(props) {
  super(props);
  this.state = {
  data: [],

  idGin: [],
  idVodka: [],

  ginDrinksDetails: [],
  vodkaDrinksDetails: [],

  ginFilteredArray: [],
  vodkaFilteredArray: [],
  rhumFilteredArray: [],

  ginSelectValue: 'Gin cocktails',
  vodkaSelectValue: 'Vodka cocktails',
  rhumSelectValue: 'Rhum cocktails',

  gHidden: 'hidden',
  ginDrinkName: '',

  vHidden: 'hidden',
  vodkaDrinkName: '',

  rHidden: 'hidden',
  rhumDrinkName: ''
  }
  this.requestInfoGinDrinks = this.requestInfoGinDrinks.bind(this);
  this.requestInfoVodkaDrinks = this.requestInfoVodkaDrinks.bind(this);

  this.resetGinSelect = this.resetGinSelect.bind(this);
  this.resetVodkaSelect = this.resetVodkaSelect.bind(this);
  this.resetRhumSelect = this.resetRhumSelect.bind(this);

  this.changeGinSelectValue = this.changeGinSelectValue.bind(this);
  this.changeVodkaSelectValue = this.changeVodkaSelectValue.bind(this);
  this.changeRhumSelectValue = this.changeRhumSelectValue.bind(this);
  }



requestInfoGinDrinks(){
  const idGin = this.state.idGin;

  if(idGin !== undefined && idGin.length > 0) {
    var fetchsArray = [];
    for(let i= 0; i < idGin.length; i++){
      fetchsArray.push(fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idGin[i]}`)
                        .then(response => response.json()));
    }

    Promise.all(fetchsArray)
    .then(data => {
      var ginDrinksDetailsArray= this.state.ginDrinksDetails;
      ginDrinksDetailsArray.push(data);
      this.setState({
        ginDrinksDetails : ginDrinksDetailsArray
      });
    });
  } else {
    this.setState({
      ginDrinksDetails : []
    });
  }
}


requestInfoVodkaDrinks(){
  const idVodka = this.state.idVodka;

  if(idVodka !== undefined && idVodka.length > 0) {
    var fetchsArray = [];
    for(let i= 0; i < idVodka.length; i++){
      fetchsArray.push(fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idVodka[i]}`)
                        .then(response => response.json()));
    }

    Promise.all(fetchsArray)
    .then(data => {
      var vodkaDrinksDetailsArray= this.state.vodkaDrinksDetails;
      vodkaDrinksDetailsArray.push(data);
      this.setState({
        vodkaDrinksDetails : vodkaDrinksDetailsArray
      });
    });
  } else {
    this.setState({
      vodkaDrinksDetails : []
    });
  }
}

    requestInfo() {
      var apiAlcoholicCocktails =  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic`).then(response => response.json());
      var apiGinCocktails =  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin`).then(response => response.json());
      var apiVodkaCocktails =  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka`).then(response => response.json());
      var apiRhumCocktails =  fetch('/api/rhum').then(response => response.json());
      var apiNotAlcoholicCocktails = fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`).then(response => response.json());
      var combinedData = [apiAlcoholicCocktails, apiGinCocktails, apiVodkaCocktails, apiRhumCocktails, apiNotAlcoholicCocktails];
      Promise.all(combinedData).then(c => {
      let allCocktailsData = this.state.data;
      allCocktailsData.push(c);
      this.setState({
        data:allCocktailsData,
        idGin:allCocktailsData[0][1].drinks.map( (g, index) => g.idDrink),
        idVodka:allCocktailsData[0][2].drinks.map( (v, index) => v.idDrink)
     });
        this.requestInfoGinDrinks();
        this.requestInfoVodkaDrinks();
    })
    }

    resetGinSelect(event){
      this.setState({
      ginSelectValue: 'Gin cocktails',
      gHidden: 'hidden'
      });
    }

      resetVodkaSelect(event){
        this.setState({
        vodkaSelectValue: 'Vodka cocktails',
        vHidden: 'hidden'
        });
      }

      resetRhumSelect(event){
        this.setState({
        rhumSelectValue: 'Rhum cocktails',
        rHidden: 'hidden'
        });
      }

    changeGinSelectValue(event){
      this.setState({
      ginSelectValue: event.target.value
      });
      this.resetVodkaSelect();
      this.resetRhumSelect();

      const ginDrinksDetails = this.state.ginDrinksDetails;
      let selectedDrink = event.target.value;

      if(ginDrinksDetails !== undefined && ginDrinksDetails.length > 0 && selectedDrink !== 'Gin cocktails'){
          let filtered =ginDrinksDetails[0].filter(function(ginDrink, index) {
            return ginDrink.drinks[0].strDrink === selectedDrink;});
                this.setState({
                  ginFilteredArray:filtered,
                  gHidden: '',
                  ginDrinkName: selectedDrink
                });

          } else if(selectedDrink == 'Gin cocktails'){
            this.setState({
              ginFilteredArray:[],
              gHidden: 'hidden'
            });
          }
      }

      changeVodkaSelectValue(event){
        this.setState({
        vodkaSelectValue: event.target.value
        });
        this.resetGinSelect();
        this.resetRhumSelect();

        const vodkaDrinksDetails = this.state.vodkaDrinksDetails;
        let selectedDrink = event.target.value;

        if(vodkaDrinksDetails !== undefined && vodkaDrinksDetails.length > 0 && selectedDrink !== 'Vodka cocktails'){
            let filtered =vodkaDrinksDetails[0].filter(function(vodkaDrink, index) {
              return vodkaDrink.drinks[0].strDrink === selectedDrink;});
                  this.setState({
                    vodkaFilteredArray:filtered,
                    vHidden: '',
                    vodkaDrinkName: selectedDrink
                  });

            } else if(selectedDrink == 'Vodka cocktails'){
              this.setState({
                vodkaFilteredArray:[],
                vHidden: 'hidden'
              });
            }
        }


    changeRhumSelectValue(event){
      this.setState({
      rhumSelectValue: event.target.value
      });
    this.resetGinSelect();
    this.resetVodkaSelect();


    const rhumDrinksDetails = this.state.data;
    let selectedDrink = event.target.value;

    if(rhumDrinksDetails !== undefined && rhumDrinksDetails.length > 0 && selectedDrink !== 'Rhum cocktails'){
        let filtered =rhumDrinksDetails[0][3].filter(function(rhumDrink, index) {
          return rhumDrink.name === 'WIKI WIKI';});
              this.setState({
                rhumFilteredArray:filtered,
                rHidden: '',
                rhumDrinkName: selectedDrink
              });

        } else if(selectedDrink == 'Rhum cocktails'){
          this.setState({
            rhumFilteredArray:[],
            rHidden: 'hidden'
          });
        }
    }



    componentDidMount(){
    this.requestInfo();
    }

    render () {
      return (
        <div className="app">
        <Switch>
        <Route exact path='/' component={ Hero } />
        <Route path='/alcolic' render={(props) => <Alcolic {...props} array={this.state.data} gSelectValue={this.state.ginSelectValue} onChangeGinSelectValue= {this.changeGinSelectValue} vSelectValue={this.state.vodkaSelectValue} onChangeVodkaSelectValue={this.changeVodkaSelectValue} rSelectValue={this.state.rhumSelectValue} onChangeRhumSelectValue={this.changeRhumSelectValue} gDisplNone = {this.state.gHidden} ginDrinkName={this.state.ginDrinkName}
        vDisplNone = {this.state.vHidden} vodkaDrinkName={this.state.vodkaDrinkName}
        rDisplNone = {this.state.rHidden} rhumDrinkName={this.state.rhumDrinkName}
         />}/>
        <Route path='/analcolic' component={ Analcolic } />
        </Switch>
        </div>
      );
  }
  }


  export default App

  // <Route exact path='/' render={(props) => <Alcolic {...props} array={this.state.data}/>}/>
  // <Route path='/analcolic' render={(props) => <Analcolic {...props} array={this.state.data}/>}/>
  // <Route exact path='/' component={ Alcolic } />
  // <Route path='/analcolic' component={ Analcolic } />
