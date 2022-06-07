import { v4 as uuidv4 } from 'uuid'
import { createContext, useState } from 'react'
import { useEffect } from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState([true])
  const [feedback, setFeedback] = useState([])
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  //Grabs this onto state. When the app loads, call the HTTP server
  useEffect(()=> {
    fetchFeedBack()
  },[])

  const fetchFeedBack = async () => {
    //Tell the query to sort. Important to tell the server to sort and return 
    //Instead of having the front-end sort it.
    const response = await fetch('http://localhost:5000/feedback')
    const data = await response.json()
    //Can add filter if you want
    setFeedback(data)
    setIsLoading(false)
  }

  // Add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback])
  }

  // Delete feedback
  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  // Update feedback item
  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    )
  }

  // Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
        isLoading
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
