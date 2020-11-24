import React from 'react'
import './ListItems.css'
import App from './App'

function ListItems(props){  
    const change =false  
    const completedStyle = {
        fontStyle: "italic",
        color: "#cdcdcd",
        textDecoration: "line-through"
    }
    const items = props.items;
    const listItems = items.map(item =>{
        return <section className="list" key="item.key">
            <form>
                <label style={change ? completedStyle : null}>{item.text}</label>
                <input type="checkbox" checked={change}
                onChange={() => App.chandleChange(props.item)}></input>
            </form>
        </section>
    })
    return(
    <p>{listItems}</p>
    )    
   }

  export default ListItems;