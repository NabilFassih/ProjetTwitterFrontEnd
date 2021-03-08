import React from 'react';
import { fetchUtils, Admin, Resource } from 'react-admin';

import ListUser from './User/List';
import ShowUser from './User/Show';
import CreateUser from "./User/Create";
import EditUser from "./User/Edit";

import ListUserSearch from './UserSearch/List';
import ShowUserSearch from './UserSearch/Show';
import CreateUserSearch from "./UserSearch/Create";
import EditUserSearch from './UserSearch/Edit';

import jsonServerProvider from 'ra-data-json-server';

const fetchJson = (url, options = {}) => {
    const dataUser = JSON.parse(localStorage.getItem('dataUser'));
    options.user = {
        authenticated: true,
        token: dataUser.user.role === "admin" ? dataUser.token : ''
    };
    return fetchUtils.fetchJson(url, options);
};

const dataProvider = jsonServerProvider('http://localhost:8080', fetchJson);

const AdminPage = () => {
    return (
        <Admin
            dataProvider={dataProvider}
            title="Example Admin"
        >
            <Resource name="users" list={ListUser} show={ShowUser} create={CreateUser} edit={EditUser} />
            <Resource name="usersearch" list={ListUserSearch} show={ShowUserSearch} create={CreateUserSearch} edit={EditUserSearch} />
        </Admin>
    )
};

export default AdminPage;