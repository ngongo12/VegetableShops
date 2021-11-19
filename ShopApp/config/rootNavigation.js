import { createNavigationContainerRef } from "@react-navigation/core";

export const navigationRef = createNavigationContainerRef();

export const navigate = (name, params) => {
    if(navigationRef.isReady()){
        navigationRef.navigate(name, params);
    }
    else{
        console.log('navigationRef is not ready');
    }
}

export default {
    navigate,
    navigationRef
}