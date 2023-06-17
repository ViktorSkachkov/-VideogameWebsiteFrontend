import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8090/login'
});

export const LoginAPI = {
    logIn: function(loginRequest) {
        return axiosInstance.request({
            method: "POST",
            url: ``,
            data: loginRequest,
            headers: {
                "Content-Type" : "application/json"
            },
        });
    },
}