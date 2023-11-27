import axiosClient from '../../../axios';

export function login({commit, state}, user) {
    return axiosClient.post('/login', user)
        .then(({data}) => {
            state.spinner.loading = true;
            console.log(state.spinner);
            commit('setUser', data.user);
            commit('setToken', data.token);
            return data;
        })
        .finally(() => state.spinner.loading = false);
}

export function logout({commit}) {
    return axiosClient.post('/logout')
        .then(response => {
            commit('setUser', {});
            commit('setToken', null);
            return response;
        });
}

