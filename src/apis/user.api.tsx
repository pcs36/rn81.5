import {endPoints} from '../apis/endPoints.const';
import {getApiCall, postApiCall} from '../store/services/crud.service';
import axiosInstance from '../store/services/api.service';
import sampleJson from '../../subhauler.json'
import { storeData } from "../utils/util";
/**
 * check user Credentials   
 */
async function userLoginApi(
  e_mail: string,
  password: string
): Promise<any> {
  try {
    /* const result = sampleJson;
    storeData("userLoginDetails", JSON.stringify(sampleJson)); */
    const result = await postApiCall(endPoints.loginApi, {
      e_mail,
      password
    });
    return result;
  } catch (error: any) {
    throw error;
  }
}

async function userCreatpi(
  f_name:string, 
  l_name:string, 
  e_mail:string, 
  password:string
): Promise<any> {
  try {
    const result = await postApiCall(endPoints.createUser, {
      f_name, l_name, e_mail, password
    });
    return result;
  } catch (error: any) {
    throw error;
  }
}

async function userAllDetailsApi(): Promise<any> {
  try {
    const result = await getApiCall(endPoints.userAllDetails);
    return result;
  } catch (error: any) {
    throw error;
  }
}




export const userApi = {
  userLoginApi,
  userCreatpi,
  userAllDetailsApi
};