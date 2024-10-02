// // SuggestionBlot.js
// import Quill from "quill";
// import React from "react";
// import ReactDOM from "react-dom";

// // Create a container for React components inside Quill
// const BlockEmbed = Quill.import("blots/block/embed");

// class SuggestionBlot extends BlockEmbed {
//   static blotName = "suggestion";
//   static tagName = "div";
//   static className = "ai-suggestion";

//   static create(value) {
//     const node = super.create();
//     node.setAttribute("data-id", value.id); // Unique identifier if needed

//     // Use a wrapper to render React components inside the blot
//     const container = document.createElement("div");
//     container.classList.add("suggestion-container");

//     const suggestionText = document.createElement("p");
//     suggestionText.innerText = value.text;
//     suggestionText.classList.add("suggestion-text");

//     const buttonsDiv = document.createElement("div");
//     buttonsDiv.classList.add("suggestion-buttons");

//     const acceptButton = document.createElement("button");
//     acceptButton.innerText = "Accept";
//     acceptButton.classList.add("accept-button");

//     const rejectButton = document.createElement("button");
//     rejectButton.innerText = "Reject";
//     rejectButton.classList.add("reject-button");

//     buttonsDiv.appendChild(acceptButton);
//     buttonsDiv.appendChild(rejectButton);

//     container.appendChild(suggestionText);
//     container.appendChild(buttonsDiv);

//     node.appendChild(container);

//     return node;
//   }

//   static value(node) {
//     const text = node.querySelector(".suggestion-text").innerText;
//     return { text };
//   }
// }

// Quill.register(SuggestionBlot);

// export default SuggestionBlot;

import Quill from "quill";

const Inline = Quill.import("blots/inline");

class SuggestionBlot extends Inline {
  static create(value) {
    let node = super.create();
    node.setAttribute("data-text", value.text);
    node.innerHTML = `
      <span class="suggestion-text">${value.text}</span>
      <button class="accept-button">Accept</button>
      <button class="reject-button">Reject</button>
    `;
    return node;
  }

  static value(node) {
    return {
      text: node.getAttribute("data-text"),
    };
  }
}

SuggestionBlot.blotName = "suggestion";
SuggestionBlot.tagName = "span";
SuggestionBlot.className = "ai-suggestion";

export default SuggestionBlot;
