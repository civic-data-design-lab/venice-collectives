import React, { Component } from "react";
import SingleMessage from "./SingleMessage.js";
import { NewMessage } from "./NewPostInput.js";

import "./Chat.css";

/**
 * @typedef UserObject
 * @property {string} _id
 * @property {string} name
 */
/**
 * @typedef MessageObject
 * @property {UserObject} sender
 * @property {string} content
 */
/**
 * @typedef ChatData
 * @property {MessageObject[]} messages
 * @property {UserObject} recipient
 */

/**
 * Renders main chat window including previous messages,
 * who is being chatted with, and the new message input.
 *
 * Proptypes
 * @param {ChatData} data
 */
class Chat extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="u-flexColumn Chat-container">
        <h3>Chatting with {this.props.data.recipient.name}</h3>
        <div className="Chat-historyContainer">
          {this.props.data.messages.map((m, i) => (
            <SingleMessage message={m} key={i} />
          ))}
        </div>
        <div className="Chat-newContainer">
          <NewMessage recipient={this.props.data.recipient} />
        </div>
      </div>
    );
  }
}

export default Chat;
