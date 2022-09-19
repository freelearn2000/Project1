import { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { HomePage } from './pages/Home/Home';
import NewsPage from './pages/NewsPage/NewsPage1';
import About from './pages/About/About';
import Anusree from './pages/Anusree/Anusree';
import { ContextSample } from './pages/Anusree/Context';
import TravellBlog from './pages/Anusree/TravellBlog';
import SubPage from './pages/Anusree/SubPage';
import FoodBlog from './pages/Anusree/FoodBlog';
import { UseRefExample, CreateRefExample } from './pages/Anusree/RefExample';
import Rakhi from './pages/Rakhi/Rakhi';
import RouteData from './pages/Rakhi/RouteData';
import { HomePage as IndexPage  } from './pages/Rakhi/HomePage';
import ScienceBlog from './pages/Rakhi/ScienceBlog';
import { Technology } from './pages/Rakhi/TechnologyBlog';
import { Contents } from './pages/Rakhi/Contents';
import science from './pages/Rakhi/Resources/news.jpg';
import technology from './pages/Rakhi/Resources/tech.jpg';
import { Context } from './pages/Rakhi/CounterContext';
import { Refs } from './pages/Rakhi/Refs';
import { Samara } from './pages/Samara/Samara';
import { Parvathy } from './pages/Parvathy/Parvathy';
import PetsContext from './pages/Parvathy/PetsContext';
import { Books } from './pages/Parvathy/Books';
import { Axiosclasz } from './pages/Parvathy/Books';
import { AxiosFns } from './pages/Parvathy/Books';
import MyHome from './pages/Parvathy/Home';
import Routingz from './pages/Parvathy/Routing';
import { RefSample1 } from './pages/Parvathy/UseRef1';
import Vishnupriya from './pages/Vishnupriya/Vishnupriya';
import { Axiosp } from './pages/Vishnupriya/Axiosp';
import ShoppingCart from './pages/Vishnupriya/ShoppingCart';
import Electronics from './pages/Vishnupriya/Electronics';
import { Mobiles } from './pages/Vishnupriya/Mobiles';
import { Laptops } from './pages/Vishnupriya/Laptops';
import { Contextz } from './pages/Vishnupriya/Contextz';
import { Refz } from './pages/Vishnupriya/Ref';
import Divya from './pages/Divya/Divya';
import  AxiosD  from './pages/Divya/Axiosdiv';
import Product from './pages/Divya/Products';
import { Grocery } from './pages/Divya/Grocery';
import { Skincare } from './pages/Divya/Skincare';
import { ContextDiv } from './pages/Divya/UserContext';
import { RefDiv } from './pages/Divya/Ref';
import Aiswarya from './pages/Aiswarya/Aiswarya';
import Viji from './pages/Viji/Viji';
import { Gismapping } from './pages/Viji/Gismapping';
import { Country } from './pages/Viji/Country';
import State from './pages/Viji/State';
import { Kollam } from './pages/Viji/Kollam';
import { RefeSample } from './pages/Viji/MyRefExample';
import Manooja from './pages/Manooja/Manooja';
import { Dhanya1 } from './pages/Dhanya/Dhanya1';
import { FoodBlog as Food } from './pages/Dhanya/FoodBlog';
import { TravelBlog as Travel } from './pages/Dhanya/TravelBlog';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import  Bindu  from './pages/Bindu/Bindu';
import  Rootingb from './pages/Bindu/Rootingb';
import { Nature } from './pages/Bindu/Nature';
import { Prakarthi } from './pages/Bindu/Prakarthi';
import  Bhome   from './pages/Bindu/Bhome';
import {AxiosExample  } from './pages/Bindu/AxiosExample';
import { Sports } from './pages/Bindu/Sports';
import { RefExample1 } from './pages/Bindu/RefExample1';
import Routing from './pages/Samara/Routing';
import { AxiosSample } from './pages/Samara/AxiosSample';
import { AxiosSample1 } from './pages/Samara/AxiosSample';
import { AxiosSample2 } from './pages/Samara/AxiosSample';
import SamaraHome from './pages/Samara/SamaraHome';
import { WeatherContext } from './pages/Samara/WeatherContext';
import { RefSample } from './pages/Samara/RefSample';
import  Mhome from './pages/Manooja/Mhome';
import { Axios1 } from './pages/Manooja/Axios1';
import { ContextYoga } from './pages/Manooja/ContextYoga';
import { ContextColor } from './pages/Viji/ContextColor';
import { ExampleRef } from './pages/Manooja/RefUseExample1';
import Routing1 from './pages/Manooja/Routing1';
import Santhosh from './pages/Santhosh/Santhosh';
import { Ref } from './pages/Santhosh/Ref';
import { Axios } from './pages/Santhosh/Axios';
import Home from './pages/Santhosh/Home';
import Routings from './pages/Santhosh/Routings';
import { Users } from './pages/Santhosh/Users';
import { Posts } from './pages/Santhosh/Posts';
import { Context as Context1} from './pages/Santhosh/Context';
import Radhika from './pages/Radhika/Radhika';
import  Entertainment  from './pages/Radhika/Entertainment';
import { Axiosrr } from './pages/Radhika/Axiosrr';
import { MusicContext } from './pages/Radhika/MusicContext';
import { SearchRef } from './pages/Radhika/Reff';
import  Routingg  from './pages/Radhika/Routingg';
import { Art } from './pages/Radhika/Art';
import { Dance } from './pages/Radhika/Dance';
import { Politics } from './pages/Aiswarya/Politics';
import { Arts } from './pages/Aiswarya/Arts';
import { Homepages } from './pages/Aiswarya/Homepages';
import { Contextpage } from './pages/Aiswarya/Contextpage';
import { Createref} from './pages/Aiswarya/Createref';


class App extends Component {
  
  render( ) {

    // map routes to resources
    let routes = (
      <Routes>
        <Route path="/" element={ <HomePage/> }/>
        <Route path="/news" element={ <NewsPage/> }>
           <Route path=":id" element={ <NewsPage/> }/>
        </Route>
        <Route path="/about" element={ <About/> }>
            <Route path=":contact" element={ <About/> }>
              <Route path=":email" element={ <About/> }/>
            </Route>
        </Route>
        <Route path="/anusree"  element={ <Anusree title="Anusree's Component"/> } >
          <Route path=":travel" element={ <TravellBlog title="Travel Blog"/> }>
            <Route path="paris" element={ <SubPage title="Paris"/> }/>
          </Route>
          <Route path="foodblog" element={ <FoodBlog title="Food Blog"/> }>
            <Route path="pizza" element={ <SubPage title="Pizza"/> }/>
          </Route>
          <Route path="context" element={ <ContextSample title="Context Example"/> }/>
          <Route path="useref" element={ <UseRefExample/> }/>
          <Route path="createref" element={ <CreateRefExample/> }/>
        </Route>
        <Route path="/santhosh" element={ <Santhosh title="This is Santhosh's Component"/> }>          
          <Route index element={ <Home/> }/>
          <Route path="home" element={ <Home/> }/>         
          <Route path="axios" element={ <Axios/> }/>
          <Route path="context" element={ <Context1/> } />
          <Route path="ref" element={ <Ref/> } />      
          <Route path="users" element={ <Users title="Class Component"/> }/>   
          <Route path="posts" element={ <Posts title="Functional Component"/> }/>
          <Route path="routings" element={ <Routings/> }/>
        </Route>
        <Route path="/rakhi" element={ <Rakhi title="Rakhi's Component"/> }>
          <Route path=":id" element={ <RouteData title="Rakhi's Component"/> }/>
          <Route index element={ <IndexPage title="The value of an idea lies in the using of it!"/> }/>
          <Route path="science" element={ <ScienceBlog title="Science Blog"/> }>
            <Route path="top" element={<Contents title='Physics-based cryptocurrency transmits energy through blockchain' content='Researchers from Lawrence Livermore National Laboratory (LLNL) have devised a physics-based cryptocurrency that links electrical energy and blockchain technologies in a new way.' image={science}/> }/>
          </Route>
          <Route path="technology" element={ <Technology title="Information Technology"/> }>
            <Route path="trending" element={<Contents title='So long, Internet Explorer. The browser retires today' content='The browser retires today. Internet Explorer is finally headed out to pasture.' image={technology}/> }/>
          </Route>
          <Route path="context" element={ <Context/> }></Route>
          <Route path="refs" element={ <Refs/> }></Route>
        </Route>
         <Route path="/bindu" element={ <Bindu title="This is Bindu's Component"/> }>
         <Route index element={ <Bhome title="Welcome"/> }/>
         <Route path="bhome" element={ <Bhome title="Welcome"/> }/>
         <Route path="api" element={ <AxiosExample /> }/>
         <Route path="sports" element={ <Sports title="Sports"/> }/>
         <Route path="Ref" element={ <RefExample1 /> }/>
         <Route path="rootingb" element={ <Rootingb /> }>  
            <Route path="nature" element={ <Nature title=" Class Components" /> } />
            <Route path="prakarthi" element={ <Prakarthi/> } />   
            </Route>     
         </Route>
        <Route path="/radhika" element={ <Radhika title="This is Radhika's Component"/> }>
          <Route index element={ <Entertainment title="Welcome"/> } />
          <Route path="axiosrr" element={ <Axiosrr /> } />
          <Route path="musiccontext" element={ <MusicContext /> } />
          <Route path="searchref" element={ <SearchRef /> } />
          <Route path="routingg" element={ <Routingg /> } >
            <Route path="art" element={ <Art title=" Class Components" /> } />
            <Route path="dance" element={ <Dance title="Functional Components"/> } />
          </Route>
        </Route>
        <Route path="/samara" element={ <Samara title="Welcome to Samara's Component"/> }>
          <Route index element={ <SamaraHome title="Welcome to our Weather Calculator"/> }/>
          <Route path="routing" element={ <Routing/> }>
            <Route path="class" element={ <AxiosSample1 title="Class Component"/> }/>
            <Route path="functional" element={ <AxiosSample2 title="Functional Component"/> }/>
          </Route>
          <Route path="axios" element={ <AxiosSample/> }/>
          <Route path="context" element={ <WeatherContext/> } />
          <Route path="ref" element={ <RefSample/> }/>
          <Route path=":id" element={ <SamaraHome title="Welcome to our Weather Calculator"/> }/>
        </Route>
        <Route path="/parvathy" element={ <Parvathy title="This is Parvathy's Component"/> }>
          <Route index element={ <MyHome /> }/>
          <Route path="home" element={ <MyHome /> }/>
          <Route path="routing" element={ <Routingz/> }>
            <Route path="class" element={ <Axiosclasz title="Class Component"/> }/>
            <Route path="functional" element={ <AxiosFns title="Functional Component" /> }/>
          </Route>
          <Route path="books" element={ <Books /> }/>
          <Route path="petscontext" element={ <PetsContext/> }/>
          <Route path="ref" element={ <RefSample1/> }/>
          <Route path=":id" element={ <Parvathy title="This is Parvathy's Component"  /> }/>
        </Route>
        <Route path="/vishnupriya" element={ <Vishnupriya title="This is Vishnupriya's Component"/>}>
          <Route index element={ <ShoppingCart /> }/>
          <Route path="shoppingcart" element={ <ShoppingCart/> }/>
          <Route path="axiosp" element={ <Axiosp/> }/>
          <Route path="electronics" element={ <Electronics title="Electronics"/> }>
            <Route path="mobiles" element={ <Mobiles title="Class Component"/> }/>
            <Route path="laptops" element={ <Laptops title="Functional Component"/> }/>
          </Route>
          <Route path="contextz" element={ <Contextz/> }></Route>
          <Route path="refz" element={ <Refz/> }></Route>
        </Route>
        <Route path="/divya" element={ <Divya title="This is Divya's Component"/> }>
        <Route index element={ <Product title="Product"/> }/>
          <Route path="product" element={ <Product title="Product"/> }>
            <Route path="grocery" element={ <Grocery/> }/>
            <Route path="skincare" element={ <Skincare/> }/>
          </Route>
          <Route path=":id" element={ <Divya title="This is Divya's Component"/> }/>
          <Route path="axiosdiv" element={ <AxiosD/> }></Route>
          <Route path="context" element={ <ContextDiv/> }></Route>
          <Route path="ref" element={ <RefDiv/>}></Route>
        </Route>
        <Route path="/aiswarya" element={ <Aiswarya title="Aiswarya's Component"/> }>
        <Route index element={ <Homepages/> }/>
          <Route path="politics" element={ <Politics title="Axios: Class Component" /> }/>
          <Route path="Arts" element={ <Arts title="Axios: Functional Component" /> }/>
          <Route path="context" element={ <Contextpage title="Context"/> }/>
          <Route path="createref" element={ <Createref/> }></Route>
         
          <Route path=":id" element={ <Aiswarya title="Aiswarya's Component"/> }/>
        </Route>
        <Route path="/viji" element={ <Viji title="This is Viji's Component"/> }>
        <Route index element={ <Gismapping title="map-display"/> }/>
         <Route path="gis" element={ <Gismapping title="map-display"/> }/>
         <Route path="country" element={ <Country/> }/>
         <Route path="state" element={ <State title="Kerala"/> }></Route>
         <Route path="kollam" element={ <Kollam title="Class Component"/> }/>
          <Route path="contextcolor" element={ <ContextColor/> }/>
          <Route path="MyRefExample" element={ <RefeSample/> }/>
          <Route path=":id" element={ <Viji title="This is Viji's Component"/> }/>
        </Route>
        <Route path="/manooja" element={ <Manooja title="This is Manooja's Component"/> }>
          <Route index element={ <Mhome title="Welcome"/> }/>
          <Route path="contextyoga" element={ <ContextYoga/> }/>
          <Route path="axios1" element={ <Axios1/> } />
          <Route path="ref" element={ <ExampleRef/> }/>
          <Route path=":id" element={ <Routing1 /> }/> 
         </Route>  
        <Route path="/dhanya" element={ <Dhanya1 title="This is Dhanya's Component"/> }>
          {/* <Route path=":id" element={ <Dhanya title="This is Dhanya's Component"/> }/> */}
          <Route path="food" element={ <Food /> } />
          <Route path="travel" element={ <Travel /> } />
        </Route>
        <Route path="*" element={ <ErrorPage ErrorCode="404" ErrorMsg="The page requested was not found"/> }/>
      </Routes>
    );
    
    return (
      <div className="ui segments">
        <div className="ui segment">
            <Header title='React Application'/>
        </div>
          <div className="ui raised very padded text container segments">
            <div className="ui segment">
              { routes }
            </div>
          </div>
          <div className="ui segment">
            <Footer content="@2022"/>
          </div>
      </div>
    );
  }
}

export default App;

