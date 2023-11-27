<script setup>
const props = defineProps({
    label: {
        type: String,
        default: "",
    },
    modelValue: {
        type: [String, Number],
        default: "",
    },
    type: {
        type: String,
        default: "text",
    },
    selectOptions: {
        type: Array
    }
});
</script>

<template>
    <div class="flex flex-col gap-2 justify-center" v-if="type !== 'select'">
        <label class="text-xl font-semibold">{{ label }}</label>
        <input
            :placeholder="label"
            :value="modelValue"
            :type="type"
            @input="$emit('update:modelValue', $event.target.value)"
            class="border border-gray-300 rounded-md w-3/6 px-2 py-1 focus:outline-dotted"
        />
    </div>

    <!-- <div v-else class="flex flex-col gap-2 justify-center">
        <label class="text-xl font-semibold">{{ label }}</label>
        <select
            class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-dotted block w-3/6 py-2 px-2"
            :value="modelValue"
        >
            <option v-for="option of selectOptions" :value="option.id" :key="option.key">{{ option.name }}</option>
        </select>
    </div> -->
</template>
