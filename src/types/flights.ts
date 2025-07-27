export type MockFlights = {
  status: boolean;
  timestamp: number;
  sessionId: string;
  data: {
    context: {
      status: string;
      totalResults: number;
    };
    itineraries: Itinerary[];
    messages?: unknown[];
    filterStats?: FilterStats;
  };
};

export type Itinerary = {
  id: string;
  price: {
    raw: number;
    formatted?: string;
  };
  legs: Leg[];
  isSelfTransfer?: boolean;
  isProtectedSelfTransfer?: boolean;
  farePolicy?: FarePolicy;
  eco?: {
    ecoContenderDelta?: number;
  };
  tags?: string[];
  isMashUp?: boolean;
  hasFlexibleOptions?: boolean;
  score?: number;
};

export type Leg = {
  id: string;
  origin: Location;
  destination: Location;
  durationInMinutes: number;
  stopCount?: number;
  isSmallestStops?: boolean;
  departure: string;
  arrival: string;
  timeDeltaInDays?: number;
  carriers?: {
    marketing?: Carrier[];
    operationType?: string;
  };
  segments?: Segment[];
};

export type Location = {
  id: string;
  name: string;
  displayCode: string;
  city?: string;
  isHighlighted?: boolean;
};

export type Segment = {
  id: string;
  origin: FlightPlace;
  destination: FlightPlace;
  departure: string;
  arrival: string;
  durationInMinutes?: number;
  flightNumber?: string;
  marketingCarrier?: Airline;
  operatingCarrier?: Airline;
};

export type FlightPlace = {
  flightPlaceId: string;
  displayCode: string;
  name: string;
  type: string;
  parent?: {
    flightPlaceId: string;
    displayCode: string;
    name: string;
    type: string;
  };
};

export type Carrier = {
  id: number;
  logoUrl?: string;
  name: string;
};

export type Airline = {
  id: number;
  name: string;
  alternateId?: string;
  allianceId?: number;
};

export type FarePolicy = {
  isChangeAllowed?: boolean;
  isPartiallyChangeable?: boolean;
  isCancellationAllowed?: boolean;
  isPartiallyRefundable?: boolean;
};

export type FilterStats = {
  duration?: {
    min?: number;
    max?: number;
  };
  airports?: {
    city: string;
    airports: {
      id: string;
      name: string;
    }[];
  }[];
  carriers?: Carrier[];
  stopPrices?: {
    direct?: StopPrice;
    one?: StopPrice;
    twoOrMore?: {
      isPresent: boolean;
    };
  };
};

export type StopPrice = {
  isPresent: boolean;
  formattedPrice?: string;
};


export interface Airport {
  presentation: {
    title: string
    suggestionTitle: string
    subtitle: string
  }
  navigation: {
    entityId: string
    entityType: "CITY" | "AIRPORT"
    localizedName: string
    relevantFlightParams: {
      skyId: string
      entityId: string
      flightPlaceType: "CITY" | "AIRPORT"
      localizedName: string
    }
  }
}

// export interface Carrier {
//   id: number
//   logoUrl: string
//   name: string
//   alternateId?: string
//   allianceId?: number
// }

export interface FlightLeg {
  id: string
  origin: {
    id: string
    name: string
    displayCode: string
    city: string
    isHighlighted: boolean
  }
  destination: {
    id: string
    name: string
    displayCode: string
    city: string
    isHighlighted: boolean
  }
  durationInMinutes: number
  stopCount: number
  isSmallestStops: boolean
  departure: string
  arrival: string
  timeDeltaInDays: number
  carriers: {
    marketing: Carrier[]
    operationType: string
  }
}

export interface FlightItinerary {
  id: string
  price: {
    raw: number
    formatted: string
  }
  legs: FlightLeg[]
  tags: string[]
  score: number
}

export interface SearchFormData {
  origin: string
  destination: string
  departDate: string
  returnDate: string
}

export interface ValidationErrors {
  origin?: string
  destination?: string
  departDate?: string
  returnDate?: string
}

export type SortOption = "best" | "price" | "duration" | "departure"
