import { Dispatch, SetStateAction } from "react";

export interface ITopCoinsPaginationProps {
    page: number
    search: boolean
    maxPage: number
    perPage: number
    setSearch: Dispatch<SetStateAction<boolean>>
    setPerPage: Dispatch<SetStateAction<number>>
    setPage: Dispatch<SetStateAction<number>>
}

