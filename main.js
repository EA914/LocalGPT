import { apiKey } from './config.js';

const userAction = async () => {
    const reply = "" + document.forms["input"]["reply"].value;
    const input = "" + document.forms["input"]["input"].value;
    const reponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: "POST",
        body: JSON.stringify({"model": "gpt-3.5-turbo", "messages":
            [{"role":"assistant","content": reply},
             {"role":"user","content": input}
            ]}),
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        }
    }).then((response) => {
        if (response.ok) {
            response.json().then((json) => {
                const AnswerLog=[document.getElementById("output").innerHTML,
                    "<br><br>ME: ",input,"<br><br>AI: ",json.choices[0].message.content];
                document.forms["input"]["reply"].value = json.choices[0].message.content;
                document.forms["input"]["input"].value = "";
                document.getElementById("output").innerHTML = AnswerLog.join("");
            });
        }
    });
}