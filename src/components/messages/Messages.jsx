import { useContext, useEffect, useState } from 'react'
import Message from '../message/Message'
import { ChatContext } from '../../context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase.config'

const Messages = () => {
  const [messages, setMessages] = useState([])
  const {data} = useContext(ChatContext)

  useEffect(() => {
    const unSub = onSnapshot(doc(db,"chats", data.chatId), (doc) =>{
      doc.exists() && setMessages(doc.data().messages)
    })

    return () => {
      unSub()
    }
  },[data.chatId])


  return (
    <div>
      {messages.map(m=>{
        return <Message mes={m} key={m.id}/>
      })}
    </div>
  )
}

export default Messages