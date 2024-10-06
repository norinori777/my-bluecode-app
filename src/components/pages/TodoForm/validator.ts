import * as yup from 'yup'

export const schema = yup.object({
    todo: yup
        .string()
        .required('Todo is required')
        .min(3, 'Todo must be at least 3 characters')
        .max(100, 'Todo must be at most 100 characters')
})