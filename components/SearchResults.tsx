import { List, ListRowRenderer, AutoSizer } from 'react-virtualized'
import { ProductItem } from "./ProductItem"

type SearchResultsProps = {
    results: Array<{
        id: number
        price: number
        priceFormatted: string
        title: string
    }>
    totalPrice: number 
    onAddToWishList: (id: number) => void
}

export function SearchResults({ results, onAddToWishList, totalPrice }: SearchResultsProps){

    const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
        return (
            <div key={key} style={style}>
                <ProductItem product={results[index]} onAddToWishList={onAddToWishList}/>
            </div>
        )   
    }

    return (
        <>
            <div>{totalPrice}</div>
            <div style={{ width: '100%', height: '50vh'}}>
                <AutoSizer>
                    {({ width, height}) => (
                        <>
                            <List 
                                height={height}
                                rowHeight={30}
                                width={width}
                                overscanRowCount={4}
                                rowCount={results.length}
                                rowRenderer={rowRenderer}
                            />
                        </>
                    )}
                </AutoSizer>
            </div>
        </>
    )
}