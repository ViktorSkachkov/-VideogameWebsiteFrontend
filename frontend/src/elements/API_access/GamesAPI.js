import axios from "axios";
import {useState} from "react";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/videogames'
});

let accessToken = localStorage.getItem("accessToken");
if(accessToken != "undefined") {
    accessToken = JSON.parse(localStorage.getItem("accessToken"));
}

export const GamesAPI = {
    getAll: function(token) {
        return axiosInstance.request({
            method: "GET",
            url: ``,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
    getForNewsFilter: function(token) {
        return axiosInstance.request({
            method: "GET",
            url: `/newsFilter`,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
    getForAdditionsFilter: function(token) {
        return axiosInstance.request({
            method: "GET",
            url: `/additionsFilter`,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
    getFeatured: function(token) {
        return axiosInstance.request({
            method: "GET",
            url: `/featured`,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
    getUpcoming: function(token) {
        return axiosInstance.request({
            method: "GET",
            url: `/upcoming`,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
    getById: function(gameId, token) {
        return axiosInstance.request({
            method: "GET",
            url: `/${gameId}`,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
    create: function(videogame, token) {
        return axiosInstance.request({
            method: "POST",
            url: ``,
            data: videogame,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
    update: function(videogame, token) {
        return axiosInstance.request({
            method: "PUT",
            url: ``,
            data: videogame,
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
    },
    delete: function(gameId, token) {
        return axiosInstance.request({
            method: "DELETE",
            url: `/${gameId}`,
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            },
        });
    },
}