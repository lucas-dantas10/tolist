import store from '../..';
import axiosClient from '../../../axios';

export function getTasks({commit}, { url = null, search = '', per_page = 10, sort_field = 'title', sort_direction = 'asc', status, priority } = {}) {

    url = url || '/task';

    return axiosClient.get(url, {
        params: {
            search, sort_field, sort_direction, per_page, status, priority,
        }
    })
        .then(({data}) => {
            commit('setTasks', data.tasks);
        })

}

export function deleteTask({commit}, idTask) {
    return axiosClient.delete(`/task/${idTask}`)
        .then(({data}) => {
            store.commit('showToast', {
                message: data.message,
                type: 'success'
            });
        });
}