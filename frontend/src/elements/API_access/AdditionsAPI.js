import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/additions'
});

const accessToken = JSON.parse(localStorage.getItem("accessToken"));

export const AdditionsAPI = {
    getAll: function(token) {
        return axiosInstance.request({
            method: "GET",
            url: ``,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
    getById: function(additionId, token) {
        return axiosInstance.request({
            method: "GET",
            url: `/${additionId}`,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
    create: function(addition, token) {
        return axiosInstance.request({
            method: "POST",
            url: ``,
            data: addition,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
    update: function(addition, token) {
        return axiosInstance.request({
            method: "PUT",
            url: ``,
            data: addition,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
    delete: function(additionId, token) {
        return axiosInstance.request({
            method: "DELETE",
            url: `/${additionId}`,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
}