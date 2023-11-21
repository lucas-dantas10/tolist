import { login } from "./actions/login/login";
import { getTasks, deleteTask } from "./actions/tasks/tasks";
import { getCurrentUser } from "./actions/user/user";
import { getStatus } from "./actions/status/status";
import { getPriority } from "./actions/priority/priority";

export default {
    login,
    getTasks,
    getCurrentUser,
    getStatus,
    getPriority,
    deleteTask
}