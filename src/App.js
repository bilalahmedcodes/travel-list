import {useState} from "react";

export default function App() {
    // state lift up to the closest sibling
    const [items, setItems] = useState([]); // the array of items like socks, shoes etc and serves the purpose of not to show any item by default if the app is opened for the first time
    function handleAddItems(item) {
        // inside the setItems is the callback function that then immutables the existing array. i.e we make a new array with existing elements and add the new one then in it using spread operator ...
        setItems((items) => [...items, item])
    }

    function handleDeleteItem(id) {
        setItems((items) => items.filter((item) => item.id !== id))
    }

    return (
        <div className="app">
            <Logo/>
            {/* adding handleAddItems now as a prop in order to make form component work and manage state*/}
            <Form onAddItems={handleAddItems}/>
            <PackingList items={items} onDeleteItem={handleDeleteItem}/>
            <Stats/>
        </div>
    );
}

function Logo() {
    return <h1>🌴 Far Away </h1>;
}

function Form({onAddItems}) {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);


    function handleSubmit(e) {
        e.preventDefault();
        if (!description) return;
        const newItem = {quantity, description, packed: false, id: Date.now()};
        console.log(newItem);
        onAddItems(newItem)
        /* set form to its initial stage after submission */
        setDescription("");
        setQuantity(1);
    }

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for your trip?</h3>
            <select
                name=""
                id=""
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
            >
                {Array.from({length: 20}, (_, i) => i + 1).map((num) => (
                    <option value={num} key={num}>
                        {/* for iteration we provide key (unique) */}
                        {num}
                    </option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Item...."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button>Add</button>
        </form>
    );
}

function PackingList({items, onDeleteItem}) {
    return (
        <div className="list">
            <ul>
                {items.map((item) => (
                    <Item item={item} key={item.id} onDeleteItem={onDeleteItem}/>
                ))}
            </ul>
        </div>
    );
}

/*here we are passing onDeleteItem because deletion is done here and reason is that item is sub component of packing list so cannot be directly passed so we have to pass first to top one and then the related one*/
function Item({item, onDeleteItem}) {
    return (
        <li>
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

function Stats() {
    return (
        <footer className="stats">
            <em>You have X items on your list, and you already packed X (X%)</em>
        </footer>
    );
}
