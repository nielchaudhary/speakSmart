const express = require('express')
const app = express();
const cors = require('cors')

app.use(express.json())
app.use(cors());


const apikey = "add your own api key";



app.post('/completions', async (req, res) => {
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apikey}`,
            "content-type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: req.body.message}],
            max_tokens: 80,
        })
    }
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", options)
        const data = await response.json();
        res.send(data);

    } catch (error) {
        console.error(error)
    }
})


app.listen(8000, () => {
    console.log("THIS SERVER IS RUNNING ON PORT 8000")
})