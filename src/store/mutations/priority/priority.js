export function setPriority(state, priorities) {
    state.priority.data = priorities;

    const priorityCounts = {
        "Alta": 0,
        "Média": 0,
        "Baixa": 0,
    }

    state.tasks.data.forEach(task => {
        const priorityType = task.priority.type;
        if (priorityType in priorityCounts) {
            priorityCounts[priorityType] += 1;
        } else {
            console.warn(`Unknown task status: ${priorityType}`);
        }
    });

    state.priority.data.forEach(priority => {
        priority.amountHigh = priorityCounts["Alta"];
        priority.amountAverage = priorityCounts["Média"];
        priority.amountLow = priorityCounts["Baixa"];
        priority.isCheck = false
    });
}