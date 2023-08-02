import { persistObservable } from '@legendapp/state/persist'
import { observable } from "@legendapp/state";
import { ObservablePersistLocalStorage } from '@legendapp/state/persist-plugins/local-storage'

type Category = {
    id: number;
    name: string;
    slug: string;
}
type City = {
    id?: string;
    nombre?: string;
}
type province = {
    id?: string;
    nombre?: string;
}

export type FormValues =  {
    [key: string]: ServiceRequest;
}

type urgency = "SI" | "NO" | undefined;

type schedule = "Mañana 07:00-12:00"| "Media tarde 12:00-17:00"| "Tarde 17:00-20:00"| "Noche 20:00-7:00";

export interface ServiceRequest {
    id?: string;
    currentStep?: number;
    category?: Category;
    address?: string;
    amount?: string;
    schedule?: schedule;
    urgency?: urgency;
    description?: string;
    date?: Date;
    city?: City;
    province?: province;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    details?: Record<string, any>;
}

export const localStorageRequests = observable({});

// Persist this observable
persistObservable(localStorageRequests, {
    local: 'serviceRequests', // Unique name
    persistLocal: ObservablePersistLocalStorage
})