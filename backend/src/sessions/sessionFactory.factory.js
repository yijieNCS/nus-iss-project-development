// Factory Interface
const sessionCreator = (isStudent,session) => {
    return isStudent ? studentSession(session) : tutorSession(session);
}

// Concrete Creator
export const studentSessionCreator = (session) => {
    return sessionCreator(true,session);
}

export const tutorSessionCreator = (session) => {
    return sessionCreator(false,session);
}
 
// Product Interface
const session = (session) => {
    session['timing'] = new Date(session['timing']).toLocaleDateString('en-SG', {
        year: "numeric",
        month: "long",
        day: "numeric",
    })
    return session
}

// Concrete Product
const studentSession = (sessionInfo) => {
    return session({
        sessionId: sessionInfo.sessionId,
        firstName: sessionInfo.firstName,
        lastName: sessionInfo.lastName,
        tutorId: sessionInfo.tutorId,
        studentId: sessionInfo.studentId,
        timing: sessionInfo.timing,
        status: sessionInfo.status,
        location: sessionInfo.location,
        education: sessionInfo.education,
        gender: sessionInfo.gender,
        rate: sessionInfo.rate
    });
}

const tutorSession = (sessionInfo) => {
    return session({
        sessionId : sessionInfo.sessionId,
        firstName: sessionInfo.firstName,
        lastName: sessionInfo.lastName,
        tutorId: sessionInfo.tutorId,
        studentId: sessionInfo.studentId,
        timing: sessionInfo.timing,
        status: sessionInfo.status,
        location: sessionInfo.location,
        gender: sessionInfo.gender,
        topic: sessionInfo.topic,
        subject: sessionInfo.subject
    });
}
 

 

 
// Now let's use the factory method to create sessions
 
// const myStudentSession = studentSessionCreator(session); // Create a good customer
// console.log(myStudentSession); // Output: {sessionId : session.sessionId,tutorId: session.tutorId,studentId: session.studentId,timing: session.timing,status: session.status,location: session.location,rate: session.rate}
 
// const mytutorSession = tutorSessionCreator(session); // Create a bad customer
// console.log(mytutorSession); // Output: {sessionId : session.sessionId,tutorId: session.tutorId,studentId: session.studentId,timing: session.timing, status: session.status,location: session.location,topic: session.topic,subject: session.subject}