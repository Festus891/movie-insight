import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import SimpleBottomNavigation from "./components/MainNav";
import Movies from "./Pages/Movies/Movies";
import Series from "./Pages/Series/Series";
import Trending from "./Pages/Trending/Trending";
import Search from "./Pages/Search/Search";
// import { Container } from "@material-ui/core";
import Home from "./Pages/Home/Home";
import Footer from "./components/Header/Footer";
import MovieDetail from "./Pages/Home/MovieDetail";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <div className="container">
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/trending" component={Trending} />
            <Route path="/movies" component={Movies} />
            <Route path="/series" component={Series} />
            <Route path="/search" component={Search} />
            <Route path="/:media_type/:id" component={MovieDetail} />
          </Switch>
        </div>
      </div>
      <Footer />
      <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

export default App;
