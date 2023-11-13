<template>
    <div>
        <form class="flex flex-col items-start gap-2 mb-8 lg:flex-row lg:items-center lg:justify-between">
            <div class="flex flex-col items-start gap-2 lg:flex-row lg:items-center">
                <input
                    type="text"
                    placeholder="Filtro tarefas..."
                    class="border border-gray-200 rounded-lg px-2 py-1"
                />

                <button
                    class="border border-dotted text-sm border-gray-400 rounded-lg px-4 py-1 hover:bg-gray-200 transition-colors"
                >
                    <v-icon name="bi-plus-circle" fill="black" />
                    Status
                </button>

                <button
                    class="border border-dotted text-sm border-gray-400 rounded-lg px-4 py-1 hover:bg-gray-200 transition-colors"
                >
                    <v-icon name="bi-plus-circle" fill="black" />
                    Prioridade
                </button>
            </div>

            <button class="border border-gray-300 text-sm rounded-lg px-4 py-1 hover:bg-gray-200 transition-colors">
                <v-icon name="bi-arrow-down-up" fill="black" />
                View
            </button>

            <button
                type="submit"
                class="border border-blue-700 bg-blue-700 text-white rounded-lg px-4 py-1 hover:bg-blue-500 transition-colors lg:hidden"
            >
                Pesquisar
            </button>
        </form>

        <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" class="px-6 py-3">Tarefa</th>
                        <th scope="col" class="px-6 py-3">Title</th>
                        <th scope="col" class="px-6 py-3">Status</th>
                        <th scope="col" class="px-6 py-3">Prioridade</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b border-gray-50 text-gray-900">
                        <th
                            scope="row"
                            class="px-6 py-4 font-medium whitespace-nowrap"
                        >  
                            <div class="flex items-center gap-2">
                                <input type="checkbox" id="myCheckbox" class="form-checkbox w-4 h-4 rounded-md text-indigo-600 checked:bg-gray-900:rounded-md">
                                Academy
                            </div>                            
                        </th>
                        <td class="px-6 py-4">
                            <span class="border border-gray-200 px-2 py-1 rounded-md mr-2">Academia</span>
                            Fazer academia
                        </td>
                        <td class="px-6 py-4">
                            <v-icon name="co-clock" fill="black" />
                            Em progresso
                        </td>
                        <td class="px-6 py-4">
                            <v-icon name="bi-arrow-up" fill="black" />
                            Alta
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
