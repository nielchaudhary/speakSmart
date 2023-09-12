import './index.css'
import {useState, useEffect} from "react";

const App = () => {
    const [value, setValue] = useState(null)
    const [message, setMessage] = useState(null)
    const [previousChat, setpreviousChat] = useState([])
    const [currentTitle, setcurrentTitle] = useState(null)




    const createNewConv = () => {
        setMessage(null)
        setValue("")
        setcurrentTitle(null)
    }
    const handleClick = (uniqueTitle) => {
        setcurrentTitle(uniqueTitle)
    }

    const options = {
        method: "POST",
        headers: {
            "Authorization": "Bearer API_KEY", //add your own openAI api key


            "content-type": "application/json",

        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",

            message: value,
        })
    }

    const getMessage = async () => {
        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", options)
            const data = await response.json();
            setMessage(data.choices[0].message);

        } catch (error) {
            console.error(error)
        }

    }

    useEffect(() => {
        if (!currentTitle && message && value) {
            setcurrentTitle(value);
        }
        if (currentTitle && value && message) {
            setpreviousChat(prevChat => [
                ...prevChat,
                {
                    title: currentTitle,
                    role: "user",
                    content: value,
                },
                {
                    title: currentTitle,
                    role: message.role,
                    content: message.content,
                },
            ]);
        }
    }, [message, currentTitle]);

    const currentChat = previousChat.filter(previousChat => previousChat.title === currentTitle)
    const uniqueTitles = Array.from(new Set(previousChat.map(previousChat=>previousChat.title)))


    return (
        <div className="app">
            <section className="side-bar">
                <button onClick={createNewConv}>+ New Chat</button>
                <ul className={"history"}>
                    {uniqueTitles?.map((uniqueTitle,index) => <li key={index} onClick={()=>handleClick(uniqueTitle)}>{uniqueTitle}</li>)}


                </ul>
                <nav>
                    <p>Copyright © 2023 Neel Chaudhary</p>
                </nav>

            </section>


            <section className="main">
                {(!currentTitle) && <h1>speakSmart</h1>}
                <ul className={"feed"}>
                    {currentChat?.map((chatMessage, index) => <li key={index}>
                        <p className={"role"}>{chatMessage.role}</p>
                        <p>{chatMessage.content}</p>

                        </li>)}


                        </ul>
                        <div className={"bottom-section"}>
                    <div className={"input-container"}>
                        <input value={value} onChange={(e) => setValue(e.target.value)}/>
                        <div id={"submit"} onClick={getMessage}> ➢</div>
                    </div>
                    <p className={"info"}>
                        JarvisAI is a state-of-the-art conversational AI designed to engage in natural and meaningful
                        conversations with users.
                    </p>

        </div>

</section>


</div>
)
    ;
}

export default App;
