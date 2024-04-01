/*here we are passing onDeleteItem because deletion is done here and reason is that item is sub component of packing list so cannot be directly passed so we have to pass first to top one and then the related one*/
export default function Item({item, onDeleteItem, onToggleItem}) {
    return (
        <li>
            <input type="checkbox" value={item.packed} onChange={() => onToggleItem(item.id)}/>
            <span style={item.packed ? {textDecoration: "line-through"} : {}}>
        {item.quantity} {item.description}
      </span>
            {/*
            by doing <button onClick={onDeleteItem}>❌</button> the event is immediately called and an object is returned intead of deleting
            so in order to prevent this use onClick={() => onDeleteItem(item.id)} as in this react only calls it when
            deletion event happens
            */}
            <button onClick={() => onDeleteItem(item.id)}>❌</button>
        </li>
    );
}