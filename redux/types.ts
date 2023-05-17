export type FlightData = {
    icao24: string;
    callsign: string | null;
    arrivalAirportCandidatesCount: string | null;
    departureAirportCandidatesCount: string | null;
    estDepartureAirport: string | null;
    lastSeen: Date;
    firstSeen: Date;
};

export interface UserProfileState {
    id?:string;
    username: string;
    website: string;
    avatar_url?: string;
    company: string;
    updated_at?:string;
}

export  interface RootState {
    userProfile:UserProfileState; 
}