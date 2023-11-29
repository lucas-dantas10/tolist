import axiosClient from '../../../axios';

export function getCurrentUser({commit}) {
    return axiosClient.get('/current-user')
        .then(({data}) => commit('setUser', data));
}

export function storeUser({commit, state}, user) {
    state.spinner.loading = true;
    return axiosClient.post('/user', user)
        .then(({data}) => {
            commit('showToast', {
                message: data.message,
                type: 'success',
            });

            return data;
        })
        .catch(({response}) => {
            console.log(response);
            commit('showToast', {
                message: response.data.message,
                type: 'error',
            });

            return response;
        })
        .finally(() => state.spinner.loading = false);
}