import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import screens from './screens';

const MainNavigator = createStackNavigator({
  ...screens,
});

const App = createAppContainer(MainNavigator);

export default App;