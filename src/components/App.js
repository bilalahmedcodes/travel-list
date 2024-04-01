import {useState} from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";
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

    function handleToggleItem(id) {
        setItems(items => items.map(
            (item) => item.id === id ? {...item, packed: !item.packed} : item
        ))
    }

    function handleClearList() {
        setItems([])
    }

    return (
        <div className="app">
            <Logo/>
            {/* adding handleAddItems now as a prop in order to make form component work and manage state*/}
            <Form onAddItems={handleAddItems}/>
            <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem}
                         onClearList={handleClearList}/>
            <Stats items={items}/>
        </div>
    );
}





