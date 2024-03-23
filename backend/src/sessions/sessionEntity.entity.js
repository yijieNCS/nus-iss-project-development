export class Session {
    constructor(sessionId, tutorId, studentId, timing, status, location) {
        this.sessionId = sessionId
        this.tutorId = tutorId
        this.studentId = studentId
        this.timing = timing
        this.status = status
        this.location = location
    }
}