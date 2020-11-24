import React from 'react';
import './App.css';
import ListItems from './ListItems'

let monthNumber = (new Date().getMonth())
let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let monthName = monthNames[monthNumber];

function getDayName(dateStr, locale)
{
    var date = new Date(dateStr)
    return date.toLocaleDateString(locale, { weekday: 'long' });       
}

var dateStr = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
var day = getDayName(dateStr, "en-US")

class App extends React.Component {
  constructor() {
    super()
    this.state={
      tasks: ListItems,
      currentYear: new Date().getFullYear(),
      currentDay: new Date().getDate(),
      items:[],
      currentItem: {
        text:'',
        key: '',
        id: 0
      }
    }
    this.handleInput = this.handleInput.bind(this)
    this.addItem = this.addItem.bind(this)
    this.chandleChange = this.chandleChange.bind(this)
  }
  addItem(e,){
    const cname = this.state.currentItem.key
    const cvalue = this.state.currentItem.text
    document.cookie = cname + "=" + cvalue + ";" 

    const number = this.state.currentItem.id + 1
    //sessionStorage.setItem(this.state.currentItem.key ,this.state.currentItem.text)
    //document.cookie = `${this.state.currentItem.id}=${this.state.currentItem.text}`
    e.preventDefault()
    const newItem = this.state.currentItem
    if(newItem.text !==""){
      const newItems=[...this.state.items, newItem]
      this.setState({
        items:newItems,
        currentItem:{
          text:'',
          key: '',
          id: number
        }
      })
    }
  }  
  handleInput(e){
    this.setState({
      currentItem:{
        text: e.target.value,
        key:Date.now(),
        id: this.state.currentItem.id
      }
    })
  }
  /*setCookie(exdays) {
    const cname = this.state.currentItem.id
    const cvalue = this.state.currentItem.text
    var d = new Date()
    d.setTime(d.getTime() + (exdays*24*60*60*1000))
    var expires = "expires="+ d.toUTCString()
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
  } */

  getCookie() {
    const cname = this.state.currentItem.key
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return  <section>{c.substring(name.length, c.length)}</section>
        
      }
    }
    return '';
  } 

  chandleChange() { 
    this.setState(prevState => {
        const updatedTodos = prevState.tasks.item.map(task => {
            if (task.listItems.text === this.state.currentItem.text) {
                task.change = !task.change
            }
            return task
        })
        return {
            tasks: updatedTodos
        }
    })
}
  render() {
    return (
      <div>
        <nav className="pustka"></nav>
        <aside className="pustka2"></aside>
        <section className="Dzien">{ this.state.currentDay }</section>
        <main className="MiesiacRok"> 
          <article>{ monthName }</article>
          <article>{ this.state.currentYear }</article>
        </main>
        <footer className="Dzien-nazwa">{day}</footer>
      <header className="App">
          <main>{this.getCookie}</main>
          <ListItems  items={this.state.items}  />
        <form className="dodawanie" id="to-do-form" onSubmit={this.addItem}>
          <input type="text" placeholder="Enter task" value= {this.state.currentItem.text} onChange={this.handleInput}></input>
          <button type="submit">+</button>
        </form>
      </header>
    </div>
    )
  }
}
export default App
