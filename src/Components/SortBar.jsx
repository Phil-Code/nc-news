import { useSearchParams } from 'react-router-dom';

export default function SortBar({order, setOrder, setSortBy}){

    const [searchParams, setSearchParams] = useSearchParams();
    function handleFlip(){
        setOrder((current)=>{
            if (current === 'desc'){
                return 'asc'
            } else return 'desc'
        })
    }
    function handleSort(e){
        const newParams = new URLSearchParams(searchParams);
        newParams.set('sort_by', e.target.value);
        setSearchParams(newParams);
        setSortBy(e.target.value)
    }
    return (
        <div className="sort-container">
            <button onClick={handleFlip} className="button sort-button">order: {order}</button>
            <button onClick={handleSort} value='created_at' className="button sort-button">Date</button>
            <button onClick={handleSort} value='comment_count' className="button sort-button">Comments</button>
            <button onClick={handleSort} value='votes' className="button sort-button">Votes</button>
        </div>
    )
}