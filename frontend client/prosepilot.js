class MyCustomElement extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({mode: "open"});
    }
    connectedCallback() {
        this.shadow.innerHTML = `
        
        <select class="pilot-selector" onchange="prose()">
            <option value="default">Change Prose</option>
            <option value="reddit">Reddit</option>
            <option value="academic">Academic</option>
            <option value="nytimes">New York Times</option>
        </select>
        
        <div class="poweredbyprosepilot">
            <span class="poweredby" style="font-size:8pt">Powered by</span>
            <img src="/Website/assets/images/logo.png" alt="ProsePilot logo" style="padding: 2px">
            <span class="prosepilot" style="font-size:10pt">ProsePilot</span>
        </div>
        <style>select {
            background-color: #6080A7;
            color: #fff;
            padding: 8px 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            display: flex;
            align-items: center;
        }
        
        img {
            width: 15px;
            vertical-align: bottom;
        }

        .prosepilot{
            color:#6080A7;
        }

        .poweredby{
            color:#808080;
        }

        .poweredbyprosepilot{
            vertical-align: middle;
        }
        
        
        </style>
    `;
    }

    
  }
  
  customElements.define("my-custom-element", MyCustomElement);
  async function prose() {
    const dropdown = document.querySelector('my-custom-element').shadowRoot.querySelector("select");
    const selectedValue = dropdown.value;
    const elements = document.getElementsByClassName("prosepilot-text-select");
    for (const element of elements) {
        // Get the text from the element and nested elements
        const text = element.textContent;
        const result = await callgpt(text, selectedValue)
        element.textContent = result
    }

}

async function callgpt(inputtext, style) {
    pilotButton = document.getElementsByName("my-custom-element");
    const apiKey = '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';
    const model = "text-davinci-003";
    //const prompt = "Say this is a test:";
    const prompt = "Write the following text in the style of " + style + ":\n" + inputtext;
    const max_tokens = 256;
    const temperature = 0.7;
    const url = "https://api.openai.com/v1/completions";
    const data = {
        "model": model,
        "prompt": prompt,
        "max_tokens": max_tokens,
        "temperature": temperature
    };
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            resolve(data['choices'][0]['text']);
            // Do something with the response data
        })
        .catch(error => {
            console.error('Error:', error);
        });
      });

    
}

  