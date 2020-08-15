import Home from "../components/screens/Home";
import Routes from '../components/screens/Routes';
import Report from '../components/screens/Report';

export default {
  Home: {
    screen: Home,
    navigationOptions: {
      headerShown: false
    }
  },
  Routes:{
    screen: Routes,
    navigationOptions: {
      headerShown:false
    }
  },
  Report:{
    screen: Report,
    navigationOptions: {
      headerShown:false
    }
  }
};
