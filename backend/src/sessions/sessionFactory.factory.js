// Define the factory method
const sessionCreator = (isStudent,session) => {
    return isStudent ? studentSession(session) : tutorSession(session);
}
 
// Define the session object structure
const session = (isStudent,session) => {
    if (isStudent){
        return {
            sessionId : session.sessionId,
            tutorId: session.tutorId,
            studentId: session.studentId,
            timing: session.timing,
            status: session.status,
            location: session.location,
            rate: session.rate
        }
    }else{
        return{
            sessionId : session.sessionId,
            tutorId: session.tutorId,
            studentId: session.studentId,
            timing: session.timing,
            status: session.status,
            location: session.location,
            topic: session.topic,
            subject: session.subject
        }
    }
}
 
// Define functions to create student and tutor session using the factory method
const studentSessionCreator = (session) => {
    return sessionCreator(true,session);
}
 
const tutorSessionCreator = (session) => {
    return sessionCreator(false,session);
}
 
// Define functions to create student and tutor sessions
const studentSession = (session) => {
    return session(true,session);
}
 
const  tutorSession = (session) => {
    return session(false,session);
}
 
// Now let's use the factory method to create sessions
 
// const myStudentSession = studentSessionCreator(session); // Create a good customer
// console.log(myStudentSession); // Output: {sessionId : session.sessionId,tutorId: session.tutorId,studentId: session.studentId,timing: session.timing,status: session.status,location: session.location,rate: session.rate}
 
// const mytutorSession = tutorSessionCreator(session); // Create a bad customer
// console.log(mytutorSession); // Output: {sessionId : session.sessionId,tutorId: session.tutorId,studentId: session.studentId,timing: session.timing, status: session.status,location: session.location,topic: session.topic,subject: session.subject}