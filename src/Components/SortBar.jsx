import { useSearchParams } from 'react-router-dom';

export default function SortBar(){

    const [searchParams, setSearchParams] = useSearchParams();
    const order = searchParams.get('order') || 'desc'
    const newParams = new URLSearchParams(searchParams);

    function handleFlip(){
        if (order === 'desc'){
           
            newParams.set('order', 'asc')     
        } else {
            newParams.set('order', 'desc')
        }
        newParams.set('page', 1)
        setSearchParams(newParams)
    }
    function handleSort(e){
        newParams.set('page', 1)
        newParams.set('sort_by', e.target.value);
        newParams.set('order', 'desc')
        setSearchParams(newParams);
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