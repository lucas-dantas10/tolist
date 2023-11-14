import axiosClient from '../../../axios';

export function login({commit}, user) {
    return axiosClient.post('/login', user)
        .then(({data}) => {
            console.log(data);
            commit('setUser', data.user);
            commit('setToken', data.token);
            return data;
        });
}

