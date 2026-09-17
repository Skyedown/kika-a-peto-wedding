// Ambientna hudba na pozadi celeho webu.
//
// Subor lezi v public/, takze si ho prehliadac aj Cloudflare drzia v cache pod
// rovnakym nazvom - po kazdej vymene skladby zvys AUDIO_VERSION.
//
// Stopa sa NENACITAVA pri nacitani stranky. Element sa vytvori az tesne pred
// prvym pokusom o prehratie, ktory sa spusta po window.load a v idle callbacku,
// takze na LCP ani na prvy render nema vplyv.
const AUDIO_VERSION = '1';

export const ambientTrack = `/audio/ambient.m4a?v=${AUDIO_VERSION}`;

// Hlasitost na pozadi. Nie je to popredie - ma to byt pocut, nie prehlusit.
export const AMBIENT_VOLUME = 0.26;

// Dlzka nabehu a doznenia hlasitosti.
export const AMBIENT_FADE_MS = 2200;

// localStorage kluc pre volbu hosta (zapnute / vypnute).
export const AMBIENT_STORAGE_KEY = 'kp-ambient-audio';
