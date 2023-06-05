import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8090/news'
});

//const accessToken = JSON.parse(localStorage.getItem("accessToken"));
let accessToken = localStorage.getItem("accessToken");
if(accessToken != "undefined") {
    accessToken = JSON.parse(localStorage.getItem("accessToken"));
}

export const NewsAPI = {
    getAll: function(token) {
        return axiosInstance.request({
            method: "GET",
            url: ``,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
    getByGame: function(newsArticleId, token) {
        return axiosInstance.request({
            method: "GET",
            url: `/getByGame/${newsArticleId}`,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
    getById: function(newsArticleId, token) {
        return axiosInstance.request({
            method: "GET",
            url: `/${newsArticleId}`,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
    create: function(newsArticle, token) {
        return axiosInstance.request({
            method: "POST",
            url: ``,
            data: newsArticle,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
    update: function(newsArticle, token) {
        return axiosInstance.request({
            method: "PUT",
            url: ``,
            data: newsArticle,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
    delete: function(newsArticleId) {
        return axiosInstance.request({
            method: "DELETE",
            url: `/${newsArticleId}`,
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            },
        });
    },
}