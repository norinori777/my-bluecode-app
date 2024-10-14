import * as yup from 'yup'

export const schema = yup.object({
    name: yup
        .string()
        .required('Nameの入力は必須です。')
        .min(2, 'Nameは、2文字以上入力してください。')
        .max(20, 'Nameは、最大20文字となります。'),
    email: yup
        .string()
        .required('Emailの入力は必須です。')
        .email('Emailの形式が正しくありません。')
        .max(100, 'Emailは、最大100文字となります。'),
    position: yup
        .string()
        .required('Positionの入力は必須です。')
        .oneOf(['admin', 'general'], 'Positionは、adminかgeneralを選択してください。'),
    status: yup
        .boolean()
        .required('Statusの入力は必須です。')
})