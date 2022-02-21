import { useEffect, useState } from "react"

import { ITopCoinsPaginationProps } from "./interfaces"
import useDebounce from "../../customHooks/useDebounce"


export default ({ page, search, setSearch, setPerPage, setPage, maxPage, perPage }: ITopCoinsPaginationProps) => {

    const defaultPageSelected = {
        first: false,
        current: false,
    }

    const [intermediatePage, setIntermediatePage] = useState(1)
    const [pageSelected, setPageSelected] = useState({
        first: false,
        current: true,
    })

    const debouncedPage = useDebounce(intermediatePage, 1000)

    useEffect(() => {
        setPage(debouncedPage !== 0 ? debouncedPage : page)
    }, [debouncedPage])

    return <div className="top-coins__pagination">
        <div className="top-coins__pagination__page">
            <a className={`top-coins__pagination__page--content`}
               onClick={() => {
                   setPage(1)
                   setPageSelected(() => Object({...defaultPageSelected, current: true}))
               }}>
                {page > 2 && 1}
            </a>
            <a className={`top-coins__pagination__page--content top-coins__pagination__page--content${search && '--hidden'}`}
               onClick={() => setSearch((prev: boolean) => !prev)}>
                {page > 2 && '...'}
            </a>
            <a className={`top-coins__pagination__page--content `}
               onClick={() => {
                   page > 1 && setPage(page - 1)
                   setPageSelected(() => Object({...defaultPageSelected, [page === 1 ? 'first' : 'current']: true}))
               }}>
                {page > 1 && page - 1}
            </a>
            <a className={`top-coins__pagination__page--content top-coins__pagination__page--content${pageSelected.current && '--active'}`}
               onClick={() => {
                   setPage(page)
                   setPageSelected(() => Object({...defaultPageSelected, current: true}))
               }}>
                {page}
            </a>
            <a className={`top-coins__pagination__page--content `}
               onClick={() => {
                   page < maxPage && setPage(page + 1)
                   setPageSelected(() => Object({...defaultPageSelected, current: true}))
               }}>
                {page < maxPage && page + 1}
            </a>
            <a className={`top-coins__pagination__page--content top-coins__pagination__page--content${search && '--hidden'}`}
               onClick={() => {setSearch((prev: boolean) => !prev)}}>
                {page < maxPage - 1 && '...'}
            </a>
            <a className={`top-coins__pagination__page--content `}
               onClick={() => {
                   setPage(maxPage)
                   setPageSelected(() => Object({...defaultPageSelected, current: true}))
               }}>
                {page < maxPage - 1 && maxPage}
            </a>
            <input
                className={`top-coins__pagination__page--input top-coins__pagination__page--input${search && '--visible'}`}
                placeholder="Page..."
                onChange={(e) => {
                    setIntermediatePage(Number(e.target.value))
                    setTimeout(() => e.target.value = '', 1000)
                }}
                type="text"/>
        </div>
        <div className="top-coins__pagination__per-page">
            <label className="top-coins__pagination__per-page--label" htmlFor="perPage">Per page&nbsp;</label>
            <select className="top-coins__pagination__per-page--select" name="perPage" id="perPage"
                    value={perPage}
                    onChange={(e) => {
                        setPerPage(Number(e.target.value))
                        setPage(1)
                    }}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
        </div>
    </div>
}