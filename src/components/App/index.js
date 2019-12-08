import React from 'react';
import './styles.scss';

export default class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      messages: [
        {
          name: 'Name',
          surname: 'Surname',
          time: '12:00',
          text: 'Some text of message here'
        },
        {
          name: 'Name',
          surname: 'Surname',
          time: '12:00',
          text: 'Some text of message here'
        },
        {
          name: 'Name',
          surname: 'Surname',
          time: '12:00',
          text: 'Some text of message here'
        },
        {
          name: 'Name',
          surname: 'Surname',
          time: '12:00',
          text: 'Some text of message here'
        },
        {
          name: 'Name',
          surname: 'Surname',
          time: '12:00',
          text: 'Some text of message here'
        },
        {
          name: 'Name',
          surname: 'Surname',
          time: '12:00',
          text: 'Some text of message here'
        },
        {
          name: 'Name',
          surname: 'Surname',
          time: '12:00',
          text: 'Some text of message here'
        },
      ]
    };
  }

  render() {
    return <React.Fragment>
      <header className="chat__header">
        <h1 className="chat__title">
          socket.io / context api + hooks / jest / typescript
        </h1>
      </header>
      <div className="chat__main-wrapper">
        <aside className="chat__sidebar">
          <fieldset className="chat__fieldset">
            <legend className="chat__legend">
              Insert/change your name:
            </legend>
            <input className="chat__input chat__input--name" type="text"/>
          </fieldset>
        </aside>
        <section className="chat__messages">
          <div className="chat__messages-wrapper">
            {this.state.messages.map(message => <article className="chat__message message">
              <header className="message__header">
                <span className="message__author">{`${message.name} ${message.surname}`}</span>
                <time className="message__time">{message.time}</time>
              </header>
              <main className="message__content">{message.text}</main>
            </article>)}
          </div>
        </section>
      </div>
      <section className="chat__input-area input-area">
        <textarea className="input-area__text-input" name="input-area" id="input-area" rows="3"/>
        <button className="input-area__btn">Send</button>
      </section>
    </React.Fragment>;
  }
}
