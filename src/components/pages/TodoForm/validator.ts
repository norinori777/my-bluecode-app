import * as yup from 'yup'

export const schema = yup.object({
    todo: yup
        .string()
        .required('Todoの入力は必須です。')
        .min(3, 'Todoは、３文字以上入力してください。')
        .max(100, 'Todoは、最大１００文字となります。')
})