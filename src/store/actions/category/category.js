import axiosClient from '../../../axios';

export function getCategories({commit}) {
    return axiosClient.get('/category')
        .then(({data}) => commit('setCategory', data.data));
}