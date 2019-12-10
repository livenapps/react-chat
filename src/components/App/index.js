import React from 'react';
import './styles.scss';
import io from 'socket.io-client';
import {server} from './constants';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      usersCount: 0,
      userName: localStorage.getItem('userName') || '',
      userId: '',
      userMessage: '',
      messages: [],
      users: new Map(),
    };

    this.socket = io(server.URL);

    this.subscribeOnSocketEvents();
    this.onLeaveWindow();

    this.setUserName = this.setUserName.bind(this);
    this.setUserMessage = this.setUserMessage.bind(this);
    this.sendUserMessage = this.sendUserMessage.bind(this);
  }

  setUserName(e) {
    this.setState({
      userName: e.target.value
    });
  }

  setUserMessage(e) {
    this.setState({
      userMessage: e.target.value
    });
  }

  subscribeOnSocketEvents() {
    this.socket.on('connect', () => {
      console.warn('You are connected');
    });
    this.socket.on('reconnect', () => {
      console.warn('You are reconnected');
    });
    this.socket.on('disconnect', () => {
      console.log('You are disconnected');
    });
    this.socket.on('event', (e) => {
      console.log(e);
    });

    this.socket.on('message', (message) => {
      if (message.event === 'sent' || message.event === 'received') {
        this.setState({
          messages: [...this.state.messages, message.data],
        });
      } else if (message.event === 'connected') {
        console.log('connected', message.data);
        this.setState({
          userId: message.data.userId,
          usersCount: message.data.usersCount,
        });
      } else if (message.event === 'userJoined') {
        console.log('userJoined', message.data);
        this.setState({usersCount: message.data.usersCount});
      } else if (message.event === 'userLeft') {
        this.setState({usersCount: message.data.usersCount});
      }
    });
  }

  sendUserMessage(e) {
    e.preventDefault();

    this.state.userMessage && this.socket.send({
      name: this.state.userName,
      message: this.state.userMessage,
    });
  }

  onLeaveWindow() {
    window.addEventListener('beforeunload', ()=>{
      localStorage.setItem('userName', this.state.userName);
    });
  }

  render() {
    return <React.Fragment>
      <header className="chat__header">
        <h1 className="chat__title">
          socket.io / context api + hooks / jest / typescript
        </h1>
        <h2 className="chat__subtitle">
          {`Hello, ${this.state.userName}`}
        </h2>
        <h2 className="chat__subtitle">
          {`Now in chat ${this.state.usersCount} people`}
        </h2>
      </header>
      <div className="chat__main-wrapper">
        <aside className="chat__sidebar">
          <fieldset className="chat__fieldset">
            <legend className="chat__legend">
              Insert/change your name:
            </legend>
            <input className="chat__input chat__input--name" type="text" value={this.state.userName}
                   onChange={this.setUserName}/>
          </fieldset>
        </aside>
        <section className="chat__messages">
          <div className="chat__messages-wrapper">
            {this.state.messages.map((message, i) => {
              const date = new Date(message.date);

              return <article key={i} className="chat__message message">
                <header className="message__header">
                  <span className="message__author">{message.name}</span>
                  <time className="message__time">{`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}</time>
                </header>
                <main className="message__content">{message.message}</main>
              </article>;
            })}
          </div>
        </section>
      </div>
      <form className="chat__input-area input-area" onSubmit={this.sendUserMessage}>
        <textarea className="input-area__text-input" name="input-area" id="input-area" rows="3"
                  value={this.state.userMessage} onChange={this.setUserMessage}/>
        <button className="input-area__btn" type="submit">Send</button>
      </form>
    </React.Fragment>;
  }
}
