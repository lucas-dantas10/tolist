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
    },
    required: {
        type: Boolean
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
            :required="required"
            @input="$emit('update:modelValue', $event.target.value)"
            class="border border-gray-300 rounded-md w-3/6 px-2 py-1 focus:outline-dotted dark:bg-gray-200 dark:text-black"
        />
    </div>
</template>
