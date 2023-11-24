import store from '../..';
import axiosClient from '../../../axios';

export function getTasks({commit}, { url = null, search = '', per_page = 10, sort_field = 'title', sort_direction = 'asc', status, priority } = {}) {
    commit('setTasks', [true]);
    url = url || '/task';

    return axiosClient.get(url, {
        params: {
            search, sort_field, sort_direction, per_page, status, priority,
        }
    })
        .then(({data}) => {
            commit('setTasks', [false, data]);
        });

}

export function updateTask({commit}, task) {
    return axiosClient.put(`/task/${task.id}`, task);
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