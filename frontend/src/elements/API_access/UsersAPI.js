import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/users'
});

//const accessToken = JSON.parse(localStorage.getItem("accessToken"));
let accessToken = localStorage.getItem("accessToken");
if(accessToken != "undefined") {
    accessToken = JSON.parse(localStorage.getItem("accessToken"));
}

export const UsersAPI = {
    getAll: function() {
        return axiosInstance.request({
            method: "GET",
            url: ``,
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            },
        });
    },
    getById: function(userId, token) {
        return axiosInstance.request({
            method: "GET",
            url: `/${userId}`,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
    /*create: function(user, token) {
        return axiosInstance.request({
            method: "POST",
            url: ``,
            data: user,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },*/
    create: function(user, token) {
        return axiosInstance.request({
            method: "POST",
            url: ``,
            data: user,
            headers: {
                "Content-Type" : "application/json"
            },
        });
    },
    update: function(user, token) {
        return axiosInstance.request({
            method: "PUT",
            url: ``,
            data: user,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
    delete: function(userId, token) {
        return axiosInstance.request({
            method: "DELETE",
            url: `/${userId}`,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
}