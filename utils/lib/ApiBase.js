
import { baseUrlForEndpoint } from './Links';

class Apibase {

    Post = async ({ url, body, bearerToken, successFunction, errorFunction, exceptionFunction }) => {
        fetch(baseUrlForEndpoint + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + bearerToken
            },
            body: JSON.stringify(body),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    successFunction(data)
                } else {
                    errorFunction(data)
                }
            })
            .catch((error) => {
                exceptionFunction(error)
            });
    }

    Get = async ({ url, bearerToken, successFunction, errorFunction, exceptionFunction }) => {

        fetch(baseUrlForEndpoint + url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + bearerToken
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    successFunction(data)
                } else {
                    errorFunction(data)
                }
            })
            .catch((error) => {
                exceptionFunction(error)
            });
    }
}

export default new Apibase