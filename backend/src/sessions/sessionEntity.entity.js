export class Session {
    constructor(sessionId, firstName, lastname, date, status, location) {

        // if (new.target === Session) {
        //     throw new Error('Abstract class cannot be instantiated directly')
        // }

        this.sessionId = sessionId
        this.firstName = firstName
        this.lastName = lastname
        this.date = date
        this.status = status
        this.location = location
    }
}