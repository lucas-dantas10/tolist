import { login, logout } from "./actions/login/login";
import { getTasks, deleteTask, updateTask, storeTask } from "./actions/tasks/tasks";
import { getCurrentUser } from "./actions/user/user";
import { getStatus } from "./actions/status/status";
import { getPriority } from "./actions/priority/priority";
import { getCategories, storeCategory } from "./actions/category/category";

export default {
    login,
    getTasks,
    getCurrentUser,
    getStatus,
    getPriority,
    deleteTask,
    getCategories,
    updateTask,
    logout,
    storeTask,
    storeCategory,
}