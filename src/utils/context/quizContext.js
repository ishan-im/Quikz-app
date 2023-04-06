import { createContext, useState, useEffect } from "react";

import firestore from "@react-native-firebase/firestore";


export const QuizContext = createContext(
    {quizs: [],
    setQuizs: () => {},}
);

export const QuizProvider = ({ children }) => {


    const [quizs, setQuizs] = useState([]);

    const value = { quizs, setQuizs };
    
    useEffect(() => {
        const subscriber = firestore()
        .collection('quizzes')
        .onSnapshot(querySnapshot => {
            const quizs = [];
    
            querySnapshot.forEach(documentSnapshot => {
            quizs.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
            });
            });
    
            setQuizs(quizs);
        });
    
        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);
    
    console.log("quizs: " , quizs) 
    
    return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
    }