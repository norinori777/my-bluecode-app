import React from 'react';

interface SelectboxProps<T> {
    label: string
    items: { text: string, value: string }[]
    noneSelectedText: string
    register: T
}

export const Selectbox = <T,>(props: SelectboxProps<T>) => {
    return (
        <>
            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{props.label}</label>
            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...props.register}>
                <option value="">{props.noneSelectedText}</option>
                {props.items.map((item, index) => {
                    return (
                        <option key={index} value={item.value}>{item.text}</option>
                    )
                
                })}
            </select>
        </>
    )
}


