class MyCustomElement extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({mode: "open"});
    }
    connectedCallback() {
        this.shadow.innerHTML = `
        
        <select onchange="prose()">
            <option value="default">Change Prose</option>
            <option value="reddit">Reddit</option>
            <option value="academic">Academic</option>
            <option value="nytimes">New York Times</option>
        </select>

        <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" alt="Google logo">
        <style>select {
            background-color: #4285F4;
            color: #fff;
            padding: 8px 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            display: flex;
            align-items: center;
        }
        
        img {
            width: 20px;
            margin-right: 8px;
        }
        
        
        </style>
    `;
    }

    
  }
  
  customElements.define("my-custom-element", MyCustomElement);
  function prose() {
    console.log("Testing dropdown!");
}
  