import {useState} from "react";
import Item from "./Item";
export default function PackingList({items, onDeleteItem, onToggleItem, onClearList}) {
    const [sortBy, setSortBy] = useState('input');
    let sortedItems;
    if (sortBy === 'input') {
        sortedItems = items
    }
    if (sortBy === 'description') {
        sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
    }
    if (sortBy === 'packed') {
        sortedItems = items.slice().sort((a, b) => Number(a.description) - Number(b.description));
    }
    return (<div className="list">
            <ul>
                {sortedItems.map((item) => (
                    <Item item={item} key={item.id} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem}/>))}
            </ul>
            <div className="actions">
                <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                    <option value="input">Sort by Input</option>
                    <option value="description">Sort by Description</option>
                    <option value="packed">Sort by Packed</option>
                </select>
                <button onClick={onClearList}>Clear List</button>
            </div>
        </div>);
}