import CustomError from '../../customClass/CustomError.class';
import { apiError } from '../../apis/apiError.const';
import Netinfo from '@react-native-community/netinfo';
import axiosInstance from './api.service';
import { errorMessage } from './toast.service';
/**
 * Performs an asynchronous API call using Axios.
 *
 * @param {string} endPoint - The API endpoint to call.
 * @returns {Promise<any | CustomError>} A promise that resolves with the fetched data or rejects with an error.
 */
export async function getApiCall(endPoint: string): Promise<any | CustomError> {
  console.log('--- GET DEBUG ---');
  console.log('Full URL:', axiosInstance.defaults.baseURL + endPoint);
  try {
    const internetState = await Netinfo.fetch();
    if (!internetState.isConnected) {
      errorMessage('Connection Error', 'Please check your internet connection');
      throw new CustomError(apiError.NO_INTERNET, 'Please connect to internet');
    }
    const fetchedData = await axiosInstance.get(endPoint);
    if (fetchedData.data?.status === 200 || fetchedData.data?.status === 201) {
      return fetchedData?.data;
    } else if (
      fetchedData.data?.status === 401 ||
      fetchedData.data?.status === 400 ||
      fetchedData.data?.status === 410 ||
      fetchedData.data?.status === 403
    ) {
      throw new CustomError(
        apiError.TOKEN_EXPIRED,
        fetchedData.data?.message || fetchedData.data?.msg,
      );
    } else {
      throw new CustomError(
        apiError.DATA_NOT_FOUND,
        fetchedData.data?.message || fetchedData.data?.msg,
      );
    }
  } catch (error: any) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(apiError.API_CALL_FAILED, error?.message);
  }
}

/**
 * Performs an asynchronous POST API call using Axios.
 *
 * @template T - The type of the request body.
 * @param {string} endPoint - The API endpoint to call.
 * @param {T | any} body - The data to be sent in the request body.
 * @returns {Promise<any | CustomError>} A promise that resolves with the fetched data or rejects with a CustomError.
 */
export async function postApiCall<T>(
  endPoint: string,
  body?: T,
): Promise<any | CustomError> {
  console.log('--- POST DEBUG ---');
  console.log('Full URL:', axiosInstance.defaults.baseURL + endPoint);
  console.log('Body:', body);

  /* try {
    const fetchedData = await axiosInstance.post(endPoint, body);
    console.log('Response:', fetchedData);
    return fetchedData.data;
  } catch (err) {
    console.log('AXIOS ERROR:', err);
    throw err;
  } */
  try {
    const internetState = await Netinfo.fetch();
    if (!internetState.isConnected) {
      errorMessage('Connection Error', 'Please check your internet connection');
      throw new CustomError(apiError.NO_INTERNET, 'Please connect to internet');
    }

    const fetchedData = await axiosInstance.post(endPoint, body);
    // console.log("postApiCall-----axiosInstance--11--", endPoint, "+++", JSON.stringify(body))
    if (fetchedData.data?.status === 200 || fetchedData.data?.status === 201) {
      return fetchedData?.data;
    } else if (
      fetchedData.data?.status === 401 ||
      fetchedData.data?.status === 400 ||
      fetchedData.data?.status === 410
    ) {
      throw new CustomError(
        apiError.TOKEN_EXPIRED,
        fetchedData.data?.message || fetchedData.data?.msg,
      );
    } else {
      throw new CustomError(
        apiError.DATA_NOT_FOUND,
        fetchedData.data?.message || fetchedData.data?.msg,
      );
    }
  } catch (error: any) {
    // console.log(error, 'ERROR');
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError("postApiCall---------" + apiError.API_CALL_FAILED, error?.message);
  }
}

/**
 * Performs an asynchronous PUT API call using Axios.
 *
 * @template T - The type of the request body.
 * @param {string} endPoint - The API endpoint to call.
 * @param {T | any} body - The data to be sent in the request body.
 * @returns {Promise<any | CustomError>} A promise that resolves with the fetched data or rejects with a CustomError.
 */
export async function putApiCall<T>(
  endPoint: string,
  body: T | any,
): Promise<any | CustomError> {
  try {
    const internetState = await Netinfo.fetch();
    if (!internetState.isConnected) {
      errorMessage('Connection Error', 'Please check your internet connection');
      throw new CustomError(apiError.NO_INTERNET, 'Please connect to internet');
    }
    const fetchedData = await axiosInstance.put(endPoint, body);
    if (fetchedData.data.status === 200 || fetchedData.data.status === 201) {
      return fetchedData?.data;
    } else if (
      fetchedData.data?.status === 401 ||
      fetchedData.data?.status === 400 ||
      fetchedData.data?.status === 410
    ) {
      throw new CustomError(
        apiError.TOKEN_EXPIRED,
        fetchedData.data?.message || fetchedData.data?.msg,
      );
    } else {
      throw new CustomError(
        apiError.DATA_NOT_FOUND,
        fetchedData.data?.message || fetchedData.data?.msg,
      );
    }
  } catch (error: any) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(apiError.API_CALL_FAILED, error?.message);
  }
}

/**
 * Performs an asynchronous DELETE API call using Axios.
 *
 * @param {string} endPoint - The API endpoint to call.
 * @returns {Promise<any | CustomError>} A promise that resolves with the fetched data or rejects with a CustomError.
 */
export async function deleteApiCall(
  endPoint: string,
): Promise<any | CustomError> {
  try {
    const internetState = await Netinfo.fetch();
    if (!internetState.isConnected) {
      errorMessage('Connection Error', 'Please check your internet connection');
      throw new CustomError(apiError.NO_INTERNET, 'Please connect to internet');
    }
    const fetchedData = await axiosInstance.delete(endPoint);
    if (fetchedData.data?.status === 200 || fetchedData.data?.status === 201) {
      return fetchedData?.data;
    } else if (
      fetchedData.data?.status === 401 ||
      fetchedData.data?.status === 400 ||
      fetchedData.data?.status === 410
    ) {
      throw new CustomError(
        apiError.TOKEN_EXPIRED,
        fetchedData.data?.message || fetchedData.data?.msg,
      );
    } else {
      throw new CustomError(
        apiError.DATA_NOT_FOUND,
        fetchedData.data?.message || fetchedData.data?.msg,
      );
    }
  } catch (error: any) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(apiError.API_CALL_FAILED, error?.message);
  }
}
