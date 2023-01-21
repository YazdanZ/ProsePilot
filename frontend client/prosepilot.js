class MyCustomElement extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({mode: "open"});
      
    }
    connectedCallback() {
        this.shadow.innerHTML = `
        <button onclick="prose()">
            <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" alt="Google logo">
            <span>Change Prose</span>
        </button>
        <style>button {
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
  function prose(){
    console.log("prose button clicked");
  }
  