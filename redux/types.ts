export type FlightData = {
    icao24: string;
    callsign: string | null;
    arrivalAirportCandidatesCount: string | null;
    departureAirportCandidatesCount: string | null;
    estDepartureAirport: string | null;
    lastSeen: Date;
    firstSeen: Date;
};