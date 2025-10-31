
import AsyncStorage from '@react-native-async-storage/async-storage';



export const storeData = async (key:any, data:any) => {
    try {
      await AsyncStorage.setItem(key, data);
    } catch (e) {
      console.log("Error in storeData@Util: " + JSON.stringify(e));
    }
  }
  
  export const getData = async (key:any) => {
    return new Promise((resolve, reject) => {
  
      AsyncStorage.getItem(key)
        .then(res => {
          if (res !== null) {
            resolve(res);
          } else {
            resolve(false);
          }
        })
        .catch(err => {
          console.log("Error in getData@Util: " + JSON.stringify(err));
          reject(err);
        });
    });
  }

  export const clearAllData = () => {
    return AsyncStorage.clear();
  }