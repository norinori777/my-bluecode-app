import * as yup from 'yup'

export const schema = () => yup.object({
    searchText: yup
        .string()
        .max(10, '検索ワードは、10文字となります。'),
    startDate: yup
        .date()
        .nullable()
        .required('開始日付は必須です。'),
    endDate: yup
        .date()
        .nullable()
        .required('終了日付は必須です。')
        .min(yup.ref('startDate'), '終了日付は開始日付より後の日付を選択してください。'),
})