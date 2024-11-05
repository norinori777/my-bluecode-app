import * as yup from 'yup'

export const schema = () => yup.object({
    searchText: yup
        .string()
        .max(10, '検索ワードは、10文字となります。')
})