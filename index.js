import { registerRootComponent } from "expo";

import App from "./mainscreen/App";
import Cal from "./mainscreen/BMIcalculator";
import ApiTest from "./mainscreen/BT3_ApiTest";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(ApiTest);
